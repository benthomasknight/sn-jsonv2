import { PostActions } from "./SNQueryUtil";
import { GetActions } from "./SNQueryUtil";
import * as Debug from 'debug';
var debug = Debug('SNJsonV2');

export interface ISNQueryOptions {
  table: string;
  sysparm_action: GetActions | PostActions;
  sysparm_record_count?: number;
  sysparm_query?: string;
  sysparm_view?: string;
  sysparm_sys_id?: string;
  displayvalue?: boolean;
  displayvariables?: boolean;
  data?:any;

  // Extra options for the query
  timeout?:number;
}

export interface ISNQuery extends ISNQueryOptions {
  getQueryUrl(): string;
}

export class SNQuery implements ISNQuery {
  public table:string;
  public sysparm_action: GetActions | PostActions;

  constructor(options:ISNQueryOptions);
  constructor(table: string, sysparm_action: GetActions | PostActions, sysparm_view?: string, sysparm_query?: string, sysparm_sys_id?: string, sysparm_record_count?: number, displayvalue?: boolean, displayvariables?: boolean, data?:any);

  constructor(tableOROptions:ISNQueryOptions | string, sysparm_action?: GetActions | PostActions, public sysparm_view?: string, public sysparm_query?: string, public sysparm_sys_id?: string, public sysparm_record_count?: number, public displayvalue?: boolean, public displayvariables?: boolean, public data?:any, public timeout?:number) {
    if(typeof tableOROptions === 'string') {
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
    if(this.table == null) {
      throw new Error('A table must be specified');
    }
    if(this.sysparm_action == null || !(this.sysparm_action in GetActions || this.sysparm_action in PostActions)) {
      throw new Error('An action must be specified');
    }
    if(this.sysparm_action == GetActions.get && !this.sysparm_sys_id) {
      throw new Error('When using the "get" action, you must specify a sys_id.');
    }
    if(this.sysparm_action == PostActions.deleteRecord && !this.sysparm_sys_id) {
      throw new Error('When using the "deleteRecord" action, you must specify a sys_id.');
    }
    if(([PostActions.insert, PostActions.insertMultiple, PostActions.update].indexOf(<PostActions>this.sysparm_action) != -1) && !this.data) {
      throw new Error('When posting an insert or and update, data must be provided.');
    }
    if(this.sysparm_action == PostActions.update && !this.sysparm_query) {
      throw new Error('When using the "update" action, you must specify a query.');
    }
    if(this.sysparm_action == PostActions.deleteMultiple && !this.sysparm_query) {
      throw new Error('When using the "deleteMultiple" action, a query must be provided.');
    }
  }

  getQueryUrl(): string {
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
  };
}

