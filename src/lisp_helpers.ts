import {
  Kind,
  Atom,
  NilAtom,
  NumberAtom,
  SymbolAtom,
  Expression,
  Pair,
  Environment,
  Thing,
  Err,
  Builtin
} from "./lisp_interfaces";

export let nilP = (p: Atom): p is NilAtom => p.k == Kind.Nil;
export let isPair = (p: Atom): p is Pair => p.k == Kind.Pair;
export let isNum = (p: Atom): p is NumberAtom => p.k == Kind.Num;
/** "construct" a pair. */
export function cons(h: Atom, t: Atom): Pair {
  return { k: Kind.Pair, v: { k: Kind.Cons, h, t } };
}
export let head = (p: Atom): Atom => isPair(p) ? p.v.h : p;
export let tail = (p: Atom): Atom => isPair(p) ? p.v.t : p;

export function nil(): NilAtom {
  return { k: Kind.Nil, v: Kind.Nil };
};

export function num(v: number): NumberAtom {
  return { k: Kind.Num, v };
}

export function sym(v: string): SymbolAtom {
  return { k: Kind.Symbol, v };
}

export function builtin(v: Builtin["v"]): Builtin {
  return { k: Kind.Builtin, v };
}

export function expr(h: SymbolAtom, ...body: Atom[]): Expression {
  return { k: Kind.Expression, h, t: { k: Kind.List, v: body } };
}

export function defun() {
  throw new Error("NOT IMPL")
}
export function envGet(sym: SymbolAtom, env: Environment): Atom {
  let binding = env.bindings[sym.v];
  if (binding) {
    return binding;
  } else {
    if (env.parent) {
      // Walk up the chain.
      return envGet(sym, env);
    } else {
      // No such var.
      throw new Error("" + Err.Unbound);
    }
  }
}
