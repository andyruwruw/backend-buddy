// Packages
import * as fs from 'fs';

// Types
import {
  FunctionalityConfig,
  ServerDatabase,
  ServerTemplate,
  ServerType,
  TableConfig,
} from '../types';

/**
 * Reads the template JSON.
 */
export class TemplateParser {
  /**
   * Name of the server.
   */
  static serverName = 'server';

  /**
   * Description of the server.
   */
  static description = '';

  /**
   * Types of server.
   */
  static types: ServerType[] = [];

  /**
   * Database types to be supported.
   */
  static databases: ServerDatabase[] = [];

  /**
   * Whether to instantiate testing.
   */
  static testing = true;

  /**
   * Whether to instantiate linting.
   */
  static linting = true;

  /**
   * Additional functionality config.
   */
  static functionalities: FunctionalityConfig = {};

  /**
   * Tables to create in database.
   */
  static tables: TableConfig[] = [];

  /**
   * Instantiates a template parser.
   *
   * @param {string} path Path to template JSON.
   */
  constructor(path: string) {
    this._readFile(path);
  }

  /**
   * Reads the contents of template JSON.
   *
   * @param {string} path Path to template JSON.
   */
  async _readFile(path: string) {
    const raw = fs.readFileSync(path, 'utf-8');
    const data = JSON.parse(raw) as ServerTemplate;

    if ('name' in data) {
      TemplateParser.serverName = data.name;
    }
    if ('description' in data) {
      TemplateParser.description = data.description;
    }
    if ('types' in data) {
      TemplateParser.types = data.types;
    }
    if ('databases' in data) {
      TemplateParser.databases = data.databases;
    }
    if ('testing' in data) {
      TemplateParser.testing = data.testing;
    }
    if ('linting' in data) {
      TemplateParser.linting = data.linting;
    }
    if ('functionalities' in data) {
      TemplateParser.functionalities = data.functionalities;
    }
    if ('tables' in data) {
      TemplateParser.tables = data.tables;
    }

    console.log(TemplateParser);
  }
}