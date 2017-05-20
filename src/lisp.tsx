/** Tag an atom with an identifier. */
export enum AtomType { Nil, Pair, Symbol, Integer }
export interface Cons { car: Atom; cdr: Atom; }
export interface IntegerAtom { kind: AtomType.Integer; value: number; }
export interface NilAtom { kind: AtomType.Nil; value: AtomType.Nil; }
export interface Pair { kind: AtomType.Pair; value: Cons; }
export interface SymbolAtom { kind: AtomType.Symbol; value: string; }
export type Atom = NilAtom | SymbolAtom | IntegerAtom | Pair;

export let car = (p: Pair): Atom => p.value.car;
export let cdr = (p: Pair): Atom => p.value.cdr;

/** ...is Nil predicate. */
export let nilp = (p: Atom): p is NilAtom => p.kind == AtomType.Nil;
export let isPair = (p: Atom): p is Pair => p.kind == AtomType.Pair;
/** "cons"truct a pair. */
export function cons(car: Atom, cdr: Atom): Pair {
  return { kind: AtomType.Pair, value: { car, cdr } };
}

export const nil: NilAtom = { kind: AtomType.Nil, value: AtomType.Nil };

export function int(value: number): IntegerAtom {
  return { kind: AtomType.Integer, value };
}

export function symbol(value: string): SymbolAtom {
  return { kind: AtomType.Symbol, value };
}

let SYMBOL_TABLE: { [name: string]: SymbolAtom | undefined } = {};

export function make_symbol(value: string): SymbolAtom {
  let x = SYMBOL_TABLE[value];
  if (x) {
    return x;
  } else {
    x = { kind: AtomType.Symbol, value };
    SYMBOL_TABLE[value] = x;
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
  return cons(parent, nil);
}

function env_get(env: Pair, symbol: SymbolAtom): Err {
  throw new Error("Throw an exception for unbound stuff.?");
}

export function env_set(env: Pair, symbol: SymbolAtom, value: Atom): Err {
  throw new Error("BRB");
}

/** Check if a list is a "proper list" */
export function listp(expr: Atom): number {
  throw new Error("BRB");
}

function eval_expr(expr: Atom, env: Atom, result: Atom): Err {
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
  kind: FormKind.expr,
  predicate: SymbolAtom;
  body: Atom[];
}

interface Quote {
  kind: FormKind.quote,
  predicate: SymbolAtom;
  body: Atom[];
}
