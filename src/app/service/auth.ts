import API from '@/utils/axios';
import bcrypt from 'bcryptjs';

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
