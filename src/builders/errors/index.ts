// Local Imports
import { Builder } from '../builder';

/**
 * Builds the error sub-layer.
 */
export class ErrorBuilder extends Builder {
  /**
   * Instantiates a new errors builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('errors'));
  }
}
