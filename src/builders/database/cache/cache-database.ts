// Local Imports
import { Builder } from '../../builder';

export class CacheDatabaseBuilder extends Builder {
  /**
   * Instantiates a new cache database builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('cache'));
  }

  /**
   * Runs the builder.
   */
  async build(): Promise<string> {
    await this._awaitTasks();

    await this._createIndex();

    return super.build();
  }

  /**
   * Creates directory index.
   */
  async _createIndex(): Promise<void> {
    await this._createFile('index.ts');

    this._append('Hello World');

    await this._writeToFile();
  }
}
