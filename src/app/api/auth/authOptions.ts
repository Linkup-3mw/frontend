import { signInWithCredentials } from '@/app/service/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { IUser } from '@/types/user';
import { JWT } from 'next-auth/jwt';
import { getNewAccessToken, setNewCookie } from '@/app/serverAction/auth';

//토큰 만료 시간
const EXPIRES_AT = 60 * 60;

//세션 만료 시간
const SESSION_EXPIRES_AT = {
  normal: 60 * 60 * 24,
  remeber: 60 * 60 * 24 * 15,
};

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

        cookies().set({
          name: 'remember-me',
          value: credentials.remember_me,
          path: '/',
        });

        try {
          const res = await signInWithCredentials(params);
          const apiCookies = res.headers['set-cookie'];
          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              setNewCookie(cookie);
            });
          }

          const user: IUser = res.data.data;

          return user;
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
    maxAge: 60 * 60 * 24 * 15, // 세션 만료 시간(sec)
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ user, token }: any) {
      if (user) {
        // initial login
        const remember_me = cookies().get('remember_me')?.value;
        const accessToken = cookies().get('access-token');

        token.accessToken = accessToken?.value;
        token.expiresAt = Math.floor(Date.now() + EXPIRES_AT * 1000) as number;
        token.user = user as IUser;
        token.sessionExpiresAt =
          remember_me == 'true'
            ? (Math.floor(
                Date.now() + SESSION_EXPIRES_AT.remeber * 1000,
              ) as number)
            : (Math.floor(
                Date.now() + SESSION_EXPIRES_AT.normal * 1000,
              ) as number);

        return token;
      }
      if (Date.now() < Number(token.expiresAt)) {
        //토큰 유효
        return token;
      } else {
        //토큰 만료
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error as string;
      session.user = token.user as IUser;
      session.sessionExpiresAt = token.sessionExpiresAt as number;

      return session;
    },
  },
};

async function refreshAccessToken(token: JWT) {
  try {
    const res = await getNewAccessToken(token.accessToken as string);

    token.expiresAt = (Date.now() + EXPIRES_AT * 1000) as number;
    token.accessToken = res?.data.data;

    return token;
  } catch (e: any) {
    console.error('Error refreshing access Token : ', e.message);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}
