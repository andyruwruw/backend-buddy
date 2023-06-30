// Local Imports
import { Builder } from '../builder';

/**
 * Builds the config sub-layer.
 */
export class ConfigBuilder extends Builder {
  /**
   * Instantiates a new config builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._moveInto('config');
  }
}
