import { useEffect } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import Input from '@common/components/form/Input';
import InputBox from '@common/components/form/InputBox';
import { PHONE_VALIDATION } from '@/app/(auth)/constants/validation';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function PhoneNumberInput({ error, register, setValue }: Props) {
  const phoneNumberFormat = (str: string) => {
    if (str.length > 13) return str.substring(0, 13);
    str = str.replace(/[^0-9]/g, '').replace(/\-/g, '');
    let first = str.substring(0, 3);
    if (str.length > 3) {
      first += '-';
    }
    let numbers = str.substring(3);
    return first + numbers.replace(/\B(?=(\d{4})+(?!\d))/g, '-');
  };

  useEffect(() => {
    register('phone_number', {
      onChange: (e) =>
        setValue('phone_number', phoneNumberFormat(e.target.value)),
    });
  }, []);

  return (
    <InputBox text="휴대폰 번호" errorMsg={error?.phone_number?.message}>
      <Input
        placeholder="휴대폰 번호를 입력해 주세요."
        register={register}
        name="phone_number"
        isError={error?.phone_number !== undefined}
        validation={PHONE_VALIDATION}
      />
    </InputBox>
  );
}
