/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { UsedAbstractDatabaseError } from '../errors/used-abstract-database-error';

// Types
import {
  Annotation,
  DataAccessObjectInterface,
  Goals,
  Researcher,
  Study,
  StudyTrack,
  Track,
  User,
} from '../types';

/**
 * Abstract Database interface, only implement inherited classes.
 */
export class Database {
  /**
   * Data access object for annotations.
   */
  annotations: DataAccessObjectInterface<Annotation>;

  /**
   * Data access object for annotations.
   */
  goals: DataAccessObjectInterface<Goals>;

  /**
   * Data access object for annotations.
   */
  researchers: DataAccessObjectInterface<Researcher>;

  /**
   * Data access object for annotations.
   */
  studyTracks: DataAccessObjectInterface<StudyTrack>;

  /**
   * Data access object for annotations.
   */
  studies: DataAccessObjectInterface<Study>;

  /**
   * Data access object for annotations.
   */
  tracks: DataAccessObjectInterface<Track>;

  /**
   * Data access object for annotations.
   */
  users: DataAccessObjectInterface<User>;

  /**
   * Connects to database.
   *
   * @param {string | undefined} [databaseUrl=''] Database URL.
   * @param {string | undefined} [databaseUser=''] Database username.
   * @param {string | undefined} [databasePassword=''] Database password.
   */
  async connect(
    databaseUrl = '',
    databaseUser = '',
    databasePassword = '',
  ): Promise<void> {
    throw new UsedAbstractDatabaseError();
  }

  /**
   * Whether or not the database is connected.
   *
   * @returns {boolean} Whether or not the database is connected.
   */
  isConnected(): boolean {
    return false;
  }
}
