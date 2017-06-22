# JSON Based "Lisp"

Exploring some problems / ideas / solutions relating to user extensible programming environments. **This is purely an exploration of ideas.** Please don't use it for anything useful!

## Progress

 * `eval` is almost done. Probably needs a `VM` interface for tracking DS, RS, bindings, etc...

## Similar Works

 * JSON Script
 * Blockly
 * IFFT (proprietary)

## Areas of Exploration

 * Verify correctness before running.
 * Self documentation of variables, builtins, calls, etc.
 * Relocate / package AST nodes.
 * Functions, nesting of functions, passing of functions, etc.
 * Pausing, time slicing, resuming execution.
 * Nodes that can modify existing nodes / macros.
 * (Similar to above) Creating UIs that do not have a 1-to-1 correspondence to generated nodes.

## Structure

 * Atoms
 * Expressions
 * "Thing"
 * Quote/Unquote??

## Run

 1. `npm install`
 2. `npm start`
 3. Visit http://localhost:3002/

## Test

1. `npm install jest-cli -g`
2. `npm install`
3. `jest`
