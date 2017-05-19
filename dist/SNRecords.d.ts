export interface ISNRecords {
    records: Array<ISNRecord>;
}
export interface ISNRecord {
    __status: string;
    __error: ISNError;
}
export interface ISNError {
    message: string;
    reason: string;
}
