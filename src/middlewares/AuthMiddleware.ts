import UserService from '@services/UserService';
import IAuthenticatedRequest from '@models/Business/Interface/IAuthenticatedRequest';
import { Response, NextFunction } from 'express';

class AuthMiddleware {
  protected readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.authHandler = this.authHandler.bind(this);
    this.optionalAuthHandler = this.optionalAuthHandler.bind(this);
  }

  async authHandler(req: IAuthenticatedRequest, res: Response, next: NextFunction) {
    const token = req.get('authorization');

    try {
      const user = await this.userService.verifyAuthToken(token || '');
      req.currentUser = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }

  async optionalAuthHandler(req: IAuthenticatedRequest, res: Request, next: NextFunction) {
    const token = req.get('authorization');
    if (!token) return next();

    try {
      const user = await this.userService.verifyAuthToken(token);
      req.currentUser = user;
      return next();
    } catch (err) {
      return next(err);
    }
  }
}

export default AuthMiddleware;