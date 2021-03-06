"use strict";
const SNQueryUtil_1 = require("./SNQueryUtil");
const SNQueryUtil_2 = require("./SNQueryUtil");
const Debug = require("debug");
var debug = Debug('SNJsonV2');
class SNQuery {
    constructor(tableOROptions, sysparm_action, sysparm_view, sysparm_query, sysparm_sys_id, sysparm_record_count, displayvalue, displayvariables, data, timeout) {
        this.sysparm_view = sysparm_view;
        this.sysparm_query = sysparm_query;
        this.sysparm_sys_id = sysparm_sys_id;
        this.sysparm_record_count = sysparm_record_count;
        this.displayvalue = displayvalue;
        this.displayvariables = displayvariables;
        this.data = data;
        this.timeout = timeout;
        if (typeof tableOROptions === 'string') {
            this.table = tableOROptions;
            this.sysparm_action = sysparm_action;
        }
        else {
            this.table = tableOROptions.table;
            this.sysparm_action = tableOROptions.sysparm_action;
            this.sysparm_view = tableOROptions.sysparm_view;
            this.sysparm_query = tableOROptions.sysparm_query;
            this.sysparm_sys_id = tableOROptions.sysparm_sys_id;
            this.sysparm_record_count = tableOROptions.sysparm_record_count;
            this.displayvalue = tableOROptions.displayvalue;
            this.displayvariables = tableOROptions.displayvariables;
            this.data = tableOROptions.data;
            this.timeout = tableOROptions.timeout;
        }
        debug('SN Query Created: %O', this);
        if (this.table == null) {
            throw new Error('A table must be specified');
        }
        if (this.sysparm_action == null || !(this.sysparm_action in SNQueryUtil_2.GetActions || this.sysparm_action in SNQueryUtil_1.PostActions)) {
            throw new Error('An action must be specified');
        }
        if (this.sysparm_action == SNQueryUtil_2.GetActions.get && !this.sysparm_sys_id) {
            throw new Error('When using the "get" action, you must specify a sys_id.');
        }
        if (this.sysparm_action == SNQueryUtil_1.PostActions.deleteRecord && !this.sysparm_sys_id) {
            throw new Error('When using the "deleteRecord" action, you must specify a sys_id.');
        }
        if (([SNQueryUtil_1.PostActions.insert, SNQueryUtil_1.PostActions.insertMultiple, SNQueryUtil_1.PostActions.update].indexOf(this.sysparm_action) != -1) && !this.data) {
            throw new Error('When posting an insert or and update, data must be provided.');
        }
        if (this.sysparm_action == SNQueryUtil_1.PostActions.update && !this.sysparm_query) {
            throw new Error('When using the "update" action, you must specify a query.');
        }
        if (this.sysparm_action == SNQueryUtil_1.PostActions.deleteMultiple && !this.sysparm_query) {
            throw new Error('When using the "deleteMultiple" action, a query must be provided.');
        }
    }
    getQueryUrl() {
        debug('Generating query with %O', this);
        var url = this.table;
        url += '.do?JSONv2';
        url += '&sysparm_action=' + this.sysparm_action;
        if (this.sysparm_view) {
            url += '&sysparm_view=' + this.sysparm_view;
        }
        if (this.sysparm_record_count) {
            url += '&sysparm_record_count=' + this.sysparm_record_count;
        }
        if (this.sysparm_query) {
            url += '&sysparm_query=' + this.sysparm_query;
        }
        if (this.sysparm_sys_id) {
            url += '&sysparm_sys_id=' + this.sysparm_sys_id;
        }
        if (this.displayvalue) {
            url += '&displayvalue=' + this.displayvalue;
        }
        if (this.displayvariables) {
            url += '&displayvariables=' + this.displayvariables;
        }
        debug('Generated URL: %s', url);
        return url;
    }
    ;
}
exports.SNQuery = SNQuery;
//# sourceMappingURL=SNQuery.js.map