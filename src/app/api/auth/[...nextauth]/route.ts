import NextAuth, { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { signInWithCredentials } from '@/app/service/auth';

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email' },
        password: { label: 'Password', type: 'password' },
        remember_me: { label: 'remember_me', type: 'checkbox' },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const params = {
          email: credentials.email,
          password: credentials.password,
          remember_me: credentials.remember_me === 'true' ? true : false,
        };

        try {
          const res = await signInWithCredentials(params);
          return res.data.data;
        } catch (e: any) {
          throw new Error(e.response.data.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        token.Authorization = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      return token;
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
