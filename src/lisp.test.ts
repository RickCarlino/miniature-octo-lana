import {
  AtomType,
  cons,
  Context,
  expr,
  num,
  evaluate,
  sym,
  native,
  Native,
  Err,
  isNum,
  Atom
} from "./lisp";
let add: Native["value"] = (arg, env) => {
  switch (arg.kind) {
    case AtomType.Pair:
      if (isNum(arg.value.h)) {
        // Push head
        env.stack.push(arg.value.h);
        // Recurse into tail
        let next = arg.value.t;
        return add(next, env);
      }
    case AtomType.Number_:
      env.stack.push(arg);
      return arg;
    default:
      throw Err.Args;
  }
};
function ctx(): Context {
  return {
    stack: [],
    environment: {
      parent: undefined,
      bindings: {
        "+": native(add)
      }
    }
  };
}

describe("lisp", () => {
  it("evaluates addition", () => {
    // (+ 2 2)
    let code = cons(sym("+"), cons(num(2), num(2)));
    console.log(JSON.stringify(code));
    let result = evaluate(code, ctx());
    expect(result.kind).toEqual(AtomType.Number_);
    expect(result.value).toBe(4);
  });

  it("evals (log (+ 1 2 (* 3 4)))");
  it("evals (log (4 5 6 7))");
});

