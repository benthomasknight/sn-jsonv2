"use strict";
const _1 = require("./../src/");
const chai_1 = require("chai");
describe('SNQuery', function () {
    describe('#getQueryUrl()', function () {
        it('should return a promise which resolves to the correct url string', function () {
            var q = new _1.SNQuery('incident', _1.GetActions.getKeys);
            chai_1.expect(q.getQueryUrl()).to.be.a('string', 'Expect the returned url to be a string');
            chai_1.expect(q.getQueryUrl()).to.equal('incident.do?JSONv2&sysparm_action=getKeys');
        });
        it('On construction, each property should be set correctly', function () {
            var options = {
                table: "sp_widget",
                sysparm_action: _1.GetActions.get,
                sysparm_record_count: 5,
                sysparm_query: "testquery",
                sysparm_view: "view",
                sysparm_sys_id: "sys_id",
                displayvalue: true,
                displayvariables: true,
                data: { test: "test" },
                timeout: 1000
            };
            var query = new _1.SNQuery(options);
            chai_1.expect(query.table).to.equal(options.table);
            chai_1.expect(query.sysparm_action).to.equal(options.sysparm_action);
            chai_1.expect(query.sysparm_record_count).to.equal(options.sysparm_record_count);
            chai_1.expect(query.sysparm_query).to.equal(options.sysparm_query);
            chai_1.expect(query.sysparm_view).to.equal(options.sysparm_view);
            chai_1.expect(query.sysparm_sys_id).to.equal(options.sysparm_sys_id);
            chai_1.expect(query.displayvalue).to.equal(options.displayvalue);
            chai_1.expect(query.displayvariables).to.equal(options.displayvariables);
            chai_1.expect(query.data).to.equal(options.data);
            chai_1.expect(query.timeout).to.equal(options.timeout);
        });
        it('should throw an error when GetActions.get is used, but no sys_id is provided', function () {
            chai_1.expect(() => { new _1.SNQuery('sp_widget', _1.GetActions.get); }).to.throw(Error);
        });
        it('should throw an error when no table is given', function () {
            chai_1.expect(() => { new _1.SNQuery(null, null); }).to.throw(Error);
        });
        it('should throw an error when no action is given', function () {
            chai_1.expect(() => { new _1.SNQuery('sys_user', null); }).to.throw(Error);
        });
        it('should throw an error when PostActions.deleteRecord is used and no sys_id is provided', function () {
            chai_1.expect(() => { new _1.SNQuery('sys_user', _1.PostActions.deleteRecord); }).to.throw(Error);
        });
        it('should throw an error when inserting or updating a record and no data is provided', function () {
            chai_1.expect(() => { new _1.SNQuery('sys_user', _1.PostActions.insert); }).to.throw(Error);
        });
        it('should throw an error when deleting multiple records and no query is given', function () {
            chai_1.expect(() => { new _1.SNQuery('sys_user', _1.PostActions.deleteMultiple); }).to.throw(Error);
        });
    });
});
//# sourceMappingURL=SNQuery.js.map