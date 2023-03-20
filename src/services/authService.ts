import { sign, verify } from 'jsonwebtoken';

export class AuthService {
  private static readonly secret = 'my-secret';

  static generateToken(payload: any): string {
    const token = sign(payload, this.secret);
    return token;
  }

  static verifyToken(token: string): any {
    try {
      const decoded = verify(token, this.secret);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
