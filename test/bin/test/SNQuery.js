"use strict";
const _1 = require("./../src/");
const chai_1 = require("chai");
describe('SNQuery', function () {
    describe('#getQueryUrl()', function () {
        it('should return a promise which resolves to the correct url string', function () {
            var q = new _1.SNQuery('incident', _1.GetActions.getKeys);
            chai_1.expect(q.getQueryUrl()).to.be.a('string', 'Expect the returned url to be a string');
            chai_1.expect(q.getQueryUrl()).to.equal('incident.do?JSONv2&sys_param_action=getKeys');
        });
    });
});
describe('SNQuery', function () {
    describe('#getQueryUrl()', function () {
        it('On construction, each property should be set correctly', function () {
            var options = {
                table: "sp_widget",
                sysparm_action: _1.GetActions.get,
                sysparm_record_count: 5,
                sysparm_query: "testquery",
                sysparm_view: "view",
                sysparm_sys_id: "sys_id",
                displayvalue: true,
                displayvariables: true
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
        });
    });
});
//# sourceMappingURL=SNQuery.js.map