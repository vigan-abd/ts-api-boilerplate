import container from '@containers/cli';
import * as arg from '@helpers/ArgHelper';
import * as print from '@helpers/PrintHelper';
import _routes from '@routes/console';

export default () => {
  // CONFIG
  const routes = _routes(container);
  const usage = `./cli -c <command>`
  const options = [
    { name: 'command', alias: 'c', type: String }
  ];

  const args = arg.parse(usage, options);

  if (!args.command) {
    print.error(`Usage: ${usage}`);
    process.exit(1);
  }

  const { command, otherArgs } = args;

  if (!Object.keys(routes).includes(command)) {
    print.error(`Command ${command} is not supported!`);
    process.exit(1);
  }

  print.debug(`Running command: ${command}`);

  routes[command].run(otherArgs);
  container.dispose();
}
