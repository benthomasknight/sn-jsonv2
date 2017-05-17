import * as mocha from 'mocha';
import { GetActions } from "./../src/SNQueryUtil";
import { SNQuery, ISNQueryOptions } from "./../src/SNQuery";
import {expect} from 'chai';

describe('SNQuery', function() {
  describe('#getQueryUrl()', function() {
    it('should return a promise which resolves to the correct url string', function() {
      var q = new SNQuery('incident', GetActions.getKeys);
      expect(q.getQueryUrl()).to.be.a('string', 'Expect the returned url to be a string');
      expect(q.getQueryUrl()).to.equal('incident.do?JSONv2&sys_param_action=getKeys');
    });
  });
});

describe('SNQuery', function() {
  describe('#getQueryUrl()', function() {
    it('On construction, each property should be set correctly', function() {
      var options = {
        table: "sp_widget",
        sysparm_action: GetActions.get,
        sysparm_record_count: 5,
        sysparm_query: "testquery",
        sysparm_view: "view",
        sysparm_sys_id: "sys_id",
        displayvalue: true,
        displayvariables: true
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
    });
  });
});