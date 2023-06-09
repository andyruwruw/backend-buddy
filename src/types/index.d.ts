/**
 * Form arguments are passed by yargs.
 */
export interface CommandArguments {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};
