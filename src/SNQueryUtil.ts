export enum GetActions {
  getKeys = <any>'getKeys', // Gets a comma seperated list of ids
  getRecords = <any>'getRecords', // gets all record and thier fields
  get = <any>'get' // gets a record and its fields
}

export enum PostActions {
  insert = <any>'insert',
  insertMultiple = <any>'insertMultiple',
  update = <any>'update',
  deleteRecord = <any>'deleteRecord',
  deleteMultiple = <any>'deleteMultiple'
}