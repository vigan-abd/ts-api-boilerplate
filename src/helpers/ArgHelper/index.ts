import * as commandLineArgs from 'command-line-args';
import { OptionDefinition, ParseOptions, CommandLineOptions } from 'command-line-args'


export const parse = (usage: string, options: OptionDefinition[], argv?: string[]): CommandLineOptions => {
  const parseOpts: ParseOptions = argv ? { partial: true, argv } : { partial: true };
  options.push({ name: 'help', alias: 'h', type: Boolean });
  const args = commandLineArgs(options, parseOpts);

  if (args.help) {
    console.log("\x1b[35m%s\x1b[0m", `USAGE >>> ${usage}`);
    process.exit(0);
  }

  args.otherArgs = args._unknown;
  return args;
}