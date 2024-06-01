import { useState } from 'react';
import {
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import Input from '@common/components/form/Input';
import InputBox from '@common/components/form/InputBox';
import { COMPANY_VALIDATION } from '@/app/(auth)/constants/validation';
import ButtonInInput from '@/app/(auth)/components/common/ButtonInInput';
import { verifyCompany } from '@/app/service/auth';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function CompanyInput({
  error,
  register,
  getValues,
  setValue,
}: Props) {
  const [isVerify, setIsVerify] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const verifyCompanyFn = async () => {
    const value = getValues('auth_code');
    if (value.length == 0) return;

    const data = await verifyCompany(value);
    if (data.status_code == 200) {
      //인증성공
      setIsVerify(true);
      setValue('company_id', data.company_id, {
        shouldDirty: true,
        shouldValidate: true,
      });
      setErrMsg('');
    } else {
      //인증실패
      setIsVerify(false);
      setErrMsg('기업 전용 코드가 정확한지 확인해 주세요.');
    }
  };

  return (
    <InputBox
      text="기업 전용 코드"
      errorMsg={
        error?.auth_code?.message || error?.company_id?.message || errMsg
      }
      msg={isVerify ? '기업 전용 코드 인증이 완료되었습니다.' : ''}
    >
      <span className="block relative">
        <Input
          placeholder="회사에서 제공받은 기업 전용 코드를 입력해 주세요."
          register={register}
          name="auth_code"
          isError={error?.auth_code !== undefined || errMsg.length > 0}
          validation={COMPANY_VALIDATION}
          readOnly={isVerify}
        />
        <ButtonInInput
          text={isVerify ? '인증완료' : '인증하기'}
          onClick={verifyCompanyFn}
          disabled={isVerify}
        />
      </span>
      <input type="hidden" {...register('company_id')} />
    </InputBox>
  );
}
