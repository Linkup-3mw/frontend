'use client';
import Link from 'next/link';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import { signIn } from 'next-auth/react';
import InputBox from '../../../common/components/form/InputBox';
import TogglePassword from '../common/TogglePassword';
import Input from '../../../common/components/form/Input';
import LoginCheckbox from './LoginCheckbox';
import { EMAIL_VALIDATION } from '../../constants/validation';
import BlueSquareBtn from '@/app/common/components/form/BlueSquareBtn';

//임시 데이터
const LOGIN_ERROR_MSG = {
  email: '이메일을 다시 확인해 주세요.',
  password: '비밀번호를 다시 확인해 주세요.',
};

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    try {
      const data = await signIn('credentials', {
        ...body,
        callbackUrl,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="mb-[2.5rem] text-center text-[1.75rem] font-bold leading-[2.375rem]">
        로그인
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputBox text="이메일" errorMsg={errors.email?.message}>
            <Input
              placeholder="이메일을 입력해 주세요."
              register={register}
              name="email"
              isError={errors.email !== undefined}
              validation={EMAIL_VALIDATION}
            />
          </InputBox>

          <InputBox text="비밀번호" errorMsg={errors.password?.message}>
            <TogglePassword
              placeholder="비밀번호를 입력해 주세요."
              register={register}
              name="password"
              isError={errors.password !== undefined}
              validation={{ required: '비밀번호를 입력해 주세요.' }}
            />
          </InputBox>
          <div>
            <Link
              href="/"
              className="inline-block -mt-[1.25rem] mb-[3.75rem] underline text-[0.875rem] font-bold leading-none text-[#8d8d9b]"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <LoginCheckbox>로그인 상태 유지</LoginCheckbox>
        </div>
        <div className="mt-[1.5rem]">
          <BlueSquareBtn
            name="로그인"
            type="submit"
            disabled={!isDirty || !isValid}
          />
        </div>
      </form>
    </div>
  );
}
