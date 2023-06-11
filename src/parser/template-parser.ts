// Packages
import * as fs from 'fs';

// Types
import {
  FunctionalityConfig,
  ServerDatabase,
  ServerTemplate,
  ServerType,
  TableConfig,
} from '../types/template';

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
   * Type of indentation to use.
   */
  static indentation = '  ';

  /**
   * Type of new line to use.
   */
  static newLine = '\n';

  /**
   * Whether to truncate existing files.
   */
  static truncate = true;

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
  async _readFile(path: string): Promise<void> {
    const raw = await fs.readFileSync(path, 'utf-8');
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
    if ('style' in data) {
      if ('indentation-type' in data.style || 'indentation-amount' in data.style) {
        let indent = 'indentation-type' in data.style && data.style['indentation-type'] === 'tab' ? '\t' : ' ';
        let amount = 'indentation-amount' in data.style ? data.style['indentation-amount'] : 2;
        TemplateParser.indentation = new Array(amount)
          .fill(indent)
          .join();
      }

      if ('new-line' in data.style && data.style['new-line'] === 'CRLF') {
        TemplateParser.newLine = '\r\n';
      }
    }
    if ('truncate' in data) {
      TemplateParser.truncate = data.truncate;
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
  }
}