// Local Imports
import { TemplateParser } from '../../parser';

// Types
import { Method } from '../../types/builder';

/**
 * Generates database based on environmental variables.
 */
export const INITIALIZE_DATABASE_METHOD: Method = {
  name: 'initializeDatabase',
  comment: 'Generates database based on environmental variables.',
  parameters: [],
  return: {
    comment: 'Promise of the action.',
    type: 'Promise<void>',
  },
  async: true,
  arrow: true,
  private: false,
  method: [
    'if (!DatabaseInstace) {',
    (databases: string[]): string | string[] => {
      let lines = [];
      for (let i = 0; i < databases.length; i += 1) {
        let operation = 'if';
        let conditional = `(Environment.getDatabaseType() === DATABASE_TYPES.${databases[i].toUpperCase()}) {`;
        
        if (i !== 0 && i !== databases.length - 1) {
          operation = '} else if';
        } else if (i === databases.length - 1) {
          operation = '}';
          conditional = '';
        }

        lines.push(`${operation} ${conditional}`);
        lines.push(`DatabaseInstance = new ${databases[i].charAt(0).toUpperCase()}${databases[i].substring(1)}Database();`);
      }

      return lines;
    },
    '}',
  ],
};
