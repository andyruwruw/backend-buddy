// Local Imports
import { Builder } from '../builder';

/**
 * Builds the helper sub-layer.
 */
export class HelperBuilder extends Builder {
  /**
   * Instantiates a new helpers builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('helpers'));
  }
}
