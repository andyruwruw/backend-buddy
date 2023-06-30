// Local Imports
import { Builder } from '../builder';
import { MethodBuilder } from './method-segment';

// Types
import {
  ClassProperty,
  ExportLink,
} from '../../types/builder';

/**
 * Builds classes.
 */
export class ClassBuilder extends Builder {
  /**
   * Description of the class.
   */
  _description: string;

  /**
   * Name of the class.
   */
  _name: string;

  /**
   * Classes this extends off of.
   */
  _extensions: ExportLink[] = [];

  /**
   * Properties of a class.
   */
  _properties: ClassProperty[] = [];

  /**
   * Member methods within the class.
   */
  _methods: MethodBuilder[] = [];

  /**
   * Runs the builder.
   */
  async build(): Promise<string> {
    this._comment(this._description);
    this._buildHeader();

    this._buildProperties();
    await this._buildMethods();

    this._append('}');
    return this._buffer;
  }

  /**
   * Builds the class header.
   */
  _buildHeader(): void {
    this._append(`export class ${this._name}${this._generateExtensions} {`);
    this._indentationLevel += 1;
  }

  /**
   * Builds the classes properties.
   */
  _buildProperties(): void {
    this._properties.sort((
      a: ClassProperty,
      b: ClassProperty,
    ): number => {
      return a.key.localeCompare(b.key);
    });

    for (let i = 0; i < this._properties.length; i += 1) {
      this._comment(this._properties[i].comment);

      let line = '';

      if (this._properties[i].static) {
        line = line.concat('static ');
      }
      if (this._properties[i].private) {
        // Pseudo private
        line = line.concat('_');
      }

      line = line.concat(`${this._properties[i].key}: ${this._properties[i].type}`);

      if (this._properties[i].value !== null) {
        const value = JSON.stringify(
          this._properties[i].value,
          null,
          2,
        ).replace(
          '"',
          '\'',
        );

        line = line.concat(` = ${value}`);
      }

      line = line.concat(';');

      this._append(line);
      this._gap();
    }
  }

  /**
   * Builds the classes methods.
   */
  async _buildMethods(): Promise<void> {
    for (let i = 0; i < this._methods.length; i += 1) {
      this._append(await this._methods[i].build());
      
      if (i < this._methods.length - 1) {
        this._gap();
      }
    }
  }

  /**
   * Stringifies extensions.
   *
   * @returns {string} Extensions.
   */
  _generateExtensions(): string {
    if (this._extensions.length) {
      return ` extends ${this._extensions.map(link => link.name).join(', ')} `;
    }
    return '';
  }
}
