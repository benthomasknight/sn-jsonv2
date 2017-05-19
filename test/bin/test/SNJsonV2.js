"use strict";
const _1 = require("../src/");
const chai_1 = require("chai");
const config = require("config");
let WIDGET_NAME = 'test-widget-from-post';
describe('SNJsonV2', function () {
    after('Remove all widgets created in this test', (done) => {
        var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
        let o = {
            table: 'sp_widget',
            sysparm_action: _1.PostActions.deleteMultiple,
            sysparm_query: 'nameSTARTSWITH' + WIDGET_NAME
        };
        var query = new _1.SNQuery(o);
        sn.run(query).then((val) => {
            chai_1.expect(val.records[0]['count']).to.be.gte(4);
            done();
        });
    });
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
        /*
        Posting
        */
        it('should return the record posted to the server with a status of success.', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            let o = {
                table: 'sp_widget',
                sysparm_action: _1.PostActions.insert,
                data: {
                    name: WIDGET_NAME + '1',
                    template: "<div></div>",
                    script: "(function(){})()",
                    client_script: "function(){var c = this;}"
                }
            };
            var query = new _1.SNQuery(o);
            sn.run(query).then((val) => {
                chai_1.expect(val.records.length).to.equal(1);
                chai_1.expect(val.records[0].__status).to.equal('success');
                done();
            });
        });
        it('should return all the record posted to the server.', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            let o = {
                table: 'sp_widget',
                sysparm_action: _1.PostActions.insert,
                data: {
                    records: [{
                            name: WIDGET_NAME + '2',
                            template: "<div></div>",
                            script: "(function(){})()",
                            client_script: "function(){var c = this;}"
                        }, {
                            name: WIDGET_NAME + '3',
                            template: "<div></div>",
                            script: "(function(){})()",
                            client_script: "function(){var c = this;}"
                        }]
                }
            };
            var query = new _1.SNQuery(o);
            sn.run(query).then((val) => {
                chai_1.expect(val.records.length).to.equal(2);
                chai_1.expect(val.records[0].__status).to.equal('success');
                chai_1.expect(val.records[1].__status).to.equal('success');
                done();
            });
        });
        it('should update the provided record.', function (done) {
            // Create the record that we will eventually update
            var snBase = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            let oBase = {
                table: 'sp_widget',
                sysparm_action: _1.PostActions.insert,
                data: {
                    name: WIDGET_NAME + '4',
                    template: "<div></div>",
                    script: "(function(){})()",
                    client_script: "function(){var c = this;}"
                }
            };
            var queryBase = new _1.SNQuery(oBase);
            // Use the created records sys_id to update our record
            snBase.run(queryBase).then((val) => {
                var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
                let o = {
                    table: 'sp_widget',
                    sysparm_action: _1.PostActions.update,
                    data: {
                        template: "<div>Updated to have this content</div>"
                    },
                    sysparm_query: 'sys_id=' + val.records[0]['sys_id']
                };
                var query = new _1.SNQuery(o);
                sn.run(query).then((val) => {
                    chai_1.expect(val.records.length).to.equal(1);
                    chai_1.expect(val.records[0].__status).to.equal('success');
                    done();
                });
            });
        });
        it('should delete the provided record.', function (done) {
            // Create the record that we will eventually update
            var snBase = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            let oBase = {
                table: 'sp_widget',
                sysparm_action: _1.PostActions.insert,
                data: {
                    name: WIDGET_NAME + '5',
                    template: "<div></div>",
                    script: "(function(){})()",
                    client_script: "function(){var c = this;}"
                }
            };
            var queryBase = new _1.SNQuery(oBase);
            // Use the created records sys_id to update our record
            snBase.run(queryBase).then((val) => {
                var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
                let o = {
                    table: 'sp_widget',
                    sysparm_action: _1.PostActions.deleteRecord,
                    sysparm_sys_id: val.records[0]['sys_id']
                };
                var query = new _1.SNQuery(o);
                sn.run(query).then((val) => {
                    chai_1.expect(val.records.length).to.equal(1);
                    chai_1.expect(val.records[0].__status).to.equal('success');
                    done();
                });
            });
        });
        it('should delete all record based off the provided query.', function (done) {
            var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
            let o = {
                table: 'sp_widget',
                sysparm_action: _1.PostActions.insert,
                data: {
                    records: [{
                            name: WIDGET_NAME + '6',
                            template: "<div></div>",
                            script: "(function(){})()",
                            client_script: "function(){var c = this;}"
                        }, {
                            name: WIDGET_NAME + '7',
                            template: "<div></div>",
                            script: "(function(){})()",
                            client_script: "function(){var c = this;}"
                        }]
                }
            };
            var query = new _1.SNQuery(o);
            sn.run(query).then((val) => {
                var sn = new _1.SNJsonV2(config.get('instance'), config.get('username'), config.get('password'));
                let o = {
                    table: 'sp_widget',
                    sysparm_action: _1.PostActions.deleteMultiple,
                    sysparm_query: 'sys_id=' + val.records[0]['sys_id'] + '^ORsys_id=' + val.records[1]['sys_id']
                };
                var query = new _1.SNQuery(o);
                sn.run(query).then((val) => {
                    chai_1.expect(val.records[0]['count']).to.equal(2);
                    done();
                });
            });
        });
    });
});
//# sourceMappingURL=SNJsonV2.js.map