import { num, expr, sym, builtin } from "../lisp_helpers";
import { evaluate } from "../lisp";
import {
  Kind,
  Expression,
  Environment,
  Err,
  Atom,
  NumberAtom
} from "../lisp_interfaces";

function add(exr: Expression, env: Environment) {
  let memo: NumberAtom = num(0);
  let list = exr.t.v;
  return list.reduce((item, accum) => {
    if ((item.k === Kind.Num) && (accum.k === Kind.Num)) {
      let ok = item.v;
      accum.v += ok
      return accum;
    } else {
      throw Err.Type;
    }
  }, memo);
}

describe("lisp", () => {
  it("evaluates addition", () => {
    let expresion = expr("+", num(2), num(2));
    let result = evaluate(expresion, {
      bindings: {
        "+": builtin(add)
      }
    });
    expect(result.k).toEqual(Kind.Num);
    if (result.k === Kind.Num) {
      expect(result.v).toEqual(4);
    } else {
      fail("Not a number.");
    }
  });
});

