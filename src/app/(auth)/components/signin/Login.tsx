'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import bcrypt from 'bcryptjs';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import InputBox from '@common/components/form/InputBox';
import Input from '@common/components/form/Input';
import BlueSquareBtn from '@common/components/form/BlueSquareBtn';
import TogglePassword from '@/app/(auth)/components/common/TogglePassword';
import { EMAIL_VALIDATION } from '@/app/(auth)/constants/validation';
import LoginCheckbox from './LoginCheckbox';

export default function Login({ callbackUrl }: { callbackUrl: string }) {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm();

  useEffect(() => {
    register('email', {
      onBlur: () => trigger('email'),
    });
  }, []);
  const [errMsg, setErrMsg] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<FieldValues> = async (body) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      body = {
        ...body,
        password: await bcrypt.hash(body.password, 12),
      };
      const res = await signIn('credentials', {
        ...body,
        callbackUrl,
        redirect: false,
      });

      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        //추후 수정 필요
        if (res!.error.includes('비밀번호')) {
          setErrMsg((prev: any) => {
            return { ...prev, password: res?.error, email: '' };
          });
        } else {
          setErrMsg((prev: any) => {
            return { ...prev, password: '', email: res?.error };
          });
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="mb-[2.5rem] text-center text-[1.75rem] font-bold leading-[2.375rem]">
        로그인
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputBox
            text="이메일"
            errorMsg={errors.email?.message || errMsg.email}
          >
            <Input
              placeholder="이메일을 입력해 주세요."
              register={register}
              name="email"
              isError={errors.email !== undefined || !!errMsg.email}
              validation={{
                ...EMAIL_VALIDATION,
                required: '이메일을 입력해 주세요.',
              }}
            />
          </InputBox>

          <InputBox
            text="비밀번호"
            errorMsg={errors.password?.message || errMsg.password}
          >
            <TogglePassword
              placeholder="비밀번호를 입력해 주세요."
              register={register}
              name="password"
              isError={errors.password !== undefined || !!errMsg.password}
              validation={{ required: true }}
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
          <LoginCheckbox register={register}>로그인 상태 유지</LoginCheckbox>
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
