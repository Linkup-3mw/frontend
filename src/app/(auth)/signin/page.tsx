'use client';
import Link from 'next/link';

import { useForm } from 'react-hook-form';

import Container from '../components/Container';
import RoundedFrame from '../components/RoundedFrame';
import LoginInput from '../components/LoginInput';
import LoginBtn from '../components/LoginBtn';

export default function SignInPage() {
  const { register, handleSubmit, control } = useForm();

  return (
    <Container>
      <RoundedFrame>
        <h2 className="mb-[2rem] text-center text-[2rem] font-bold leading-[2.625rem]">
          로그인
        </h2>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <div className="px-[1rem] min-w-[35rem] box-border">
            <LoginInput
              text="이메일"
              placeholder="이메일을 입력해 주세요."
              register={register}
              name="email"
            />
            <LoginInput
              text="비밀번호"
              type="password"
              placeholder="비밀번호를 입력해 주세요."
              register={register}
              name="password"
            />

            <Link
              href="/"
              className="block -mt-[1.06rem] text-main-blue text-[0.875rem] font-bold leading-none"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-[4.06rem]">
            <LoginBtn control={control} />
            <Link className="blue_border_square_btn" href={'/signup'}>
              회원가입
            </Link>
          </div>
        </form>
      </RoundedFrame>
    </Container>
  );
}
