import { useEffect, useState } from 'react';
import {
  FieldValues,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';
import Input from '@common/components/form/Input';
import InputBox from '@common/components/form/InputBox';
import { EMAIL_VALIDATION } from '@/app/(auth)/constants/validation';
import ButtonInInput from '@/app/(auth)/components/common/ButtonInInput';
import { validateEmail, verifyEmail } from '@/app/service/auth';
import debounce from 'lodash.debounce';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  trigger: UseFormTrigger<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  clearErrors: UseFormClearErrors<FieldValues>;
}

export default function EmailInput({
  error,
  register,
  getValues,
  trigger,
  setValue,
  clearErrors,
}: Props) {
  const [showVerify, setShowVerify] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    register('email', {
      onBlur: () => trigger('email'),
    });
  }, []);

  //이메일 확인
  const validateEmailFn = debounce(async () => {
    const emailValue = getValues('email');
    if (!emailValue) return;

    try {
      const res = await validateEmail(emailValue);
      if (res.status_code === 200) {
        //확인 성공
        setShowVerify(true);
        setErrMsg('');
        clearErrors('email_verified');
      }
    } catch (e: any) {
      const res = e.response.data;
      if (res.status_code === 400) {
        //이미 가입된 계정
        setErrMsg(res.message);
      } else {
        //확인 실패
        setErrMsg('이메일 인증을 다시 시도해주세요.');
      }
    }
  }, 500);

  //이메일 인증번호 처리
  const verifyEmailFn = async () => {
    const emailValue = getValues('email');
    const authCode = getValues('email_confirm');

    if (!emailValue || !authCode) return;

    try {
      const res = await verifyEmail({ email: emailValue, authCode });
      if (res.status_code === 200 && res.data === 'OK') {
        //성공
        setIsVerify(true);
        setErrMsg('');
        setValue('email_verified', true, {
          shouldDirty: true,
          shouldValidate: true,
        });
        clearErrors('email_verified');
      } else {
        //인증번호 틀림
        setErrMsg('인증번호 6자리를 다시 확인해 주세요.');
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <InputBox
      text="이메일"
      errorMsg={
        error?.email?.message || error?.email_verified?.message || errMsg
      }
      msg={isVerify ? '인증이 완료되었습니다.' : ''}
    >
      <span className="block relative">
        <Input
          placeholder="이메일을 입력하고 인증하기를 눌러주세요."
          register={register}
          name="email"
          isError={
            error?.email !== undefined || (!showVerify && errMsg.length > 0)
          }
          validation={EMAIL_VALIDATION}
          readOnly={isVerify}
        />
        <ButtonInInput
          text={!isVerify ? '인증하기' : '인증완료'}
          onClick={validateEmailFn}
          disabled={error?.email !== undefined || isVerify}
        />
      </span>
      {showVerify && (
        <span className="block relative -mt-[0.5rem]">
          <Input
            placeholder="이메일로 전송된 인증번호 6자리를 입력해 주세요."
            name="email_confirm"
            isError={errMsg.length > 0 || error?.email !== undefined}
            register={register}
          />
          {!isVerify && (
            <ButtonInInput
              text="확인"
              onClick={verifyEmailFn}
              disabled={isVerify}
            />
          )}
        </span>
      )}
      <input type="hidden" {...register('email_verified')} />
    </InputBox>
  );
}
