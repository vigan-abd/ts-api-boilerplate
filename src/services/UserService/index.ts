import IUserRepository from '@repositories/Interfaces/IUserRepository';
import UserDefinedException from '@models/Business/Exeption/UserDefinedException';
import IAuthenticatedRequest from '@models/Business/Interface/IAuthenticatedRequest';
import User from '@models/Domain/User';
import SecurityHelper from '@helpers/SecurityHelper';
import config from '@config';
import { Request } from 'express';


class UserService {
  public iuserRepository: IUserRepository;

  constructor(iuserRepository: IUserRepository) {
    this.iuserRepository = iuserRepository;
  }

  authResponse(user: User) {
    const token = SecurityHelper.encryptJwtToken(user.id as string, user.tokenHash as string);

    return {
      token,
      userId: user.id as string,
      expires: config.JWT_EXPIRE_TIME
    };
  }

  async verifyAuthToken(token: string) {
    const decryptedToken = SecurityHelper.decryptJwtToken(token);
    if (!decryptedToken) throw new UserDefinedException("Authorization missing.", 401);
    if (!decryptedToken.sub) throw new UserDefinedException("Authorization missing.", 401);
    if (new Date().getTime() - decryptedToken.iat > (config.JWT_EXPIRE_TIME * 1000))
      throw new UserDefinedException("Your session has expired! Please sign-in again.", 401);

    const user = await this.iuserRepository.findById(decryptedToken.sub);
    if (!user)
      throw new UserDefinedException("Your user does not exist .", 401);

    if (user.tokenHash != decryptedToken.hash)
      throw new UserDefinedException("Your session has expired! Please sign-in again.", 401);
    return user;
  }

  async signup(req: Request) {
    const email = req.body.email ? req.body.email.toLowerCase() : null;
    const username = req.body.username ? req.body.username.toLowerCase() : null;
    const password = req.body.password || null;

    const passwordError = SecurityHelper.checkPasswordPolicy(password);
    if (passwordError)
      throw new UserDefinedException(passwordError, 422);

    const count = await this.iuserRepository.count({ $or: [{ email }, { username }] });
    if (count > 0)
      throw new UserDefinedException("Email or username is in use.", 409);

    const pass = await SecurityHelper.hashPassword(password);
    const model = new User({
      username: username,
      email: email,
      password: pass.password,
      tokenHash: pass.tokenHash,
    });

    const { error } = model.validate();
    if (error)
      throw new UserDefinedException(error.message, 422);

    const user = await this.iuserRepository.create(
      new User({
        username: username,
        email: email,
        password: pass.password,
        tokenHash: pass.tokenHash,
      }));
    return this.authResponse(user);
  }

  async signin(req: Request) {
    const username = req.body.username || null;
    const password = req.body.password || null;

    if (!username || !password)
      throw new UserDefinedException("Email and password are required!", 404);

    let user;

    const users = await this.iuserRepository.findWhere({ $or: [{ username }, { email: username }] });
    if (users.length != 1)
      throw new UserDefinedException("Incorrect email or password.", 401);
    user = users[0];

    const isMatch = await SecurityHelper.comparePassword(password, user.password as string);
    if (!isMatch)
      throw new UserDefinedException("Incorrect email or password", 401);

    return this.authResponse(user);
  }

  async updatePassword(req: IAuthenticatedRequest) {
    const password = req.body.password || null; // CURRENT PASSWORD
    const newPassword = req.body.newPassword || null;
    const confirmPassword = req.body.confirmPassword || null;

    if (!newPassword || !confirmPassword || !password)
      throw new UserDefinedException("Fields password, newPassword, and confirmPassword are required!", 422);

    if (newPassword !== confirmPassword)
      throw new UserDefinedException("New password and confirmed new password mismatch", 422);

    const user = req.currentUser as User;

    const isMatch = await SecurityHelper.comparePassword(password, user.password as string);
    if (!isMatch)
      throw new UserDefinedException("Password mismatch!", 401);

    const passwordError = SecurityHelper.checkPasswordPolicy(newPassword);
    if (passwordError)
      throw new UserDefinedException(passwordError, 422);

    const pass = await SecurityHelper.hashPassword(newPassword);
    const res = await this.iuserRepository.update(user.id as string, pass);
    return this.authResponse(res);
  }

  getUser(userId: string) {
    return this.iuserRepository.findById(userId);
  }

  deleteUsers(conditions: any) {
    return this.iuserRepository.remove(conditions);
  }

  updateStamps(id: string, fields: { updated?: Date, lastLogin?: Date }) {
    const stamps: any = {};
    if (fields.updated) stamps['updated'] = fields.updated;
    if (fields.lastLogin) stamps['lastLogin'] = fields.lastLogin;
    return this.iuserRepository.update(id, stamps);
  }
}

export default UserService;