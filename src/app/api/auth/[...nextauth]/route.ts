import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        //const user = (await signInWithCredentials(credentials)) as any;
        //임시 로그인
        let user: any = {
          id: '1',
          name: 'J Smith',
          email: credentials?.email,
          hashedPassword: !credentials?.password,
        };

        // 임시 access token & 임시 refresh Token
        user.accessToken = 'qwer1234werhrjmhjjh';
        user.refreshToken = 'testrefreshtoken';

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.Authorization = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.Authorization = token.Authorization;
      session.RefreshToken = token.refreshToken;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
