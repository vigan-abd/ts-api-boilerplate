interface ILogger {
  debug(message?: any, ...optionalParams: any[]): void;
  error(message?: any, ...optionalParams: any[]): void;
  info(message?: any, ...optionalParams: any[]): void;
  log(message?: any, ...optionalParams: any[]): void;
  warn(message?: any, ...optionalParams: any[]): void;
}

interface INodeEnvOptions {
  verbose: Boolean,
  overwrite: Boolean,
  raise: Boolean,
  logger: ILogger
}

interface INodeEnvData {
  [key: string]: string
}

declare function envFile(env_file: string, options?: INodeEnvOptions): INodeEnvData


export = envFile;