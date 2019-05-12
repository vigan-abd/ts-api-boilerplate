export default class UserDefinedException extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.name = 'UserDefined';
  }
}