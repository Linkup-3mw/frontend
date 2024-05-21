import { useEffect } from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import Input from '../../../common/components/form/Input';
import InputBox from '../../../common/components/form/InputBox';
import { BIRTH_VALIDATION } from '../../constants/validation';

interface Props {
  error: FieldValues | undefined;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

export default function BirthdayInput({ error, register, setValue }: Props) {
  const birthdayFormat = (str: string) => {
    if (str.length > 10) return str.substring(0, 10);
    str = str.toString().replace(/[^0-9]/g, '');
    str = str.toString().replace(/\//g, '');
    let year = str.substring(0, 4);
    if (str.length > 4) {
      year += '/';
    }
    let monthDay = str.substring(4);
    return year + monthDay.replace(/\B(?=(\d{2})+(?!\d))/g, '/');
  };

  useEffect(() => {
    register('birthday', {
      onChange: (e) => setValue('birthday', birthdayFormat(e.target.value)),
    });
  });
  return (
    <InputBox text="생년월일" errorMsg={error?.message}>
      <Input
        placeholder="YYYY/MM/DD"
        register={register}
        name="birthday"
        isError={error !== undefined}
        validation={BIRTH_VALIDATION}
      />
    </InputBox>
  );
}
