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
  console.log(JSON.stringify(arg));
  throw new Error("Whoop!");
};

function todo(arg: Atom, env: Context) {
  let nil: Atom = {
    kind: AtomType.Nil,
    value: AtomType.Nil
  };
  return nil;
}
function newContext(): Context {
  return {
    stack: [],
    environment: {
      parent: undefined,
      bindings: {
        "+": native(add),
        "log": native(todo)
      }
    }
  };
}

describe("lisp", () => {
  it("evaluates addition", () => {
    // (+ 2 2)
    let code = cons(sym("+"), cons(num(1),
      cons(num(2), num(3))));
    let result = evaluate(code, newContext());
    expect(result.kind).toEqual(AtomType.Number_);
    expect(result.value).toBe(4);
  });

  it("evals (log (+ 1 2 (* 3 4)))");
  it("evals (log (4 5 6 7))");
  it("defines a value");
  it("creates a lambda");
});
