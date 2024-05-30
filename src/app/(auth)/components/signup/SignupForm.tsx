'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { useIndustryQuery, useOccupationQuery } from '@/hooks/useCategory';
import { NAME_VALIDATION } from '@/app/(auth)/constants/validation';
import InputBox from '@common/components/form/InputBox';
import Input from '@common/components/form/Input';
import RadioButton from '@common/components/form/RadioButton';
import BlueSquareBtn from '@/app/common/components/form/BlueSquareBtn';
import { signUp } from '@/app/service/auth';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import CompanyInput from './CompanyInput';
import BirthdayInput from './BirthdayInput';
import PhoneNumberInput from './PhoneNumberInput';
import NicknameInput from './NicknameInput';

interface Props {
  type: string;
}

export interface FormValues {
  [text: string]: any;
}

export default function SignupForm({ type }: Props) {
  const { data: industryList } = useIndustryQuery();
  const { data: occupationList } = useOccupationQuery();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    setError,
    setFocus,
    clearErrors,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (data.company_id?.length == 0) {
      setError('company_id', { message: '기업 인증을 해주세요.' });
      setFocus('auth_code');
      return;
    }
    // if (!data.email_verified) {
    //   setError('email_verified', { message: '이메일 인증을 해주세요.' });
    //   setFocus('email');
    //   return;
    // }
    if (data.confirm_password !== data.password) {
      setError(
        'confirm_password',
        { message: '비밀번호가 일치하지 않습니다.' },
        { shouldFocus: true },
      );
      return;
    }

    const params: FormValues = {
      ...data,
      birthday: data.birthday.replaceAll('/', '-') as string,
    };
    delete params.auth_code;
    delete params.confirm_password;
    delete params.email_confirm;

    if (type === 'enterprise') {
      params.company_verified = true;
    }

    //임시 이메일 인증 통과
    params.email_verified = true;

    try {
      const res = await signUp(params);
      if (res.status_code === 200) {
        alert('가입이 완료되었습니다.');
        router.push('/signin');
      }
    } catch (e) {
      console.error(e);
      alert('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 기업 회원가입인 경우 */}
        {type == 'enterprise' && (
          <CompanyInput
            getValues={getValues}
            register={register}
            error={errors}
            setValue={setValue}
          />
        )}

        <EmailInput
          error={errors}
          register={register}
          getValues={getValues}
          trigger={trigger}
          setValue={setValue}
          clearErrors={clearErrors}
        />

        <PasswordInput
          error={errors}
          register={register}
          getValues={getValues}
          trigger={trigger}
        />

        <InputBox text="이름" errorMsg={errors.name?.message}>
          <Input
            placeholder="실명을 입력해 주세요."
            register={register}
            name="name"
            isError={errors.name !== undefined}
            validation={NAME_VALIDATION}
          />
        </InputBox>

        <BirthdayInput
          error={errors.birthday}
          register={register}
          setValue={setValue}
        />

        <InputBox text="성별" errorMsg={errors.gender?.message}>
          <div className="flex justify-between gap-[1rem] my-[1rem]">
            <RadioButton
              name="gender"
              value="남성"
              text="남성"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
            <RadioButton
              name="gender"
              value="여성"
              text="여성"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
            <RadioButton
              name="gender"
              value="선택 안함"
              text="선택 안함"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
          </div>
        </InputBox>

        <PhoneNumberInput
          error={errors}
          register={register}
          setValue={setValue}
        />

        <NicknameInput
          error={errors}
          register={register}
          setError={setError}
          clearErrors={clearErrors}
        />

        <InputBox text="산업군" errorMsg={errors.industry?.message}>
          <div className="flex flex-wrap gap-[1rem] my-[1rem]">
            {industryList.map((item: string, index: number) => (
              <RadioButton
                key={index}
                name="industry"
                value={item}
                text={item}
                classname="grow-0"
                register={register}
                errMsg="산업군을 선택해 주세요."
              />
            ))}
          </div>
        </InputBox>
        <InputBox text="직무" errorMsg={errors.occupation?.message}>
          <div className="flex flex-wrap gap-[1rem] my-[1rem]">
            {occupationList.map((item: string, index: number) => (
              <RadioButton
                key={index}
                name="occupation"
                value={item}
                text={item}
                classname="grow-0"
                register={register}
                errMsg="직무를 선택해 주세요."
              />
            ))}
          </div>
        </InputBox>

        <BlueSquareBtn
          classname="mt-[5rem]"
          name="가입 완료"
          type="submit"
          disabled={!isDirty || !isValid}
        />
      </form>
    </div>
  );
}
