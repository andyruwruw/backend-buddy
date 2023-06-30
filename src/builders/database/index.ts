// Local Imports
import { TemplateParser } from '../../parser';
import { Builder } from '../builder';
import { CacheDatabaseBuilder } from './cache/cache-database';
import { AbstractDatabaseBuilder } from './database';
import { MongoDatabaseBuilder } from './mongo/mongo-database';
import { SqlDatabaseBuilder } from './sql/sql-database';

/**
 * Builds the database sub-layer.
 */
export class DatabaseBuilder extends Builder {
  /**
   * Instantiates a new database builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    super(currentDir);
    this._outstanding.push(this._moveInto('database'));
  }

  /**
   * Runs the builder.
   */
  async build(): Promise<string> {
    await this._awaitTasks();

    await this._createIndex();
    await this._createAbstractDatabase();
    await this._createDatabases();

    return super.build();
  }

  /**
   * Creates directory index.
   */
  async _createIndex(): Promise<void> {
    await this._createFile('index.ts');

    this._append('Hello World');

    await this._writeToFile();
  }

  /**
   * Creates abstract database class.
   */
  async _createAbstractDatabase(): Promise<void> {
    const abstractDatabase = new AbstractDatabaseBuilder(this._currentDir);

    await abstractDatabase.build();
  }

  /**
   * Creates various database implementations.
   */
  async _createDatabases(): Promise<void> {
    const tasks = [];

    if (TemplateParser.databases.includes('cache')) {
      const cache = new CacheDatabaseBuilder(this._currentDir);
      tasks.push(cache.build());
    }
    if (TemplateParser.databases.includes('mongo')) {
      const mongo = new MongoDatabaseBuilder(this._currentDir);
      tasks.push(mongo.build());
    }
    if (TemplateParser.databases.includes('sql')) {
      const sql = new SqlDatabaseBuilder(this._currentDir);
      tasks.push(sql.build());
    }

    await Promise.all(tasks);
  }
}
