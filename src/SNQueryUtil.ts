export enum GetActions {
  getKeys, // Gets a comma seperated list of ids
  getRecords, // gets all record and thier fields
  get // gets a record and its fields
}

export enum PostActions {
  insert,
  insertMultiple,
  update,
  deleteRecord,
  deleteMultiple
}