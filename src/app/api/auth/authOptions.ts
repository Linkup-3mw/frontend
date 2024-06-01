import { getNewAccessToken, signInWithCredentials } from '@/app/service/auth';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { IToken } from '@/types/next-auth';

//토큰 만료 시간
const EXPIRES_AT = 60 * 60;

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

        // cookies().set({
        //   name: 'remember-me',
        //   value: credentials.remember_me,
        //   path: '/',
        // });

        try {
          const res = await signInWithCredentials(params);
          const apiCookies = res.headers['set-cookie'];
          if (apiCookies && apiCookies.length > 0) {
            apiCookies.forEach((cookie) => {
              setNewCookie(cookie);
            });
          }

          return {
            ...res.data.data,
          };
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
    async jwt({ user, token }) {
      if (user) {
        // initial login
        const accessToken = cookies().get('access-token') as IToken;

        token.accessToken = accessToken.value;
        token.expiresAt = Math.floor(Date.now() + EXPIRES_AT * 1000) as number;

        return { ...user, ...token };
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
      return session;
    },
  },
};

const setNewCookie = (cookie: string) => {
  const parsedCookie = parse(cookie);
  const [cookieName, cookieValue] = Object.entries(parsedCookie)[0];
  const httpOnly = cookie.includes('httponly');

  cookies().set({
    name: cookieName,
    value: cookieValue,
    httpOnly: cookieName === 'refresh-token' ? true : false,
    maxAge: parseInt(parsedCookie['Max-Age']),
    path: parsedCookie.path,
    // sameSite: parsedCookie.samesite,
    expires: new Date(parsedCookie.expires),
    // secure: true,
  });
};

async function refreshAccessToken(token: any) {
  try {
    const res = await getNewAccessToken(token.accessToken);

    const apiCookies = res!.headers['set-cookie'];
    if (apiCookies && apiCookies.length > 0) {
      apiCookies.forEach((cookie) => {
        setNewCookie(cookie);
      });
    }
    const accessToken = cookies().get('access-token') as IToken;
    token.expiresAt = (Date.now() + EXPIRES_AT * 1000) as number;

    token.accessToken = accessToken.value;

    return token;
  } catch (e: any) {
    console.error('Error refreshing access Token', e.message);
    return { ...token, error: 'RefreshAccessTokenError' };
  }
}
