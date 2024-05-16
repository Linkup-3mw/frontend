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
    message: '올바른 이메일 형식으로 입력해 주세요.',
  },
};
export const PHONE_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '휴대폰번호는 필수 정보 입니다.',
  pattern: {
    value: /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/,
    // value: /d+/,
    message: '올바르게 입력해주세요.',
  },
  // maxLength: {
  //   value: 11,
  //   message: '11자 이하로 입력해 주세요.',
  // },
};
export const PASSWORD_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '8~16자, 영문/숫자/특수문자만 허용, 2개 이상 조합을 사용해 주세요.',
  pattern: {
    value: /^(?=.*[a-zA-Z])((?=.*[!@#$%^*+=-])|(?=.*[0-9])).{8,16}$/,
    message:
      '8~16자, 영문/숫자/특수문자만 허용, 2개 이상 조합을 사용해 주세요.',
  },
};
export const NICKNAME_VALIDATION: RegisterOptions<FieldValues, string> = {
  required: '닉네임을 입력해 주세요.',
  pattern: {
    value: /^[ㄱ-ㅎ가-힣a-z0-9-_]{2,8}$/,
    message: '8자 이내, 한글/영문/숫자만 입력해 주세요.',
  },
};
