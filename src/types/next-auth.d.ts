import { DefaultSession } from 'next-auth';
import { IUser } from './user';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { DefaultJWT } from 'next-auth/jwt';

export declare module 'next-auth' {
  interface User extends IUser {}
  interface Session extends DefaultSession {
    accessToken: string | unknown;
    expiresAt: number;
    error: string;
    user: IUser;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: number;
    user: IUser;
  }
}
