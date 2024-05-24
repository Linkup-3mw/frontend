import API from '@/utils/axios';
import { FormValues } from '../(auth)/components/signup/SignupForm';

export const getUser = async () => {
  const { data: users } = await API.get('/users');
  return users;
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

//회원가입
export const signUp = async (formValues: FormValues) => {
  //json-server
  const res = await API.post('/users', formValues);
  // const res = await API.post('/users', {
  //   body: JSON.stringify(formValues),
  // });
  return res;
};
