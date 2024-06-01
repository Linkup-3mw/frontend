import { DefaultSession } from 'next-auth';
import { AuthUser } from './user';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';

interface IToken extends RequestCookie {
  name: string;
  vlue: string;
  expires: string;
  httpOnly: boolean;
  path: string;
}

declare module 'next-auth' {
  interface User extends AuthUser {}
  interface Session extends DefaultSession {
    accessToken: any;
    expiresAt: number;
    error: string;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    expiresAt: number;
  }
}

export declare module 'next-';
