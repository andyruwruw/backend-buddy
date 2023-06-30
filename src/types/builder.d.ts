export interface Property {
  /**
   * Key of property.
   */
  key?: string;

  /**
   * Type of property.
   */
  type: string;

  /**
   * Default value of the property.
   */
  value?: any;

  /**
   * Comments describing the property.
   */
  comment?: string[] | string;
}

/**
 * Class properties.
 */
export interface ClassProperty extends Property {
  /**
   * Whether the property is private.
   */
  private: boolean;

  /**
   * Whether the property is static.
   */
  static: boolean;
}

/**
 * Link to imports.
 */
export interface ExportLink {
  /**
   * Name of the item.
   */
  name: string;

  /**
   * Path to item from root.
   */
  path: string;

  /**
   * Whether the value needs to be deconstructed.
   */
  deconstruct: boolean;

  /**
   * Whether to export these values.
   */
  export: boolean;
}

export interface Method {
  /**
   * Name of the function.
   */
  name: string;

  /**
   * Description of function.
   */
  comment: string | string[];

  /**
   * Parameters to the function.
   */
  parameters: Property[];

  /**
   * What the method returns.
   */
  return: Property;

  /**
   * Whether the method is asynchronous.
   */
  async: boolean;

  /**
   * Whether to create an arrow function.
   */
  arrow: boolean;

  /**
   * Whether the method is private.
   */
  private: boolean;

  /**
   * lines of the method.
   */
  method: (string | MethodLineResolver)[];
}

/**
 * Resolves to code lines.
 */
type MethodLineResolver = (...parameter: any) => string | string[];
