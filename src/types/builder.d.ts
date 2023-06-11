/**
 * Class properties.
 */
export interface ClassProperty {
  /**
   * Key of property.
   */
  key: string;

  /**
   * Type of property.
   */
  type: string;

  /**
   * Default value of the property.
   */
  value: any;

  /**
   * Comments describing the property.
   */
  comment: string[] | string;

  /**
   * Whether the property is private.
   */
  private: boolean;

  /**
   * Whether the property is static.
   */
  static: boolean;
}
