import * as bcrypt from 'bcrypt-nodejs';
import * as jwt from 'jwt-simple';
import * as uuid from 'uuid';
import config from '@config';

interface IJwtDecodedResult {
  sub: string,
  iat: number,
  hash: string
}

interface IPasswordHashResult {
  password: string,
  tokenHash: string
}

export default class SecurityHelper {
  static encryptJwtToken(id: string, hash: string) {
    const jwtKey = config.JWT_SECRET;
    const timestamp = new Date().getTime();

    return jwt.encode({
      sub: id,
      iat: timestamp,
      hash: hash
    }, jwtKey);
  }

  static decryptJwtToken(token: string): IJwtDecodedResult | null {
    const jwtKey = config.JWT_SECRET;
    try {
      return jwt.decode(token, jwtKey);
    } catch (err) {
      return null;
    }
  }

  static comparePassword(password: string, hash: string) {
    return new Promise<Boolean>((resolve, reject) => {
      bcrypt.compare(password, hash, (err, res) => {
        if (err) reject(err);
        else resolve(res);
      })
    });
  }

  static hashPassword(password: string) {
    const saltRounds = 10;

    return new Promise<IPasswordHashResult>((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(password, salt, () => { }, (_err, passwordHash) => {
          if (_err) {
            reject(_err);
          } else {
            const tokenHash = uuid.v4();
            resolve({
              password: passwordHash,
              tokenHash: tokenHash
            });
          }
        })
      })
    })
  }

  static generateCSRFToken() {
    return uuid.v4();
  }

  static checkPasswordPolicy(password: string): string | undefined {
    let error;
    if (!(/\d/).test(password))
      error = 'Password must contain a number.';

    if (!(/\w/).test(password))
      error = 'Password must contain a letter.';

    if ((/[^a-zA-Z0-9\_\#\!]/ig).test(password))
      error = 'Password must contain only numbers, letters and the followin chars: _#!';

    if (!password || password.length < 8)
      error = 'Password must be 8 characters.';

    return error;
  }
}