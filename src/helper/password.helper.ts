import * as crypto from 'crypto';

export class PasswordHelper {
  static hashPassword(password: string): { salt: string; hash: string } {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return { salt, hash };
  }

  static validatePassword(
    password: string,
    storedHash: string,
    salt: string,
  ): boolean {
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
      .toString('hex');
    return hash === storedHash;
  }
}
