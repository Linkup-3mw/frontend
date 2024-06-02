import { cookies } from 'next/headers';
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import API from '@/utils/axios';

// AccessToken 재발급
export const getNewAccessToken = async (accessToken: string) => {
  try {
    const { value } = cookies().get('refresh-token') as RequestCookie;

    return await API.get('/member/token', {
      headers: {
        cookie: `access-token=${accessToken}; refresh-token=${value}`,
      },
    });
  } catch (e) {
    console.error(e);
  }
};

//쿠키 삭제(server-action)
export const deleteCookie = (name: string) => {
  cookies().delete(name);
};
