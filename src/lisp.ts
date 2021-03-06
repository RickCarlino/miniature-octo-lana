import { Expression, Environment, Kind, Err, Returnable } from "./lisp_interfaces";
import { nil, envGet } from "./lisp_helpers";

export function evaluate(expr: Expression, env: Environment): Returnable {
  // expr("+", num(2), num(2));
  let binding = envGet(expr.h, env);
  switch (binding.k) {
    case Kind.Builtin:
      return binding.v(expr, env);
    default:
      throw new Error(Err.Type);
  }
}
