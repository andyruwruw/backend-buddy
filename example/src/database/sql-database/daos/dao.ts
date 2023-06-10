// Local Imports
import { UsedAbstractDAOError } from '../../../errors/used-abstract-dao-error';
import { SqlDatabase } from '..';

// Types
import {
  ColumnOptions,
  ColumnReference,
  MariaDbQuery,
  MariaDbQueryParameters,
  MariaDbQueryTemplate,
  QueryConditions,
  QueryProjection,
  QueryUpdate,
  SqlColumnTypes,
  DataAccessObjectInterface,
} from '../../../types';

/**
 * Abstract Data Access Object, use concrete implementations.
 */
export class DataAccessObject<T> implements DataAccessObjectInterface<T> {
  /**
   * Properties of T.
   */
  _schema: string[];

  /**
   * Types of each property.
   */
  _types: SqlColumnTypes[];

  /**
   * Additional options for columns.
   */
  _options: ColumnOptions[];

  constructor() {
    this._setSchema();
    this._setTypes();
    this._setOptions();
  }

  /**
   * Sends a query to the database.
   *
   * @param {string} query Query to be sent.
   * @returns {any} Whatever is returned.
   */
  async query(query: string | MariaDbQuery): Promise<any> {
    if (SqlDatabase.connection) {
      if (query instanceof Array) {
        const template = query[0] as MariaDbQueryTemplate;
        const parameters = query[1] as MariaDbQueryParameters;

        return SqlDatabase.connection.query(
          template,
          parameters,
        );
      }
      return SqlDatabase.connection.query(query);
    }
    return null;
  }

  /**
   * Creates the table if not already made.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async createTable(): Promise<void> {
    return this.query(this._getCreateTableQuery());
  }

  /**
   * Drops a table.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async dropTable(): Promise<void> {
    return this.query(this._getDropTableQuery());
  }

  /**
   * Deletes all rows.
   *
   * @returns {Promise<void>} Promise of action.
   */
  async deleteAll(): Promise<void> {
    return this.query(this._getDeleteAllQuery());
  }

  /**
   * Inserts a new item into the database.
   *
   * @param {T} item Items to insert.
   * @returns {Promise<number>} Number of rows inserted.
   */
  async insert(item: T): Promise<number> {
    return (await this.query(this._getInsertQuery(item))).affectedRows;
  }

