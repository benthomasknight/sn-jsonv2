import * as mocha from 'mocha';
import { SNQuery } from '../src/SNQuery';
import { GetActions } from '../src/SNQueryUtil';
import { expect } from 'chai';
import { SNJsonV2 } from '../src/SNJsonV2';
import * as config from 'config';

describe('SNQuery', function() {
  describe('#get()', function() {
    it('should return a promise which resolves to an array of records', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sp_widget',GetActions.getKeys);

      sn.get(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        done();
      });
    });
  });
});

describe('SNQuery', function() {
  describe('#get()', function() {
    it('should return one record when a sys_id is provided', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sp_widget',GetActions.get,null,null,'0fd6a6f247230200ba13a5554ee490b3',null,false,false); // sys_id of OOB widget

      sn.get(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.be.of.length(1);
        done();
      });
    });
  });
});

describe('SNQuery', function() {
  describe('#get()', function() {
    it('should return at most two record when querying a listing with a max of 2 results', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sp_widget',GetActions.getRecords,null,null,null,2,false,false);

      sn.get(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.have.length.lte(2);
        done();
      });
    });
  });
});

describe('SNQuery', function() {
  describe('#get()', function() {
    it('should throw an error when GetActions.get is used, but no sys_id is provided', function() {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      expect(() => {new SNQuery('sp_widget',GetActions.get,null,null,null,null,false,false)}).to.throw(Error);
    });
  });
});

describe('SNQuery', function() {
  describe('#get()', function() {
    it('should return a list of results with a complex query', function(done) {
      var sn = new SNJsonV2(config.get<string>('instance'),config.get<string>('username'),config.get<string>('password'));
      var query = new SNQuery('sys_user',GetActions.getRecords,'human_resources','emailISEMPTY',null,2,true,true);

      sn.get(query).then((val) => {
        expect(val).to.be.an('object');
        expect(val).to.haveOwnProperty('records');
        expect(val.records).to.have.length.lte(2);
        done();
      });
    });
  });
});