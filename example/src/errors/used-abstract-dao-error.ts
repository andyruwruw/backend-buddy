// Local Imports
import { MESSAGE_USED_ABSTRACT_DAO_ERROR } from '../config/messages';

/**
 * Abstract Data Access Object Class Used Error.
 */
export class UsedAbstractDaoError extends Error {
  constructor() {
    super(MESSAGE_USED_ABSTRACT_DAO_ERROR);
  }
}