  /**
   * Finds items that fit the conditions and applies projection.
   *
   * @param {QueryConditions} conditions Conditions items should fit.
   * @param {QueryProjection} projection Projection to be applied.
   * @returns {Promise<Record<string, DatabaseColumnTypes>[]>} Items that fit the conditions with projection.
   */
  async find(
    conditions: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T[]> {
    return (await this.query(this._getFindQuery(
      conditions,
      projection,
    ))) as T[];
  }

  /**
   * Finds an item that fit the conditions and applies projection.
   *
   * @param {QueryConditions} conditions Conditions items should fit.
   * @param {QueryProjection} projection Projection to be applied.
   * @returns {Promise<Record<string, DatabaseColumnTypes> | null>} Items that fit the conditions with projection.
   */
  async findOne(
    conditions: QueryConditions = {},
    projection: QueryProjection = {},
  ): Promise<T | null> {
    return (await this.query(this._getFindQuery(
      conditions,
      projection,
    )))[0] as T | null;
  }

  /**
   * Deletes items that fit a set of conditions.
   *
   * @param {QueryConditions} conditions Conditions items should fit.
   * @returns {Promise<number>} The number of items deleted.
   */
  async delete(conditions: QueryConditions = {}): Promise<number> {
    return (await this.query(this._getDeleteQuery(conditions))).affectedRows;
  }

  /**
   * Updates items that fit a set of conditions.
   *
   * @param {QueryConditions} conditions Conditions items should fit.
   * @param {QueryUpdate} update Updates to be applied
   * @returns {Promise<number>} The number of items updated.
   */
  async update(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
  ): Promise<number> {
    return (await this.query(this._getUpdateQuery(
      conditions,
      update,
    ))).affectedRows;
  }

  /**
   * Initializes the schema.
   */
  _setSchema(): void {
    this._schema = [];
  }

  /**
   * Initializes the types.
   */
  _setTypes(): void {
    this._types = [];
  }

  /**
   * Initializes column options.
   */
  _setOptions(): void {
    this._options = [];
  }

  /**
   * Retrieves drop table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getDropTableQuery(): string {
    return `DROP TABLE ${this._getTableName()};\n`;
  }

  /**
   * Retrieves drop all query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getDeleteAllQuery(): string {
    return `DROP FROM ${this._getTableName()};\n`;
  }

  /**
   * Retrieves create table query for object.
   * 
   * @returns {string} SQL query for create table.
   */
  _getCreateTableQuery(): string {
    let query = `CREATE TABLE IF NOT EXISTS ${this._getTableName()} (\n`;

    for (let i = 0; i < this._schema.length; i += 1) {
      query += this._getColumnCreateStatement(i);
    }

    const primaryKeys = this._getPrimaryKeyCreateStatement();

    if (primaryKeys) {
      query += `,\n${primaryKeys}`;
    }

    const foreignKeys = this._getForeignKeyCreateStatements();

    if (foreignKeys) {
      query += `,\n${foreignKeys}`;
    }

    query += `\n) ${this._getEngineSpecifics()};\n`;

    return query;
  }

  /**
   * Generates insert query for item.
   *
   * @param {T} item Item row to be inserted. 
   * @returns {MariaDbQuery} Query to insert item.
   */
  _getInsertQuery(item: T): MariaDbQuery {
    let sql = `INSERT INTO ${this._getTableName()} (${this._schema.join(', ')})\n`;
    sql += `VALUES (${this._schema.map((column) => {
      return `:${column}`;
    }).join(', ')});\n`

    const template = {
      namedPlaceholders: true,
      sql,
    } as MariaDbQueryTemplate;

    return [
      template,
      item as MariaDbQueryParameters,
    ] as MariaDbQuery;
  }

  /**
   * Generates update query for item.
   *
   * @param {QueryConditions} conditions How to select the right item to update.
   * @param {QueryUpdate} update What updates to make.
   * @returns {MariaDbQuery} Query to update item.
   */
  _getUpdateQuery(
    conditions: QueryConditions = {},
    update: QueryUpdate = {},
  ): MariaDbQuery {
    let sql = `UPDATE ${this._getTableName()}\n`;
    sql += `\t${this._createUpdateStatement(update)}\n`;
    sql += `\t${this._createConditionsStatement(conditions)};\n`;

    const template = {
      namedPlaceholders: true,
      sql,
    } as MariaDbQueryTemplate;

    return [
      template,
      {
        ...conditions,
        ...update,
      } as MariaDbQueryParameters,
    ] as MariaDbQuery;
  }

  /**
   * Generates delete query for item.
   *
   * @param {QueryConditions} conditions How to select the right item to update.
   * @returns {MariaDbQuery} Query to update item.
   */
  _getDeleteQuery(conditions: QueryConditions = {},): MariaDbQuery {
    let sql = `DELETE FROM ${this._getTableName()}\n`;
    sql += `\t${this._createConditionsStatement(conditions)};\n`;

    const template = {
      namedPlaceholders: true,
      sql,
    } as MariaDbQueryTemplate;

    return [
      template,
      conditions as MariaDbQueryParameters,
    ] as MariaDbQuery;
  }

  /**
   * Generates find query for item.
   *
   * @param {QueryConditions} conditions How to select the right item to update.
   * @param {QueryProjection} projection Projection to apply.
   * @returns {MariaDbQuery} Query to update item.
   */
  _getFindQuery(
    conditions: QueryConditions = {},
    projection: QueryProjection = {},
  ): MariaDbQuery {
    let sql = `SELECT ${this._createProjectionStatement(projection)}\n`;
    sql += `FROM ${this._getTableName()}\n`;
    sql += `${this._createConditionsStatement(conditions)};\n`;

    const template = {
      namedPlaceholders: true,
      sql,
    } as MariaDbQueryTemplate;

    return [
      template,
      conditions as MariaDbQueryParameters,
    ] as MariaDbQuery;
  }

  /**
   * Converts a condition object to SQL.
   *
   * @param {QueryConditions} conditions Conditions to be converted.
   * @returns {string} SQL where condition.
   */
  _createConditionsStatement(conditions: QueryConditions): string {
    const columns = Object.keys(conditions);

    if (columns.length === 0) {
      return '';
    }

    return `WHERE ${columns.map((column) => {
      return `\`${column}\` = :${column}`;
    }).join(' AND ')}`;
  }

  /**
   * Converts a projection object to SQL.
   *
   * @param {QueryProjection} projection Projection to be converted.
   * @returns {string} SQL projection.
   */
  _createProjectionStatement(projection: QueryProjection): string {
    const keys = Object.keys(projection);

    if (keys.length === 0) {
      return '*';
    }

    const columns = [];
    let isExclude = false;

    for (let i = 0; i < keys.length; i += 1) {
      if (projection[keys[i]] === false) {
        isExclude = true;
        break;
      }

      if (projection[keys[i]]) {
        columns.push(keys[i]);
      }
    }

    if (isExclude) {
      for (let i = 0; i < this._schema.length; i += 1) {
        const column = this._schema[i];

        if (!(column in projection) || projection[column]) {
          columns.push(column);
        }
      }
    }

    return columns.join(', ');
  }

  /**
   * Converts a update object to SQL.
   *
   * @param {QueryUpdate} update Update set to be converted.
   * @returns {string} SQL update.
   */
  _createUpdateStatement(update: QueryUpdate): string {
    const columns = Object.keys(update);

    if (columns.length === 0) {
      return '';
    }

    return `SET ${columns.map((column) => {
      return `\`${column}\` = :${column}`;
    }).join(', ')}`;
  }

  /**
   * Retrieves a create statement for a given row.
   *
   * @param {number} index Index of the row.
   * @returns {string} Create statement.
   */
  _getColumnCreateStatement(index: number): string {
    if (index >= this._schema.length) {
      return '';
    }

    let row = '';

    if (index > 0) {
      row += ',\n';
    }

    row += `\t\`${this._schema[index]}\` ${this._types[index]}`;

    if (this._options[index].unsigned) {
      row += ' unsigned';
    }

    if (this._options[index].default) {
      row += ` DEFAULT(${this._options[index].default})`;
    }

    if (this._options[index].notNull) {
      row += ' NOT NULL';
    }

    if (this._options[index].autoIncrement) {
      row += ' AUTO_INCREMENT';
    }

    return row;
  }

  /**
   * Retrieves a create statement for primary keys.
   * 
   * @returns {string} Create statement.
   */
  _getPrimaryKeyCreateStatement(): string {
    let keys = [];

    for (let i = 0; i < this._schema.length; i += 1) {
      if (this._options[i].primaryKey) {
        keys.push(`\`${this._schema[i]}\``);
      }
    }

    if (keys.length === 0) {
      return '';
    }

    return `\tPRIMARY KEY (${keys.join(', ')})`;
  }

  /**
   * Retrieves a create statement for foreign keys.
   * 
   * @returns {string} Create statement.
   */
  _getForeignKeyCreateStatements(): string {
    let query = '';

    for (let i = 0; i < this._schema.length; i += 1) {
      if (this._options[i].foreignKey !== null) {
        if (query) {
          query += ',\n';
        }

        const column = this._schema[i];
        const table = this._options[i].foreignKey?.table;
        const key = this._options[i].foreignKey?.primaryKey;

        query += `\tFOREIGN KEY (\`${column}\`) REFERENCES \`${table}\` (\`${key}\`)`;

        if (this._options[i].foreignKey?.deleteOnCascade) {
          query += ' ON DELETE CASCADE';
        }
      }
    }

    return query;
  }

  /**
   * Retrieves insert query for object.
   * 
   * @returns {string} SQL query for insert.
   */
  _getTableName(): string {
    throw new UsedAbstractDAOError();
  }

  /**
   * Returns weird engine specific stuff for table create stuff.
   *
   * @returns {string} Statement for create table.
   */
  _getEngineSpecifics(): string {
    return 'ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3';
  }

  /**
   * Creates a column options object.
   *
   * @param options Changes to default options.
   * @returns {ColumnOptions} Column options.
   */
  static createOptions(options: Record<string, (boolean | number | string | null | undefined | ColumnReference)>) {
    let result = {
      notNull: false,
      unsigned: false,
      default: undefined,
      primaryKey: false,
      foreignKey: null,
      autoIncrement: false,
    } as ColumnOptions;

    const keys = Object.keys(options);

    for (let i = 0; i < keys.length; i += 1) {
      result[keys[i]] = options[keys[i]];
    }

    return result;
  }

  /**
   * Generates a foreign key.
   *
   * @param {string} table Table referenced to.
   * @param {string} primaryKey Key from table.
   * @param {boolean} deleteOnCascade Delete when reference is deleted.
   * @returns {ColumnReference} Reference to foreign table.
   */
  static createForeignKey(
    table: string,
    primaryKey: string,
    deleteOnCascade = true,
  ): ColumnReference {
    return {
      table,
      primaryKey,
      deleteOnCascade,
    };
  }
}