import { FieldValues, RegisterOptions } from 'react-hook-form';

export const NAME_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '이름은 필수 정보 입니다.',
  pattern: {
    value: /^[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/,
    message: '숫자, 공백 혹은 특수문자는 입력 불가합니다.',
  },
  minLength: {
    value: 2,
    message: '2자 이상 입력해 주세요.',
  },
  maxLength: {
    value: 10,
    message: '10자 이하로 입력해 주세요.',
  },
};

export const BIRTH_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '생년월일은 필수 정보 입니다.',
};

export const EMAIL_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '이메일은 필수 정보 입니다.',
  pattern: {
    value:
      /^[a-zA-Z]+[!#$%&'*+-/=?^_`(){|}~]*[a-zA-Z0-9]*@[\w]+\.[a-zA-Z0-9-]+[.]*[a-zA-Z0-9]+$/,
    message: '유효한 이메일 형식인지 확인해 주세요.',
  },
};
export const PHONE_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '휴대폰번호는 필수 정보 입니다.',
  pattern: {
    value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    message: '올바르게 입력해주세요.',
  },
};
export const PASSWORD_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '영문, 숫자, 특수문자를 모두 사용하여 8~16자를 입력해 주세요.',
  pattern: {
    value: /^(?=.*[a-zA-Z])(?=.*[~!@#$%^*+=-])(?=.*[0-9]).{8,16}$/,
    message: '영문, 숫자, 특수문자를 모두 사용하여 8~16자를 입력해 주세요.',
  },
};
export const NICKNAME_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '6자 이내의 한글/영문/숫자를 사용해 주세요.',
  pattern: {
    value: /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,6}$/,
    message: '6자 이내의 한글/영문/숫자를 사용해 주세요.',
  },
};

export const COMPANY_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '기업 전용 코드를 입력해 주세요.',
};
