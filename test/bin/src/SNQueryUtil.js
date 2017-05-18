"use strict";
var GetActions;
(function (GetActions) {
    GetActions[GetActions["getKeys"] = 0] = "getKeys";
    GetActions[GetActions["getRecords"] = 1] = "getRecords";
    GetActions[GetActions["get"] = 2] = "get"; // gets a record and its fields
})(GetActions = exports.GetActions || (exports.GetActions = {}));
var PostActions;
(function (PostActions) {
    PostActions[PostActions["insert"] = 0] = "insert";
    PostActions[PostActions["insertMultiple"] = 1] = "insertMultiple";
    PostActions[PostActions["update"] = 2] = "update";
    PostActions[PostActions["deleteRecord"] = 3] = "deleteRecord";
    PostActions[PostActions["deleteMultiple"] = 4] = "deleteMultiple";
})(PostActions = exports.PostActions || (exports.PostActions = {}));
//# sourceMappingURL=SNQueryUtil.js.map