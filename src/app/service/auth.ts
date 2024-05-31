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
  // const res = await API.post('/test', {
  //   body: JSON.stringify({ auth_code: authCode }),
  // });
  // return JSON.parse(res);
  //임시
  return {
    status_code: 200,
    message: '요청이 성공적으로 처리되었습니다.',
    status: 'OK',
    data: 'OK',
    company_id: 1,
    success: true,
  };
};

//이메일 검증
export const validateEmail = async (email: string) => {
  return {
    status_code: 200,
    message: '요청이 성공적으로 처리되었습니다.',
    status: 'OK',
    data: 'OK',
    success: true,
  };
};

//이메일 검증 번호 입력
export const verifyEmail = async ({
  email,
  authCode,
}: {
  email: string;
  authCode: string;
}) => {
  return {
    status_code: 200,
    message: '요청이 성공적으로 처리되었습니다.',
    status: 'OK',
    data: 'OK',
    success: true,
  };
};

//닉네임 검증
export const validateNickname = async (username: string) => {
  return {
    status_code: 200,
    message: '요청이 성공적으로 처리되었습니다.',
    status: 'OK',
    data: 'OK',
    success: true,
  };
};

//회원가입
export const signUp = async (formValues: FormValues) => {
  //json-server
  const res = await API.post('/users', formValues);
  // const res = await API.post('/users', {
  //   body: JSON.stringify(formValues),
  // });
  return res;
};
