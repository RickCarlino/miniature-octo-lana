export enum Kind { Nil, Num, Symbol, Pair, Expression, List, Cons, Builtin }
export interface NilAtom { k: Kind.Nil; v: Kind.Nil; }
export interface NumberAtom { k: Kind.Num; v: number; }
export interface SymbolAtom { k: Kind.Symbol; v: string; }
export interface Builtin { k: Kind.Builtin; v(expr: Expression, env: Environment): Atom | List; }
export interface Pair { k: Kind.Pair; v: Cons; }
export interface Cons { k: Kind.Cons, h: Atom; t: Atom; }
export type Atom = NilAtom | NumberAtom | SymbolAtom | Builtin | Pair;
export type List<T extends Atom = Atom> = { k: Kind.List, v: Atom[] };
export type Thing = Atom | List;
export interface Expression { k: Kind.Expression; h: SymbolAtom; t: List; }
export type SYMBOL_TABLE = { [name: string]: Atom | undefined };
export interface Environment { parent?: Environment; bindings: SYMBOL_TABLE; }
export interface Stack { ds: Atom[]; rs: Atom[] };

export enum Err {
  Syntax = "Syntax error!",
  /** Attempted to evaluate a symbol for which no binding exists */
  Unbound = "Unbound variable!",
  /** object in expression was of a different type than expected */
  Type = "Unexpected type",
  /** A list expression was shorter or longer than expected */
  Args = "Bad args!",
  /** Out of ideas */
  Misc = "Uh oh..."
};
