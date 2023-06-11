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
  build(): string {
    this._buildHeader();

    this._buildProperties();
    this._buildMethods();

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
  }

  /**
   * Builds the classes methods.
   */
  _buildMethods(): void {
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
