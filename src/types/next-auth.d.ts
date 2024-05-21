declare module 'next-auth' {
  interface User {
    accessToken: string;
    refreshToken: string;
  }
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

// id: string;
// email: string;
// emailVerified: Date | null;
