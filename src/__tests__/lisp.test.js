"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lisp_helpers_1 = require("../lisp_helpers");
var lisp_1 = require("../lisp");
var lisp_interfaces_1 = require("../lisp_interfaces");
function add(exr, env) {
    var memo = lisp_helpers_1.num(0);
    var list = exr.t.v;
    return list.reduce(function (item, accum) {
        if ((item.k === lisp_interfaces_1.Kind.Num) && (accum.k === lisp_interfaces_1.Kind.Num)) {
            var ok = item.v;
            accum.v += ok;
            return accum;
        }
        else {
            throw lisp_interfaces_1.Err.Type;
        }
    }, memo);
}
describe("lisp", function () {
    it("evaluates addition", function () {
        // (+ 2 2) in real lisp
        var expresion = lisp_helpers_1.expr(lisp_helpers_1.sym("+"), lisp_helpers_1.num(2), lisp_helpers_1.num(2));
        // A standard library that only has +
        var result = lisp_1.evaluate(expresion, { bindings: { "+": lisp_helpers_1.builtin(add) } });
        expect(result.k).toEqual(lisp_interfaces_1.Kind.Num);
        if (result.k === lisp_interfaces_1.Kind.Num) {
            expect(result.v).toEqual(4);
        }
        else {
            fail("Not a number.");
        }
    });
});
//# sourceMappingURL=lisp.test.js.map