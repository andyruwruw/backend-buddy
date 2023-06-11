/**
 * Form arguments are passed by yargs.
 */
export interface CommandArguments {
  [x: string]: unknown;
  _: (string | number)[];
  $0: string;
};

/**
 * Types of server connection implementations.
 */
export type ServerType = 'vercel' | 'express' | 'websocket';

/**
 * Types of database connections implemented.
 */
export type ServerDatabase = 'sql' | 'mongo' | 'cache';

/**
 * Types for database columns.
 */
export type DatabaseColumnType = 'string'
  | 'number'
  | 'boolean'
  | 'bool'
  | 'object'
  | 'array'
  | `char(${number})`
  | `varchar(${number})`
  | `varchar(max)`
  | 'text'
  | `text(${number})`
  | 'tinytext'
  | 'nchar'
  | 'nvarchar'
  | 'ntext'
  | `binary(${number})`
  | 'varbinary'
  | 'varbinary(max)'
  | 'image'
  | 'nvarchar(max)'
  | 'bit'
  | `bit(${number})`
  | 'tinyint'
  | `tinyint(${number})`
  | 'smallint'
  | `smallint(${number})`
  | `mediumint(${number})`
  | 'int'
  | `int(${number})`
  | `integer(${number})`
  | 'bigint'
  | `bigint(${number})`
  | `decimal(${number},${number})`
  | `dec(${number},${number})`
  | `numeric(${number},${number})`
  | `float(${number})`
  | `float(${number},${number})`
  | 'real'
  | 'datetime'
  | `datetime(${number})`
  | 'datetime2'
  | 'smalldatetime'
  | 'date'
  | 'time'
  | `time(${number})`
  | 'datetimeoffset'
  | 'timestamp'
  | `timestamp(${number})`
  | 'year'
  | 'tinyblob'
  | `blob(${number})`
  | 'mediumtext'
  | 'mediumblob'
  | 'longtext'
  | 'longblob'
  | `enum(${string})`
  | `set(${string})`
  | `double(${number},${number})`
  | 'sql_variant'
  | 'uniqueidentifier'
  | 'xml'
  | 'cursor'
  | 'table';

/**
 * Config for authentication setup.
 */
export interface AuthenticationConfig {
  /**
   * Whether to enable authentication endpoints.
   */
  enable: boolean;

  /**
   * Table to use for users.
   */
  'user-table': string;

  /**
   * Whether to use password authentication.
   */
  'uses-password'?: boolean;

  /**
   * Whether to maintain sessions.
   */
  'maintain-sessions'?: boolean;

  /**
   * Name of a cookie to save.
   */
  'cookie-name'?: string;
}

/**
 * Functionality configs.
 */
export type FunctionalityConfig = {
  /**
   * Config for authentication.
   */
  authentication?: AuthenticationConfig;
};

/**
 * Config for database fields.
 */
export interface SchemaField {
  /**
   * Key of the column.
   */
  key: string;

  /**
   * Value type of column.
   */
  type: DatabaseColumnType;

  /**
   * Whether this field is required.
   */
  required?: boolean;

  /**
   * Whether to auto-increment values.
   */
  'auto-increment'?: boolean;

  /**
   * Whether this column is a unique identifier.
   */
  'unique-identifier'?: boolean;

  /**
   * Default value for this field.
   */
  default?: any;
}

/**
 * Functions to be implemented for tables.
 */
export interface TableFunctionsConfig {
  /**
   * Whether to create a create endpoint.
   */
  create?: boolean;

  /**
   * Whether to create an update endpoint.
   */
  update?: boolean;

  /**
   * Whether to create a delete endpoint.
   */
  delete?: boolean;

  /**
   * Whether to create a get endpoint.
   */
  get?: boolean;

  /**
   * Whether to create a get many endpoint.
   */
  'get-many'?: boolean;
}

/**
 * Optional extension to table link configs.
 */
export interface TableLinkConfigExtension {
  /**
   * Table name.
   */
  table: string;

  /**
   * Additional fields to add to link table.
   */
  'additional-fields'?: SchemaField[];
}

/**
 * Config for a database table.
 */
export interface TableConfig {
  /**
   * Name of the table.
   */
  name: string;

  /**
   * Schema of the table.
   */
  schema: SchemaField[];

  /**
   * Linking tables off this.
   */
  links?: Record<string, string | TableLinkConfigExtension>;

  /**
   * Functions to create for this table.
   */
  functions?: TableFunctionsConfig;
}

/**
 * Indentation types.
 */
export type IndentationType = 'space' | 'tab';

/**
 * Types of new lines.
 */
export type NewLineType = 'LF' | 'CRLF';

/**
 * General style preferences.
 */
export interface StyleConfig {
  /**
   * Indention type.
   */
  'indentation-type': IndentationType;

  /**
   * How many of indention type to use.
   */
  'indentation-amount': number;

  /**
   * What character to use for new lines.
   */
  'new-line': NewLineType;
}

/**
 * Template for servers.
 */
export interface ServerTemplate {
  /**
   * Name of the server.
   */
  name?: string;

  /**
   * Description of the server.
   */
  description?: string;

  /**
   * Types of server connections to provide.
   */
  types?: ServerType[];

  /**
   * Types of databases to implement.
   */
  databases?: ServerDatabase[];

  /**
   * Style preferences.
   */
  style?: StyleConfig;

  /**
   * Whether to truncate existing files.
   */
  truncate?: boolean;

  /**
   * Whether to create tests.
   */
  testing?: boolean;

  /**
   * Whether to enable linting.
   */
  linting?: boolean;

  /**
   * Additional functionalities to add.
   */
  functionalities?: FunctionalityConfig;

  /**
   * Tables to create in the database.
   */
  tables?: TableConfig[];
}
