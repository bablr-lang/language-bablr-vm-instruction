import { i } from '@bablr/boot/shorthand.macro';
import { InjectFrom } from '@bablr/boot-helpers/decorators';
export const dependencies = new Map([['Spamex', spamex]]);
import * as productions from '@bablr/boot-helpers/productions';
import * as spamex from '@bablr/language-spamex';

const Node = Symbol.for('@bablr/node');

export const grammar = class BABLRVMInstructionGrammar {
  constructor() {
    this.aliases = new Map([[Node, new Set(['Call'])]]);
  }

  @InjectFrom(productions)
  List() {}

  @InjectFrom(productions)
  All() {}

  @InjectFrom(productions)
  Optional() {}

  // @Node
  *Call() {
    yield i`eat(<Identifier path='callee'>)`;
    yield i`eat(<| Punctuator '(' balanced=')' |>)`;
    yield i`eat(
              <List {
                separator: <| All {[
                  <| Optional {[ <| |> ]} |>
                  <| Punctuator ',' |>
                  <| Optional {[ <| |> ]} |>
                ]} |>,
                matchable: <Spamex:Matchable path='arguments'>
              }>
            )`;
    yield i`eat(<| Punctuator ')' balancer |>)`;
  }
};