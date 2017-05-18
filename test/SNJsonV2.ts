import * as mocha from 'mocha';
import { SNQuery, GetActions, SNJsonV2 } from '../src/';
import { expect } from 'chai';
import * as config from 'config';

describe('SNJsonV2', function() {
  describe('#run()', function() {
    it('should return one record when a sys_id is provided', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sp_widget',GetActions.get,null,null,'0fd6a6f247230200ba13a5554ee490b3',null,false,false); // sys_id of OOB widget

      sn.run(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.be.of.length(1);
        done();
      });
    });
  });
});

describe('SNJsonV2', function() {
  describe('#run()', function() {
    it('should return at most two record when querying a listing with a max of 2 results', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sp_widget',GetActions.getRecords,null,null,null,2,false,false);

      sn.run(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.have.length.lte(2);
        done();
      });
    });
  });
});

describe('SNJsonV2', function() {
  describe('#run()', function() {
    it('should throw an error when GetActions.get is used, but no sys_id is provided', function() {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      expect(() => {new SNQuery('sp_widget',GetActions.get,null,null,null,null,false,false)}).to.throw(Error);
    });
  });
});

describe('SNJsonV2', function() {
  describe('#run()', function() {
    it('should return a list of results with a complex query', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sys_user',GetActions.getRecords,'human_resources','emailISEMPTY',null,2,true,true);

      sn.run(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.have.length.lte(2);
        done();
      });
    });
  });
});