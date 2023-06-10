// Packages
import {
  Connection,
  createConnection,
} from 'mariadb';

// Local Imports
import {
  AnnotationDataAccessObject,
  GoalsDataAccessObject,
  ResearcherDataAccessObject,
  StudyDataAccessObject,
  StudyTrackDataAccessObject,
  TrackDataAccessObject,
  UserDataAccessObject,
} from './daos';
import { Database } from '../database';
import { DatabaseUrlMissingError } from '../../errors/database-url-missing';
import { Environment } from '../../helpers/environment';
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';

const DATABASE_PORT = 3306;

/**
 * Database connection to SQL Database.
 */
export class SqlDatabase extends Database {
  /**
   * Data access object for annotations.
   */
  annotations = new AnnotationDataAccessObject();

  /**
   * Data access object for annotations.
   */
  goals = new GoalsDataAccessObject();

  /**
   * Data access object for annotations.
   */
  researchers = new ResearcherDataAccessObject();

  /**
   * Data access object for annotations.
   */
  studyTracks = new StudyTrackDataAccessObject();

  /**
   * Data access object for annotations.
   */
  studies = new StudyDataAccessObject();

  /**
   * Data access object for annotations.
   */
  tracks = new TrackDataAccessObject();

  /**
   * Data access object for annotations.
   */
  users = new UserDataAccessObject();

  /**
   * Connection to database.
   */
  static connection: Connection | null = null;

  /**
   * Instantiates SqlDatabase with correct queries.
   */
  constructor() {
    super();
  }

  /**
   * Connects to database.
   */
  async connect(
    databaseUrl = '',
    databaseUser = '',
    databasePassword = '',
  ): Promise<void> {
    if (!this.isConnected()) {
      try {
        if (!databaseUrl) {
          throw new DatabaseUrlMissingError();
        }
  
        SqlDatabase.connection = await createConnection({
          host: databaseUrl,
          user: databaseUser,
          password: databasePassword,
          port: DATABASE_PORT,
        });

        await SqlDatabase.connection.query(`USE ${Environment.getDatabaseName()}`);
    
        Monitor.log(
          SqlDatabase,
          MESSAGE_DATABASE_CONNECTION_SUCCESS,
          Monitor.Layer.UPDATE,
        );
      } catch (error) {
        Monitor.log(
          SqlDatabase,
          `${error}`,
          Monitor.Layer.WARNING,
        );
      }
    }
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return SqlDatabase.connection !== null;
  }
}
