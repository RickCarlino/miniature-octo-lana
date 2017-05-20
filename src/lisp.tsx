/** Tag an atom with an identifier. */
export enum AtomType { Nil, Pair, Symbol, Integer }
export interface Cons { car: Atom; cdr: Atom; }
export interface NumberAtom { kind: AtomType.Integer; value: number; }
export interface NilAtom { kind: AtomType.Nil; value: AtomType.Nil; }
export interface Pair { kind: AtomType.Pair; value: Cons; }
export interface SymbolAtom { kind: AtomType.Symbol; value: string; }
export type Atom =
  | NilAtom
  | SymbolAtom
  | NumberAtom
  | Pair;

export let car = (p: Pair): Atom => p.value.car;
export let cdr = (p: Pair): Atom => p.value.cdr;

/** ...is Nil predicate. */
export let nilp = (p: Atom): p is NilAtom => p.kind == AtomType.Nil;
export let isPair = (p: Atom): p is Pair => p.kind == AtomType.Pair;

/** "cons"truct a pair. */
export function cons(car: Atom, cdr: Atom): Pair {
  return { kind: AtomType.Pair, value: { car, cdr } };
}

export function nil(): NilAtom {
  return { kind: AtomType.Nil, value: AtomType.Nil };
};

export function num(value: number): NumberAtom {
  return { kind: AtomType.Integer, value };
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

type SYMBOL_TABLE = { [name: string]: SymbolAtom | undefined };
interface Environment {
  parent: undefined | Environment;
  bindings: SYMBOL_TABLE;
}

export function make_symbol(value: string, env: Environment): SymbolAtom {
  let x = env.bindings[value];
  if (x) {
    return x;
  } else {
    x = { kind: AtomType.Symbol, value };
    env.bindings[value] = x;
    return x;
  };
}

enum Err {
  OK,
  Syntax,
  /** Attempted to evaluate a symbol for which no binding exists */
  Unbound,
  /** object in expression was of a different type than expected */
  Type,
  /** A list expression was shorter or longer than expected */
  Args
};

export function env_create(parent: Pair | NilAtom): Pair {
  return cons(parent, nil());
}

function envGet(env: Environment, symbol: SymbolAtom): Err {
  throw new Error("Throw an exception for unbound stuff.?");
}

export function envSet(env: Pair, symbol: SymbolAtom, value: Atom): Err {
  throw new Error("BRB");
}

/** Check if a list is a "proper list" */
export function listP(expr: Atom): number {
  throw new Error("BRB");
}

function evalExpr(expr: Expression, env: Environment): Atom | Err {
  throw new Error("BRB");
}

enum FormKind {
  expr,
  quote,
  lambda,
  define,
  builtin,
  apply
}

type Form = Expression | Quote;

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

let myApp = expr("+", num(1), num(2));

evalExpr(myApp, { parent: undefined, bindings: {} });
