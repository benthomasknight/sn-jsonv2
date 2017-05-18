"use strict";
const _1 = require("../src/");
const chai_1 = require("chai");
const config = require("config");
describe('SNJsonV2', function () {
    describe('#run()', function () {
        it('should return one record when a sys_id is provided', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            var query = new _1.SNQuery('sp_widget', _1.GetActions.get, null, null, '0fd6a6f247230200ba13a5554ee490b3', null, false, false); // sys_id of OOB widget
            sn.run(query).then((val) => {
                chai_1.expect(val).to.be.an('object');
                chai_1.expect(val).to.haveOwnProperty('records');
                chai_1.expect(val.records).to.be.of.length(1);
                done();
            });
        });
    });
});
describe('SNJsonV2', function () {
    describe('#run()', function () {
        it('should return at most two record when querying a listing with a max of 2 results', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            var query = new _1.SNQuery('sp_widget', _1.GetActions.getRecords, null, null, null, 2, false, false);
            sn.run(query).then((val) => {
                chai_1.expect(val).to.be.an('object');
                chai_1.expect(val).to.haveOwnProperty('records');
                chai_1.expect(val.records).to.have.length.lte(2);
                done();
            });
        });
    });
});
describe('SNJsonV2', function () {
    describe('#run()', function () {
        it('should throw an error when GetActions.get is used, but no sys_id is provided', function () {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            chai_1.expect(() => { new _1.SNQuery('sp_widget', _1.GetActions.get, null, null, null, null, false, false); }).to.throw(Error);
        });
    });
});
describe('SNJsonV2', function () {
    describe('#run()', function () {
        it('should return a list of results with a complex query', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            var query = new _1.SNQuery('sys_user', _1.GetActions.getRecords, 'human_resources', 'emailISEMPTY', null, 2, true, true);
            sn.run(query).then((val) => {
                chai_1.expect(val).to.be.an('object');
                chai_1.expect(val).to.haveOwnProperty('records');
                chai_1.expect(val.records).to.have.length.lte(2);
                done();
            });
        });
    });
});
//# sourceMappingURL=SNJsonV2.js.map