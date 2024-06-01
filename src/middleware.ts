import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_URL = '';

export default async function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const isWithAuth = withAuthList.includes(pathname);
  const isWithOutAuth = withOutAuthList.includes(pathname);
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  //로그인된 유저만 접근 가능
  if (isWithAuth) {
    const url = req.nextUrl.clone();
    const { pathname } = req.nextUrl;
    if (!token) {
      url.pathname = '/signin';
      url.search = `callbackUrl=${pathname}`;
      return NextResponse.redirect(new URL(url, req.url));
    }
  }

  //로그인된 유저는 접근 불가
  if (isWithOutAuth) {
    const url = req.nextUrl.clone();
    const callbackURL = searchParams.get('callbackUrl');
    if (token) {
      if (callbackURL) {
        url.href = callbackURL;
      } else {
        url.pathname = FALLBACK_URL;
      }
      url.search = '';
      return NextResponse.redirect(new URL(url, req.url));
    }
  }
  return NextResponse.next();
}

//로그인된 유저만 접근 가능
const withAuthList = ['/mypage'];

//로그인된 유저는 접근 불가
const withOutAuthList = ['/signin', '/signup', '/terms'];

export const config = {
  // mathcher: [...withAuthList, ...withOutAuthList], // 전개연산자(Spread Operator)는 작동하지않음
  mathcher: ['/signin', '/signup', '/terms'],
};
