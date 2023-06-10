// Packages
import mongoose, {
  connect,
  connection,
} from 'mongoose';

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
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../../config/messages';
import { Monitor } from '../../helpers/monitor';

mongoose.set('strictQuery', false);

/**
 * Database connection to MongoDB.
 */
export class MongoDatabase extends Database {
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
   * Instantiates MongoDatabase with correct queries.
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
    if (!databaseUrl) {
      throw new DatabaseUrlMissingError();
    }

    const authorizedUrl = databaseUrl
      .replace(
        '<user>',
        databaseUser,
      )
      .replace(
        '<password>',
        databasePassword,
      );
    await connect(authorizedUrl);

    Monitor.log(
      MongoDatabase,
      MESSAGE_DATABASE_CONNECTION_SUCCESS,
      Monitor.Layer.UPDATE,
    );
  }

  /**
   * Whether the class is connected to the database.
   *
   * @returns {boolean} Whether the class is connected to the database.
   */
  isConnected(): boolean {
    return connection && 'readyState' in connection ? connection.readyState === 1 : false;
  }
}
