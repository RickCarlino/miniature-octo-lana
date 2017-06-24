import { num, expr, sym, builtin } from "../lisp_helpers";
import { evaluate } from "../lisp";
import {
  Kind,
  Expression,
  Environment,
  Err,
  Atom,
  NumberAtom,
  Returnable
} from "../lisp_interfaces";

function add(exr: Expression, env: Environment): Returnable {
  let out = exr.t.v.reduce((item, accum) => {
    if ((item.k === Kind.Num) && (accum.k === Kind.Num)) {
      let ok = item.v;
      accum.v += ok
      return accum;
    } else {
      throw Err.Type;
    }
  }, num(0));
  if (out.k === Kind.Expression) {
    throw new Error(Err.Type);
  } else {
    return out;
  };
}

describe("lisp", () => {
  it("evaluates addition", () => {
    // (+ 2 2) in real lisp
    let expresion = expr(sym("+"), num(2), num(2));

    // A standard library that only has +
    let result = evaluate(expresion, { bindings: { "+": builtin(add) } });

    expect(result.k).toEqual(Kind.Num);
    if (result.k === Kind.Num) {
      expect(result.v).toEqual(4);
    } else {
      fail("Not a number.");
    }
  });
});

