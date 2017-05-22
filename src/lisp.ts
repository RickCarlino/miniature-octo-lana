interface NativeFn {
  (args: Atom, ctx: Context): Atom;
}
/** Tag an atom with an identifier. */
export enum AtomType {
  Nil,
  Pair,
  Symbol,
  Number_,
  Native
}
export interface NilAtom { kind: AtomType.Nil; value: AtomType.Nil; }
export interface NumberAtom { kind: AtomType.Number_; value: number; }
export interface SymbolAtom { kind: AtomType.Symbol; value: string; }
export interface Pair { kind: AtomType.Pair; value: Cons; }
export interface Cons { h: Atom; t: Atom; }
// http://sandbox.mc.edu/~bennet/cs404/doc/tomslsp/code/builtinDESC.html
export interface Native { kind: AtomType.Native; value: NativeFn; }
export type Atom =
  | NilAtom
  | SymbolAtom
  | NumberAtom
  | Pair
  | Native;
/** ...is Nil predicate. */
export let nilP = (p: Atom): p is NilAtom => p.kind == AtomType.Nil;
export let isPair = (p: Atom): p is Pair => p.kind == AtomType.Pair;
export let isNum = (p: Atom): p is NumberAtom => p.kind == AtomType.Number_;
/** "construct" a pair. */
export function cons(h: Atom, t: Atom): Pair {
  return { kind: AtomType.Pair, value: { h, t } };
}
export let head = (p: Atom): Atom => isPair(p) ? p.value.h : p;
export let tail = (p: Atom): Atom => isPair(p) ? p.value.t : p;;

export function nil(): NilAtom {
  return { kind: AtomType.Nil, value: AtomType.Nil };
};

export function num(value: number): NumberAtom {
  return { kind: AtomType.Number_, value };
}

export function sym(value: string): SymbolAtom {
  return { kind: AtomType.Symbol, value };
}

export function expr(value: string, ...body: Atom[]): Expression {
  return {
    kind: FormKind.expr,
    predicate: { kind: AtomType.Symbol, value },
    body
  };
}

export function native(value: NativeFn): Native {
  return { kind: AtomType.Native, value };
}

type SYMBOL_TABLE = { [name: string]: Atom | undefined };

interface Environment {
  parent: undefined | Environment;
  bindings: SYMBOL_TABLE;
}

export interface Context {
  stack: Atom[];
  environment: Environment;
}

export function make_symbol(value: string, env: Environment): Atom {
  let x = env.bindings[value];
  if (x) {
    return x;
  } else {
    x = { kind: AtomType.Symbol, value };
    env.bindings[value] = x;
    return x;
  };
}

export enum Err {
  Syntax,
  /** Attempted to evaluate a symbol for which no binding exists */
  Unbound,
  /** object in expression was of a different type than expected */
  Type,
  /** A list expression was shorter or longer than expected */
  Args,
  /** Out of ideas */
  Misc
};

export function env_create(parent: Pair | NilAtom): Pair {
  return cons(parent, nil());
}

export function envGet(symbol: SymbolAtom, ctx: Context): Atom {
  let binding = ctx.environment.bindings[symbol.value];
  if (binding) {
    return binding;
  } else {
    if (ctx.environment.parent) {
      return envGet(symbol, ctx);
    } else {
      throw new Error("" + Err.Unbound);
    }
  }
}

export function envSet(env: Pair, symbol: SymbolAtom, value: Atom): Err {
  throw new Error("BRB");
}

export function evaluate(expr: Atom, ctx: Context): Atom {
  // COOL!
  // http://blog.davydovanton.com/2015/11/01/write-simple-scheme-interpreter-on-ruby/
  switch (expr.kind) {
    case AtomType.Symbol:
      return envGet(expr, ctx);
    case AtomType.Pair:
      let code = evaluate(head(expr), ctx);
      let args_ = evaluate(tail(expr), ctx);
      if (code.kind === AtomType.Native) {
        (code).value.call(args_, ctx);
      } else {
        return tail(code);
      }
    default:
      return expr;

  }
}

enum FormKind {
  expr,
  quote,
  lambda,
  define,
  builtin,
  apply
}

type Form = Expression;

interface Expression {
  kind: FormKind.expr;
  predicate: SymbolAtom;
  body: Atom[];
}

interface Quote {
  kind: FormKind.quote;
  predicate: SymbolAtom;
  body: Atom[];
}
