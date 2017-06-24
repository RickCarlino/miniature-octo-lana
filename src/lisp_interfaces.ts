export enum Kind {
  Nil,
  Num,
  Symbol,
  Pair,
  Expression,
  List,
  Cons,
  Builtin,
  Lambda
}

export interface NilAtom {
  k: Kind.Nil;
  v: Kind.Nil;
}

export interface NumberAtom {
  k: Kind.Num;
  v: number;
}

export interface SymbolAtom {
  k: Kind.Symbol;
  v: string;
}

export interface Builtin {
  k: Kind.Builtin;
  v(expr: Expression, env: Environment): Returnable;
}

export interface Pair {
  k: Kind.Pair;
  v: Cons;
}

export interface Cons {
  k: Kind.Cons;
  h: Atom;
  t: Atom;
}

export interface Lambda {
  k: Kind.Lambda;
  h: List<SymbolAtom>;
  t: Expression;
}

export type Passable = Atom | Expression;

export type Returnable = Atom | List;

export type Atom =
  | Builtin
  | Lambda
  | NilAtom
  | NumberAtom
  | Pair
  | SymbolAtom;

export interface List<T extends Passable = Passable> {
  k: Kind.List;
  v: T[];
};

export interface Expression {
  k: Kind.Expression;
  h: SymbolAtom;
  t: List;
}
export type SYMBOL_TABLE = {
  [name: string]: Atom | undefined;
};

export interface Environment {
  parent?: Environment;
  bindings: SYMBOL_TABLE;
}

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
