import { useEffect, useState } from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormTrigger,
} from 'react-hook-form';
import Input from '@common/components/form/Input';
import InputBox from '@common/components/form/InputBox';
import { EMAIL_VALIDATION } from '@/app/(auth)/constants/validation';
import ButtonInInput from '@/app/(auth)/components/common/ButtonInInput';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
}

export default function EmailInput({
  error,
  register,
  getValues,
  trigger,
}: Props) {
  const [showVerify, setShowVerify] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    register('email', {
      onBlur: (e) => trigger('email'),
    });
  }, []);

  //이메일 확인
  const validateEmailFn = async () => {
    const emailValue = getValues('email');
    if (!emailValue) return;

    //확인 성공
    setShowVerify(true);
    //확인 실패
  };
  const verifyEmailFn = () => {
    //이메일 인증번호 처리
    setIsVerify(true);
  };
  return (
    <InputBox
      text="이메일"
      errorMsg={error?.message || errMsg}
      msg={isVerify ? '인증이 완료되었습니다.' : ''}
    >
      <span className="block relative">
        <Input
          placeholder="이메일을 입력해 주세요."
          register={register}
          name="email"
          isError={error !== undefined}
          validation={EMAIL_VALIDATION}
        />
        <ButtonInInput
          text="인증하기"
          onClick={validateEmailFn}
          disabled={error !== undefined}
        />
      </span>
      {showVerify && (
        <span className="block relative -mt-[0.5rem]">
          <Input
            placeholder="이메일로 전송된 인증번호 6자리를 입력해 주세요."
            name="auth_code"
            isError={errMsg.length > 0 || error !== undefined}
            register={register}
          />
          <ButtonInInput
            text="확인"
            onClick={verifyEmailFn}
            disabled={isVerify}
          />
        </span>
      )}
    </InputBox>
  );
}
