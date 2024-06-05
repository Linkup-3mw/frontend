'use client';
import { FormEvent, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import BlueSquareBtn from '@common/components/form/BlueSquareBtn';
import TermsContent from './TermsContent';

interface Props {
  requiredTerms: ITerm[];
  optionalTerms: ITerm[];
  type: string;
}
export interface ITerm {
  id: string;
  name: string;
  isChecked?: boolean;
}

export default function Terms({ requiredTerms, optionalTerms, type }: Props) {
  const [requiredData, setRequiredData] = useState(requiredTerms);
  const [optionalData, setOptionalData] = useState(optionalTerms);
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const agrees = optionalData
      .filter(({ isChecked }) => isChecked == true)
      .map(({ id }) => id)
      .toString();

    const newQueryString = createQueryString('agrees', agrees);

    router.push(`/signup?type=${type}&${newQueryString}`);
  };

  const createQueryString = useCallback((name: string, value: string) => {
    const params = new URLSearchParams();
    params.set(name, value);

    return params.toString();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <TermsContent
        title="[필수] 전체동의"
        data={requiredData}
        type="toggle"
        setData={setRequiredData}
      />

      <div className="mt-[2.5rem] mb-[6.38rem] max-md:mt-[2.08rem] max-md:mb-[]">
        <TermsContent
          title="[선택] 혜택 및 마케팅 정보 수신 동의"
          data={optionalData}
          setData={setOptionalData}
        />
        <p className="-mt-[1rem] text-[1rem] text-gray-400 font-medium max-md:text-[0.75rem] max-md:leading-[150%] ">
          예약 및 결제 정보는 수신 동의 여부와 관계없이 발송됩니다.
        </p>
      </div>
      <BlueSquareBtn
        name="동의하고 가입하기"
        type="submit"
        disabled={
          !(requiredData.filter((item) => item.isChecked !== true).length < 1)
        }
      />
    </form>
  );
}
