import { Expression, Environment, Kind, Err, Thing } from "./lisp_interfaces";
import { nil, envGet } from "./lisp_helpers";

export function evaluate(expr: Expression, env: Environment): Thing {
  // expr("+", num(2), num(2));
  let binding = envGet(expr.h, env);
  switch (binding.k) {
    case Kind.Builtin:
      binding.v.call(expr, env);
      throw new Error("Stopped here. I think I need a VM" +
        " interface for storind a stack.");
    default:
      throw new Error(Err.Type);
  }
}
