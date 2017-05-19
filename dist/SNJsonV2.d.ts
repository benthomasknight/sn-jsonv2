import { ISNQueryOptions } from "./SNQuery";
import { ISNRecords } from "./SNRecords";
import { SNQuery } from "./SNQuery";
export interface ISNJsonV2 {
    instance: string;
    run(query: SNQuery): Promise<ISNRecords>;
}
export declare class SNJsonV2 implements ISNJsonV2 {
    readonly instance: string;
    private username;
    private password;
    constructor(instance: string, username: string, password: string);
    run(query: SNQuery | ISNQueryOptions): Promise<ISNRecords>;
    private getUrl(query);
}
