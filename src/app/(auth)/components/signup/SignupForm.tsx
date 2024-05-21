'use client';
import { SubmitHandler, useForm } from 'react-hook-form';

import {
  NAME_VALIDATION,
  NICKNAME_VALIDATION,
  PHONE_VALIDATION,
} from '@/app/(auth)/constants/validation';
import InputBox from '@common/components/form/InputBox';
import Input from '@common/components/form/Input';
import RadioButton from '@common/components/form/RadioButton';
import BlueSquareBtn from '@/app/common/components/form/BlueSquareBtn';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';
import CompanyInput from './CompanyInput';
import BirthdayInput from './BirthdayInput';

interface Props {
  type: string;
}

interface FormValues {
  [text: string]: any;
}

export default function SignupForm({ type }: Props) {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    trigger,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 기업 회원가입인 경우 */}
        {type == 'enterprise' && (
          <CompanyInput register={register} error={errors.company_id} />
        )}

        <EmailInput
          error={errors.email}
          register={register}
          getValues={getValues}
          trigger={trigger}
        />

        <PasswordInput
          error={errors.password}
          register={register}
          control={control}
          getValues={getValues}
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
              value="male"
              text="남성"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
            <RadioButton
              name="gender"
              value="female"
              text="여성"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
            <RadioButton
              name="gender"
              value="not"
              text="선택 안함"
              register={register}
              errMsg="성별을 선택해 주세요."
            />
          </div>
        </InputBox>

        <InputBox text="휴대폰 번호" errorMsg={errors.phone?.message}>
          <Input
            placeholder="휴대폰 번호를 입력해 주세요."
            register={register}
            name="phone"
            isError={errors.phone !== undefined}
            validation={PHONE_VALIDATION}
          />
        </InputBox>

        <InputBox text="닉네임" errorMsg={errors.username?.message}>
          <Input
            placeholder="6자 이내의 한글/영문/숫자를 사용해 주세요."
            register={register}
            name="username"
            isError={errors.username !== undefined}
            validation={NICKNAME_VALIDATION}
          />
        </InputBox>

        <InputBox text="산업군" errorMsg={errors.industry?.message}>
          <div className="flex flex-wrap gap-[1rem] my-[1rem]">
            {INDUSTRY.map((item) => (
              <RadioButton
                key={item.id}
                name="industry"
                value={item.id}
                text={item.text}
                classname="grow-0"
                register={register}
                errMsg="산업군을 선택해 주세요."
              />
            ))}
          </div>
        </InputBox>
        <InputBox text="직무" errorMsg={errors.occupation?.message}>
          <div className="flex flex-wrap gap-[1rem] my-[1rem]">
            {JOB.map((item) => (
              <RadioButton
                key={item.id}
                name="occupation"
                value={item.id}
                text={item.text}
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

//임시값
const JOB = [
  { id: 'JOB001', text: '개발' },
  { id: 'JOB002', text: '기획' },
  { id: 'JOB003', text: '분석' },
  { id: 'JOB004', text: '디자인' },
  { id: 'JOB005', text: '마케팅' },
  { id: 'JOB006', text: '컨설팅' },
  { id: 'JOB007', text: '영업 판매' },
  { id: 'JOB008', text: '촬영 편집' },
  { id: 'JOB009', text: '회계' },
  { id: 'JOB010', text: '세무' },
];

const INDUSTRY = [
  { id: 'IND001', text: 'IT' },
  { id: 'IND002', text: '건설' },
  { id: 'IND003', text: '부동산' },
  { id: 'IND004', text: '생산 제조' },
  { id: 'IND005', text: '연구개발' },
  { id: 'IND006', text: '금융' },
  { id: 'IND007', text: '금융' },
  { id: 'IND008', text: '통신' },
  { id: 'IND009', text: '무역' },
  { id: 'IND010', text: '물류' },
  { id: 'IND011', text: '의료' },
];
