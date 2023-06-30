// Local Imports
import { TemplateParser } from './parser';
import {
  ConfigBuilder,
  DatabaseBuilder,
  EndpointBuilder,
  ErrorBuilder,
  HandlerBuilder,
  HelperBuilder,
  TypesBuilder,
} from './builders';

// Types
import { CommandArguments } from './types/template';
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
    console.log('Generating');

    const builders = [] as Builder[];

    builders.push(new ConfigBuilder(this._outDir));
    builders.push(new DatabaseBuilder(this._outDir));
    builders.push(new EndpointBuilder(this._outDir));
    builders.push(new ErrorBuilder(this._outDir));
    builders.push(new HandlerBuilder(this._outDir));
    builders.push(new HelperBuilder(this._outDir));
    builders.push(new TypesBuilder(this._outDir));

    const tasks = [];

    for (let i = 0; i < builders.length; i += 1) {
      tasks.push(builders[i].build());
    }

    await Promise.all(tasks);
  }
}
