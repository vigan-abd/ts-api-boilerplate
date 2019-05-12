import { Request } from "express";
import User from "@models/Domain/User";

export default interface IAuthenticatedRequest extends Request {
  currentUser?: User
}