export default class HttpNotAcceptableException extends Error {
  public readonly code: number;

  constructor(acceptType: string) {
    super(`${acceptType} is/are not supported by http endpoint`);
    this.code = 406;
  }
}