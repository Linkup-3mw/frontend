import API from '@/utils/axios';
import { FormValues } from '../(auth)/components/signup/SignupForm';

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
