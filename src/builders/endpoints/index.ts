// Local Imports
import { Builder } from '../builder';

/**
 * Builds the endpoint sub-layer.
 */
export class EndpointBuilder extends Builder {
  /**
   * Instantiates a new endpoints builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('endpoints'));
  }
}
