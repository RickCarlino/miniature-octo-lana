import { s_expr, expr, num, AtomType, cons, sym } from "./lisp";

describe("lisp", () => {
  it("evaluates addition", () => {
    let myApp = expr("+", num(1), num(2));
    // (+ 2 2)
    let code = cons(sym("+"), cons(num(2), num(2)));
    console.log(JSON.stringify(code));
    let result = s_expr(code, { parent: undefined, bindings: {} });
    expect(result.kind).toEqual(AtomType.Integer);
    expect(result.value).toBe(4);
  });
});

