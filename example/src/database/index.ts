// Local Imports
import { Database as DatabaseClass } from './database';
import { CacheDatabase } from './cache-database';
import { SqlDatabase } from './sql-database';
import { DATABASE_TYPES } from '../config';
import { MongoDatabase } from './mongo-database';
import { Environment } from '../helpers/environment';

/**
 * Static instance of the database.
 */
let DatabaseInstace: DatabaseClass | null = null;

/**
 * Generates database based on environmental variables.
 */
const initializeDatabase = async (): Promise<void> => {
  if (!DatabaseInstace) {
    if (Environment.getDatabaseType() == DATABASE_TYPES.MONGO) {
      DatabaseInstace = new MongoDatabase();
    } else if (Environment.getDatabaseType() == DATABASE_TYPES.SQL) {
      DatabaseInstace = new SqlDatabase();
    } else {
      DatabaseInstace = new CacheDatabase();
    }
  }
};

/**
 * Retrieves database based on environmental variables.
 *
 * @returns {Database} The database.
 */
export const getDatabase = (): DatabaseClass => {
  initializeDatabase();

  return DatabaseInstace as DatabaseClass;
};
