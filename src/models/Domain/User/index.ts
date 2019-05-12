import * as Joi from 'joi';

import ModelBase from '@models/Domain/ModelBase';
import DbQuery from './schema';

class User extends ModelBase {
  public id: string | null;
  public username: string | null;
  public email: string | null;
  public password: string | null;
  public tokenHash: string | null;
  public passwordResetToken: string | null;
  public passwordResetSentAt: Date | null;
  public created: Date | null;
  public updated: Date | null;
  public lastLogin: Date | null;

  constructor(params: {
    id: string | null
    username: string | null
    email: string | null
    password: string | null
    tokenHash: string | null
    passwordResetToken: string | null
    passwordResetSentAt: Date | null
    created: Date | null
    updated: Date | null
    lastLogin: Date | null
  } | any) {
    super();
    this.id = params.id;
    this.username = params.username;
    this.email = params.email;
    this.password = params.password;
    this.tokenHash = params.tokenHash;
    this.passwordResetToken = params.passwordResetToken;
    this.passwordResetSentAt = params.passwordResetSentAt;
    this.created = params.created;
    this.updated = params.updated;
    this.lastLogin = params.lastLogin;

    this.rules = Joi.object().keys({
      id: Joi.optional().allow(null),
      username: Joi.string().required().min(3),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      tokenHash: Joi.string().required(),
      passwordResetToken: Joi.string().optional().allow(null),
      passwordResetSentAt: Joi.date().optional().allow(null),
      created: Joi.date().optional().allow(null),
      updated: Joi.date().optional().allow(null),
      lastLogin: Joi.date().optional().allow(null),
    });
  }

  asDTO() {
    const user = this.toJSON();
    user.password = null;
    user.tokenHash = null;
    user.passwordResetToken = null;
    user.passwordResetSentAt = null;
    return user;
  }

  static get DbQuery() {
    return DbQuery;
  }

}

export default User;