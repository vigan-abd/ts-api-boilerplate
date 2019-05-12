import * as print from '@helpers/PrintHelper';
import * as arg from '@helpers/ArgHelper';
import IConsoleCommand from '@console/IConsoleCommand';

export default class PrintArgs implements IConsoleCommand {
  run(argv: string[] | any) {
    const usage = `./cli -c <command>`
    const options = [
      { name: 'test-arg', alias: 't', type: String }
    ];
    const args = arg.parse(usage, options, argv);
    print.success(args);
  }
}