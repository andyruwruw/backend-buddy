// Packages
import * as fs from 'fs';

// Local Imports
import { TemplateParser } from '../parser';

/**
 * Abstract class for building sub-layers within the backend.
 */
export class Builder {
  /**
   * Cursor to current directory.
   */
  _currentDir = '.';

  /**
   * Contents of the current directory.
   */
  _dirContents = [] as string[];

  /**
   * Open file.
   */
  _file: number | null = null;

  /**
   * Buffer to be written to file.
   */
  _buffer = '';

  /**
   * Current indentation level.
   */
  _indentationLevel = 0;

  /**
   * Instantiates a new builder.
   *
   * @param {string} currentDir Cursor to current directory.
   */
  constructor(currentDir: string) {
    this._currentDir = currentDir;
    this._readDir();
  }

  /**
   * On destruction of instance.
   */
  destructor() {
    if (this._file !== null) {
      fs.closeSync(this._file);
    }
  }

  /**
   * Runs the builder.
   */
  build(): string {
    return this._buffer;
  }

  /**
   * Creates and moves into a directory.
   *
   * @param {string} name Name of directory.
   */
  async _moveInto(name: string): Promise<void> {
    if (!(name in this._dirContents)) {
      await this._createDir(name);
    }

    this._currentDir = `${this._currentDir}/${name}`;
    await this._readDir();
  }

  /**
   * Creates a new directory.
   *
   * @param {string} name Name of directory.
   */
  async _createDir(name: string): Promise<void> {
    if (name in this._dirContents) {
      return;
    }

    await fs.mkdirSync(`${this._currentDir}/${name}`);
  }

  /**
   * Reads the contents of the current directory.
   */
  async _readDir(): Promise<void> {
    this._dirContents = await fs.readdirSync(this._currentDir);
  }

  /**
   * Creates a new file.
   *
   * @param name Name of the file.
   */
  async _createFile(name: string): Promise<void> {
    if (!TemplateParser.truncate && this._dirContents.includes(name)) {
      return;
    }

    this._file = await fs.openSync(`${this._currentDir}/${name}`, 'w');
  }

  /**
   * Writes buffer to file and closes it.
   */
  async _writeToFile(): Promise<void> {
    await fs.writeSync(this._file, this._buffer);

    await this._closeFile();
  }

  /**
   * Closes current file.
   */
  async _closeFile(): Promise<void> {
    await fs.closeSync(this._file);

    this._file = null;
  }

  /**
   * Returns amount of indentation required.
   *
   * @returns {string} Indentation as string.
   */
  _indentation(): string {
    return new Array(this._indentationLevel)
      .fill(TemplateParser.indentation)
      .join();
  }

  /**
   * Append text to the buffer.
   *
   * @param {string} text Text to append. 
   */
  _append(text: string): void {
    this._buffer = this._buffer.concat(`${this._indentation}${text}${TemplateParser.newLine}`);
  }

  /**
   * Adds an empty line.
   */
  _gap(): void {
    this._buffer = this._buffer.concat(TemplateParser.newLine);
  }

  /**
   * Appends a single line comment.
   *
   * @param {string} text Comment text. 
   */
  _simpleComment(text: string): void {
    this._append(`// ${text}`);
  }

   /**
   * Appends a multi-line comment.
   *
   * @param {string[] | string} text Comment text. 
   */
  _comment(text: string[] | string): void {
    this._append('/**');

    if (typeof(text) === 'string') {
      this._append(` * ${text}`);
    } else if (text instanceof Array) {
      for (let i = 0; i < text.length; i += 1) {
        this._append(` * ${text[i]}`);
      }
    }
    
    this._append(' */');
  }
}
