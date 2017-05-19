import { PostActions } from "./SNQueryUtil";
import { GetActions } from "./SNQueryUtil";
export interface ISNQueryOptions {
    table: string;
    sysparm_action: GetActions | PostActions;
    sysparm_record_count?: number;
    sysparm_query?: string;
    sysparm_view?: string;
    sysparm_sys_id?: string;
    displayvalue?: boolean;
    displayvariables?: boolean;
    data?: any;
    timeout?: number;
}
export interface ISNQuery extends ISNQueryOptions {
    getQueryUrl(): string;
}
export declare class SNQuery implements ISNQuery {
    sysparm_view: string;
    sysparm_query: string;
    sysparm_sys_id: string;
    sysparm_record_count: number;
    displayvalue: boolean;
    displayvariables: boolean;
    data: any;
    timeout: number;
    table: string;
    sysparm_action: GetActions | PostActions;
    constructor(options: ISNQueryOptions);
    constructor(table: string, sysparm_action: GetActions | PostActions, sysparm_view?: string, sysparm_query?: string, sysparm_sys_id?: string, sysparm_record_count?: number, displayvalue?: boolean, displayvariables?: boolean, data?: any);
    getQueryUrl(): string;
}
