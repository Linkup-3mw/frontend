import { mobileReservationLayoutState } from '@/app/(search)/atom/media';
import { useMobileLayout } from '@/app/(search)/map/hooks/mobile/useMobileLayout';
import { useRecoilValue } from 'recoil';
import Image from 'next/image';
import { useState } from 'react';
import React, { ChangeEventHandler, useEffect } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import Link from 'next/link';
import TextField from '../../../[id]/components/filed/TextField';
import ConsentCheckbox from '../../../[id]/components/filed/ConsentCheckbox';

export default function ConsultingMobile() {
  useMobileLayout();
  const isMobile = useRecoilValue(mobileReservationLayoutState);

  const [companyName, setCompanyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState({ contact: false, email: false });
  const [modal, setIsModal] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string,
  ) => {
    const value = event.target.value;

    if (type === 'contact') {
      setContactNumber(value);
      setHasError((prev) => ({ ...prev, contact: !/^\d+$/.test(value) }));
    } else if (type === 'email') {
      setEmail(value);
      setHasError((prev) => ({
        ...prev,
        email: !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value),
      }));
    } else if (type === 'companyName') {
      setCompanyName(value);
    }
  };

  const { setValue, watch } = useForm<FieldValues>();
  const allAgree = watch('allAgree');
  const dataCollectionAgree = watch('dataCollectionAgree');
  const marketingAgree = watch('marketingAgree');

  const handleAllAgreeChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const isChecked = event.target.checked;
    setValue('dataCollectionAgree', isChecked);
    setValue('marketingAgree', isChecked);
    setValue('allAgree', isChecked);
  };

  const handleIndividualAgreeChange: ChangeEventHandler<
    HTMLInputElement
  > = () => {
    const allChecked = dataCollectionAgree && marketingAgree;
    setValue('allAgree', allChecked);
  };

  const handleModalOpen = () => {
    setIsModal(true);
  };

  const handleModalClose = () => {
    setIsModal(false);
  };
  console.log('모바일');

  return (
    <>
      {isMobile && (
        <div className="flex flex-col items-center bg-pink-300 w-[46.75rem] h-[54rem] rounded-2xl mx-auto my-auto">
          <div className="flex justify-start w-[41.75rem] h-[5.5rem] text-center items-center">
            <Image
              onClick={() => history.back()}
              src="/svg/reservation/consultingArrow.svg"
              className=""
              width={24}
              height={24}
              alt="historyback"
            />
            <div className="flex-1 font-bold leading-[2.125rem] text-[1.5rem]">
              문의 신청
            </div>
          </div>

          <div className="w-[41.75rem] pt-[2rem] border-t-2 border-gray-400">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1">
                <p className="font-bold leading-[2.375rem] text-[1.75rem]">
                  기업 전용 문의
                </p>
                <p className="text-[#8D8D9B]">
                  자세한 계약 사항 및 일정은 문의 신청을 통해 안내받으실 수
                  있습니다.
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-[1.25rem] leading-[2.375rem]">
                  기업명
                </p>
                <TextField
                  placeholder="(주)일도"
                  value={companyName}
                  onChange={(e) => handleChange(e, 'companyName')}
                />
              </div>
              <div className="flex flex-col justify-between gap-1">
                <p className="font-bold text-[1.25rem] leading-[2.375rem]">
                  담당자 연락처
                </p>
                <TextField
                  placeholder="01012349999"
                  value={contactNumber}
                  onChange={(e) => handleChange(e, 'contact')}
                  hasError={hasError.contact}
                />
                {hasError.contact && (
                  <span className="text-red-500">숫자로만 입력해주세요.</span>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-bold text-[1.25rem] leading-[2.375rem]">
                  이메일
                </p>
                <TextField
                  placeholder="contact@linkup.co.kr"
                  value={email}
                  onChange={(e) => handleChange(e, 'email')}
                  hasError={hasError.email}
                />
                {hasError.email && (
                  <span className="text-red-500">
                    이메일 형식을 올바르게 작성해주세요.
                  </span>
                )}
              </div>
              <div className="w-full">
                <div className="flex flex-col gap-6">
                  <ConsentCheckbox
                    label="전체 동의"
                    name="allAgree"
                    onChange={handleAllAgreeChange}
                    isChecked={allAgree}
                  />
                  <div className="flex flex-col gap-4 px-4">
                    <ConsentCheckbox
                      label="[필수] 개인정보 수집 동의"
                      name="dataCollectionAgree"
                      onChange={handleIndividualAgreeChange}
                      isChecked={dataCollectionAgree}
                    />
                    <ConsentCheckbox
                      label="[선택] 마케팅 활용 동의"
                      name="marketingAgree"
                      onChange={handleIndividualAgreeChange}
                      isChecked={marketingAgree}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div
                  className={`text-center w-full h-[3.875rem] font-bold text-[1.25rem] py-4 rounded-lg ${
                    !hasError.contact &&
                    !hasError.email &&
                    companyName &&
                    contactNumber &&
                    email
                      ? 'bg-[#688AF2] text-white'
                      : 'bg-[#D0D0D8] '
                  }`}
                  onClick={handleModalOpen}
                >
                  신청하기
                </div>
                {modal && (
                  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="w-[46.75rem] h-[20.625rem] bg-[#E4EEFF] rounded-lg p-8 text-center">
                      <p className="text-[1.5rem] font-bold mb-4">문의 신청</p>
                      <div className="w-full h-[13.0625rem] flex flex-col justify-between gap-4  border-t-2 border-[##BFD4FF]">
                        <div className="flex flex-col gap-2">
                          <p className="text-[#688AF2] font-bold text-[2rem] pt-[1rem]">
                            문의 신청이 완료되었습니다.
                          </p>
                          <p className="text-[#8D8D9B] font-bold">
                            담당자 내용 확인 후 1시간 내 연락드릴 예정입니다.
                          </p>
                        </div>
                        <button
                          className="bg-[#688AF2] w-[11.875rem] h-[3.875rem] text-white px-4 py-2 rounded-lg mx-auto mt-4"
                          onClick={handleModalClose}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
