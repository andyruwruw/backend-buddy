// Local Imports
import { Builder } from '../builder';
import { ClassBuilder } from '../segments';

/**
 * Builds the abstract database sub-layer.
 */
export class AbstractDatabaseBuilder extends Builder {
  /**
   * Instantiates a new database builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('database'));
  }

  /**
   * Runs the builder.
   */
  async build(): Promise<string> {
    await this._awaitTasks();

    await this._createFile('database.ts');

    this._append('Hello World');

    await this._writeToFile();

    return super.build();
  }
}

class AbstractDatabaseClass extends ClassBuilder {
}