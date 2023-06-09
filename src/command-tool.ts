// Types
import { CommandArguments } from './types';

/**
 * Handles interactions between system
 * and command line.
 */
export class CommandTool {
  /**
   * Command arguments.
   */
  _argv: CommandArguments | Promise<CommandArguments> | null = null;

  /**
   * Loads command line arguments.
   *
   * @param {CommandArguments | Promise<CommandArguments>} argv Command arguments.
   */
  loadArgs(argv: CommandArguments | Promise<CommandArguments>) {
    this._argv = argv;

    console.log(this._argv);
  }

  /**
   * Generates a backend off a template JSON.
   */
  generate() {
    console.log('generate');
  }
}
