"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lisp_interfaces_1 = require("./lisp_interfaces");
exports.nilP = function (p) { return p.k == lisp_interfaces_1.Kind.Nil; };
exports.isPair = function (p) { return p.k == lisp_interfaces_1.Kind.Pair; };
exports.isNum = function (p) { return p.k == lisp_interfaces_1.Kind.Num; };
/** "construct" a pair. */
function cons(h, t) {
    return { k: lisp_interfaces_1.Kind.Pair, v: { k: lisp_interfaces_1.Kind.Cons, h: h, t: t } };
}
exports.cons = cons;
exports.head = function (p) { return exports.isPair(p) ? p.v.h : p; };
exports.tail = function (p) { return exports.isPair(p) ? p.v.t : p; };
function nil() {
    return { k: lisp_interfaces_1.Kind.Nil, v: lisp_interfaces_1.Kind.Nil };
}
exports.nil = nil;
;
function num(v) {
    return { k: lisp_interfaces_1.Kind.Num, v: v };
}
exports.num = num;
function sym(v) {
    return { k: lisp_interfaces_1.Kind.Symbol, v: v };
}
exports.sym = sym;
function builtin(v) {
    return { k: lisp_interfaces_1.Kind.Builtin, v: v };
}
exports.builtin = builtin;
function expr(h) {
    var body = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        body[_i - 1] = arguments[_i];
    }
    return { k: lisp_interfaces_1.Kind.Expression, h: h, t: { k: lisp_interfaces_1.Kind.List, v: body } };
}
exports.expr = expr;
function defun(h, args_, body) {
    throw new Error("NOT IMPL");
}
exports.defun = defun;
function envGet(sym, env) {
    var binding = env.bindings[sym.v];
    if (binding) {
        return binding;
    }
    else {
        if (env.parent) {
            // Walk up the chain.
            return envGet(sym, env);
        }
        else {
            // No such var.
            throw new Error("" + lisp_interfaces_1.Err.Unbound);
        }
    }
}
exports.envGet = envGet;
//# sourceMappingURL=lisp_helpers.js.map