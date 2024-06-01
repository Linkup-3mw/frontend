import API from '@/utils/axios';
import bcrypt from 'bcryptjs';
import { FormValues } from '@/app/(auth)/components/signup/SignupForm';

interface ICredentials {
  email: string;
  password: string;
}

export const signInWithCredentials = async (credentials: ICredentials) => {
  //(mock api)
  const { data: users } = await API.get('/users');
  const user = users.find(
    (user: ICredentials) => user.email === credentials.email,
  );

  if (!user || !user?.password) {
    throw new Error('이메일을 다시 확인해 주세요.');
  }

  const isCorrectPassword = bcrypt.compare(user.password, credentials.password);

  if (!isCorrectPassword) {
    throw new Error('비밀번호를 다시 확인해 주세요.');
  }

  const userInfo = {
    name: user.name,
    username: user.username,
    email: user.email,
    profile_image: user.profile_image,
    current_location: user.current_location,
    //token 임시 값
    accessToken: `${user.email}accessTokenqwerqwer`,
    refreshToken: `${user.email}refreshTokenTokenqwerqwer`,
  };
  return userInfo;
};

//회사 검증
export const verifyCompany = async (authCode: string) => {
  const res = await API.post('/member/verify/company', { auth_code: authCode });
  return res.data;
};

//이메일 검증
export const validateEmail = async (email: string) => {
  const res = await API.post('/member/validate/email', { email });
  return res.data;
};

//이메일 검증 번호 입력
export const verifyEmail = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}) => {
  const res = await API.post('/member/verify/email', {
    email,
    auth_code: authCode,
  });
  return res.data;
};

//닉네임 검증
export const validateNickname = async (username: string) => {
  const res = await API.post('/member/validate/username', { username });
  return res.data;
};

//회원가입
export const signUp = async (formValues: FormValues) => {
  const res = await API.post('/member/register', formValues);
  return res.data;
};
