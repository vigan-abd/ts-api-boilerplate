import { AwilixContainer } from "awilix";
import PrintArgs from '@console/commands/PrintArgs';
import IConsoleRoute from "@console/IConsoleRoute";

const register = (container: AwilixContainer): IConsoleRoute => {
  const printArgs: PrintArgs = container.resolve('printArgs');

  return {
    'console:print-args': printArgs
  };
}

export default register;