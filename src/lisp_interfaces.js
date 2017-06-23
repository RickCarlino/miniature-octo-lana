"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Kind;
(function (Kind) {
    Kind[Kind["Nil"] = 0] = "Nil";
    Kind[Kind["Num"] = 1] = "Num";
    Kind[Kind["Symbol"] = 2] = "Symbol";
    Kind[Kind["Pair"] = 3] = "Pair";
    Kind[Kind["Expression"] = 4] = "Expression";
    Kind[Kind["List"] = 5] = "List";
    Kind[Kind["Cons"] = 6] = "Cons";
    Kind[Kind["Builtin"] = 7] = "Builtin";
})(Kind = exports.Kind || (exports.Kind = {}));
;
var Err;
(function (Err) {
    Err[Err["Syntax"] = "Syntax error!"] = "Syntax";
    /** Attempted to evaluate a symbol for which no binding exists */
    Err[Err["Unbound"] = "Unbound variable!"] = "Unbound";
    /** object in expression was of a different type than expected */
    Err[Err["Type"] = "Unexpected type"] = "Type";
    /** A list expression was shorter or longer than expected */
    Err[Err["Args"] = "Bad args!"] = "Args";
    /** Out of ideas */
    Err[Err["Misc"] = "Uh oh..."] = "Misc";
})(Err = exports.Err || (exports.Err = {}));
;
//# sourceMappingURL=lisp_interfaces.js.map