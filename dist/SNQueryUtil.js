"use strict";
var GetActions;
(function (GetActions) {
    GetActions[GetActions["getKeys"] = 'getKeys'] = "getKeys";
    GetActions[GetActions["getRecords"] = 'getRecords'] = "getRecords";
    GetActions[GetActions["get"] = 'get'] = "get"; // gets a record and its fields
})(GetActions = exports.GetActions || (exports.GetActions = {}));
var PostActions;
(function (PostActions) {
    PostActions[PostActions["insert"] = 'insert'] = "insert";
    PostActions[PostActions["insertMultiple"] = 'insertMultiple'] = "insertMultiple";
    PostActions[PostActions["update"] = 'update'] = "update";
    PostActions[PostActions["deleteRecord"] = 'deleteRecord'] = "deleteRecord";
    PostActions[PostActions["deleteMultiple"] = 'deleteMultiple'] = "deleteMultiple";
})(PostActions = exports.PostActions || (exports.PostActions = {}));
//# sourceMappingURL=SNQueryUtil.js.map