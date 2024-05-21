import { FieldValues, UseFormRegister } from 'react-hook-form';
import Input from '../../../common/components/form/Input';
import InputBox from '../../../common/components/form/InputBox';
import { COMPANY_VALIDATION } from '../../constants/validation';
import ButtonInInput from '../common/ButtonInInput';
import { useState } from 'react';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
}

export default function CompanyInput({ register, error }: Props) {
  const [isVerify, setIsVerify] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const verifyCompanyFn = () => {
    //인증성공

    //인증실패
    setErrMsg('기업 전용 코드가 정확한지 확인해 주세요.');
  };

  return (
    <InputBox
      text="기업 전용 코드"
      errorMsg={error?.message || errMsg}
      msg={isVerify ? '기업 전용 코드 인증이 완료되었습니다.' : ''}
    >
      <span className="block relative">
        <Input
          placeholder="회사에서 제공받은 기업 전용 코드를 입력해 주세요."
          register={register}
          name="company_id"
          isError={error !== undefined}
          validation={COMPANY_VALIDATION}
        />
        <ButtonInInput text="인증하기" onClick={verifyCompanyFn} />
      </span>
    </InputBox>
  );
}
