import * as mocha from 'mocha';
import { SNQuery, ISNQueryOptions, GetActions, PostActions } from "./../src/";
import {expect} from 'chai';

describe('SNQuery', function() {
  describe('#getQueryUrl()', function() {
    it('should return a promise which resolves to the correct url string', function() {
      var q = new SNQuery('incident', GetActions.getKeys);
      expect(q.getQueryUrl()).to.be.a('string', 'Expect the returned url to be a string');
      expect(q.getQueryUrl()).to.equal('incident.do?JSONv2&sysparm_action=getKeys');
    });
    it('On construction, each property should be set correctly', function() {
      var options = {
        table: "sp_widget",
        sysparm_action: GetActions.get,
        sysparm_record_count: 5,
        sysparm_query: "testquery",
        sysparm_view: "view",
        sysparm_sys_id: "sys_id",
        displayvalue: true,
        displayvariables: true,
        data:{test:"test"},
        timeout:1000
      } as ISNQueryOptions;

      var query = new SNQuery(options);

      expect(query.table).to.equal(options.table);
      expect(query.sysparm_action).to.equal(options.sysparm_action);
      expect(query.sysparm_record_count).to.equal(options.sysparm_record_count);
      expect(query.sysparm_query).to.equal(options.sysparm_query);
      expect(query.sysparm_view).to.equal(options.sysparm_view);
      expect(query.sysparm_sys_id).to.equal(options.sysparm_sys_id);
      expect(query.displayvalue).to.equal(options.displayvalue);
      expect(query.displayvariables).to.equal(options.displayvariables);
      expect(query.data).to.equal(options.data);
      expect(query.timeout).to.equal(options.timeout);
    });

    it('should throw an error when GetActions.get is used, but no sys_id is provided', function() {
      expect(() => {new SNQuery('sp_widget',GetActions.get)}).to.throw(Error);
    });
    it('should throw an error when no table is given', function() {
      expect(() => {new SNQuery(null,null)}).to.throw(Error);
    });
    it('should throw an error when no action is given', function() {
      expect(() => {new SNQuery('sys_user', null)}).to.throw(Error);
    });
    it('should throw an error when PostActions.deleteRecord is used and no sys_id is provided', function() {
      expect(() => {new SNQuery('sys_user',PostActions.deleteRecord)}).to.throw(Error);
    });
    it('should throw an error when inserting or updating a record and no data is provided', function() {
      expect(() => {new SNQuery('sys_user',PostActions.insert)}).to.throw(Error);
    });
    it('should throw an error when deleting multiple records and no query is given', function() {
      expect(() => {new SNQuery('sys_user',PostActions.deleteMultiple)}).to.throw(Error);
    });
  });
});