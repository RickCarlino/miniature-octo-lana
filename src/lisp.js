"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lisp_interfaces_1 = require("./lisp_interfaces");
var lisp_helpers_1 = require("./lisp_helpers");
function evaluate(expr, env) {
    // expr("+", num(2), num(2));
    var binding = lisp_helpers_1.envGet(expr.h, env);
    switch (binding.k) {
        case lisp_interfaces_1.Kind.Builtin:
            return binding.v(expr, env);
        default:
            throw new Error(lisp_interfaces_1.Err.Type);
    }
}
exports.evaluate = evaluate;
//# sourceMappingURL=lisp.js.map