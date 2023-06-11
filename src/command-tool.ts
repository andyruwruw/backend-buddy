// Types
import { CommandArguments } from './types/template';
import { TemplateParser } from './parser';
import { Builder } from './builders/builder';

/**
 * Handles interactions between system
 * and command line.
 */
export class CommandTool {
  /**
   * Directory to output into.
   */
  _outDir = '.';

  /**
   * File path to template.
   */
  _template: TemplateParser | null = null;

  /**
   * Loads command line arguments.
   *
   * @param {CommandArguments | Promise<CommandArguments>} argv Command arguments.
   */
  loadArgs(argv: CommandArguments | Promise<CommandArguments>): void {
    const templatePath = 'template' in argv ? argv.template as string : '';
    this._outDir = 'out' in argv ? argv.out as string : '.';

    new TemplateParser(templatePath);
  }

  /**
   * Generates a backend off a template JSON.
   */
  async generate(): Promise<void> {
    console.log('generate');
    const builder = new Builder(this._outDir);
  }
}
