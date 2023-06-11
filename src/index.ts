// Packages
import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';

// Local Imports 
import { CommandTool } from './command-tool';

/**
 * Instance of the tool.
 */
const tool = new CommandTool();

yargs(hideBin(process.argv))
  .command(
    'generate <template> [out]',
    'Generate backend based on a template JSON.',
    (yargs) => {
      // Help print.
      return yargs
        .positional('template', {
          describe: 'JSON template file.',
          default: './template.json',
        }).positional('out', {
          describe: 'Directory to output.',
          default: '.',
        });
    }, (argv) => {
      // Run command.
      tool.loadArgs(argv);
      tool.generate();
    })
  .option('verbose', {
    alias: 'v',
    type: 'boolean',
    description: 'Run with verbose logging',
  })
  .parse();
