import { AuthUser } from './user';

declare module 'next-auth' {
  interface User extends AuthUser {}
  interface Session {
    Authorization: any;
    RefreshToken: any;
  }
}

export declare module '@auth/core/jwt' {
  interface JWT {
    accessToken: string;
    refreshToken: string;
  }
}
