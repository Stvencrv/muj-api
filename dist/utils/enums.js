"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = exports.Role = void 0;
var Role;
(function (Role) {
    Role[Role["Admin"] = 1] = "Admin";
    Role[Role["User"] = 2] = "User";
})(Role = exports.Role || (exports.Role = {}));
var State;
(function (State) {
    State["New"] = "New";
    State["InProgress"] = "InProgress";
    State["Finished"] = "Finished";
})(State = exports.State || (exports.State = {}));
