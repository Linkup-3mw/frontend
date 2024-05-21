import {
  Control,
  FieldValues,
  UseFormGetValues,
  UseFormRegister,
} from 'react-hook-form';
import InputBox from '../../../common/components/form/InputBox';
import TogglePassword from '../common/TogglePassword';
import { PASSWORD_VALIDATION } from '../../constants/validation';
import { useEffect, useState } from 'react';

interface Props {
  error: FieldValues | undefined;
  control: Control;
  register: UseFormRegister<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

export default function PasswordInput({ error, register, getValues }: Props) {
  const [verifyPwd, setVerifyPwd] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');

  useEffect(() => {
    register('confirm_password', {
      onChange: (e) => handleChange(e, 'confirm'),
    });
    register('password', {
      onBlur: (e) => handleChange(e, 'password'),
    });
  }, []);

  const handleChange = (e: any, type?: string) => {
    const value = e.target.value;
    let password;
    if (type == 'password') {
      password = getValues('confirm_password');
      if (password.length == 0) return;
    } else {
      password = getValues('password');
    }

    if (password === value) {
      setVerifyPwd(true);
      setVerifyMsg('');
    } else {
      setVerifyPwd(false);
      setVerifyMsg('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      <InputBox text="비밀번호" errorMsg={error?.message}>
        <TogglePassword
          placeholder="영문, 숫자, 특수문자를 모두 사용하여 8~16자를 입력해 주세요."
          register={register}
          name="password"
          isError={error !== undefined}
          validation={PASSWORD_VALIDATION}
        />
      </InputBox>
      <InputBox
        text="비밀번호 확인"
        errorMsg={verifyMsg}
        msg={verifyPwd ? '비밀번호가 일치합니다.' : ''}
      >
        <TogglePassword
          placeholder="영문, 숫자, 특수문자를 모두 사용하여 8~16자를 입력해 주세요."
          register={register}
          name="confirm_password"
          isError={verifyPwd && verifyMsg !== ''}
        />
      </InputBox>
    </>
  );
}
