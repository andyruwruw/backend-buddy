// Types
import { CommandArguments } from './types';
import { TemplateParser } from './parser';

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
   * File path to template.
   */
  _template: TemplateParser | null = null;

  /**
   * Loads command line arguments.
   *
   * @param {CommandArguments | Promise<CommandArguments>} argv Command arguments.
   */
  loadArgs(argv: CommandArguments | Promise<CommandArguments>) {
    this._argv = argv;

    const templatePath = 'template' in argv ? argv.template as string : '';

    this._template = new TemplateParser(templatePath);

    console.log(this._argv);
  }

  /**
   * Generates a backend off a template JSON.
   */
  generate() {
    console.log('generate');
  }
}
