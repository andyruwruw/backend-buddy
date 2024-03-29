// Local Imports
import { Builder } from '../builder';

/**
 * Builds the types sub-layer.
 */
export class TypesBuilder extends Builder {
  /**
   * Instantiates a new types builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('types'));
  }
}
