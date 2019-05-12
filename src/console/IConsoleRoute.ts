import IConsoleCommand from "@console/IConsoleCommand";

export default interface IConsoleRoute {
  [key: string]: IConsoleCommand
}