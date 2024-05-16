'use client';
import { useForm } from 'react-hook-form';

import LabelWithInput from '@/app/common/components/form/LabelWithInput';
import Container from '../components/Container';
import RoundedFrame from '../components/RoundedFrame';
import {
  BIRTH_VALIDATION,
  EMAIL_VALIDATION,
  NAME_VALIDATION,
  NICKNAME_VALIDATION,
  PASSWORD_VALIDATION,
  PHONE_VALIDATION,
} from '../constants/validation';

export default function SignUppage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container>
      <RoundedFrame>
        <h2 className="mb-[2.5rem] text-center text-[1.5rem] font-bold">
          회원가입
        </h2>
        <div className="w-[37.5rem]">
          <form onSubmit={handleSubmit((data) => console.log(data))}>
            <LabelWithInput
              name="userName"
              text="이름"
              error={errors.userName}
              placeholder="이름을 입력해 주세요."
              register={register}
              required
              validation={NAME_VALIDATION}
            />
            <LabelWithInput
              name="birth"
              text="생년월일"
              error={errors.birth}
              placeholder="YYYY/MM/DD"
              register={register}
              required
              validation={BIRTH_VALIDATION}
            />
            <LabelWithInput
              name="phone"
              text="휴대폰 번호"
              error={errors.phone}
              placeholder="010-0000-0000"
              register={register}
              required
              validation={PHONE_VALIDATION}
            />
            <LabelWithInput
              name="email"
              text="아이디(이메일)"
              error={errors.email}
              placeholder="이메일을 입력해주세요"
              register={register}
              required
              validation={EMAIL_VALIDATION}
            />
            {/* 이메일 확인은 잠시 보류 */}
            <LabelWithInput
              name="password"
              text="비밀번호"
              error={errors.password}
              placeholder="16자 이내, 영문/숫자/특수문자만 허용, 2개 이상 조합"
              register={register}
              required
              validation={PASSWORD_VALIDATION}
              type="password"
            />
            <LabelWithInput
              name="nickname"
              text="닉네임"
              error={errors.nickname}
              placeholder="16자 이내, 한글/영문/숫자만 허용"
              register={register}
              required
              validation={NICKNAME_VALIDATION}
            />
            {/* 닉네임 검증도 보류 */}
            <button className="blue_square_btn" type="submit">
              회원가입
            </button>
          </form>
        </div>
      </RoundedFrame>
    </Container>
  );
}
