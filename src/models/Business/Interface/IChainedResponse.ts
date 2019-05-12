import { Response } from "express";

export default interface IChainedResponse extends Response {
  body: any
}