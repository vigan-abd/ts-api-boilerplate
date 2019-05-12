export default interface IConsoleCommand {
  run: (argv: string[] | any) => void
};