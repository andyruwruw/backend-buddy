// Local Imports
import { Builder } from '../builder';

/**
 * Builds the handler sub-layer.
 */
export class HandlerBuilder extends Builder {
  /**
   * Instantiates a new handlers builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('handlers'));
  }
}
