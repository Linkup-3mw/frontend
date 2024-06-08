import Image from 'next/image';
import TextField from '../../[id]/components/filed/TextField';
import { useState } from 'react';
import ConsentCheckbox from '../../[id]/components/filed/ConsentCheckbox';
import React, { ChangeEventHandler } from 'react';
import { useForm, FieldValues } from 'react-hook-form';
import { currentBuildingState } from '@/app/(search)/atom/search';
import { mobileReservationLayoutState } from '@/app/(search)/atom/media';
import { useRecoilState, useRecoilValue } from 'recoil';
import API from '@/utils/axios';
import { CompanyEnter, EnterpriseMembership } from '@/types/office/reservation';
import {
  companyState,
  selectedSeatAllState,
  selectedSpaceAllState,
} from '@/app/(search)/atom/office';

export default function Consulting() {
  const [companyName, setCompanyName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [hasError, setHasError] = useState({ contact: false, email: false });
  const [modal, setIsModal] = useState(false);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [consulting, setConsulting] = useRecoilState(companyState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const currentBuilding = useRecoilValue(currentBuildingState);
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
    setConsulting({
      name: companyName,
      manager_phone: contactNumber,
      manager_email: email,
      consent_contact: Boolean(dataCollectionAgree),
      consent_promotion: Boolean(marketingAgree),
    });
    console.log('@#@#@#@#@#@#consulting', consulting);
    const company_membership: EnterpriseMembership = {
      location: currentBuilding?.location!,
      duration: null,
      start_date: selectedSeatAll?.start_date!,
      end_date: selectedSpaceAll?.end_date!,
      staff_count: 14,
      price: 37800000!,
    };
    const company: CompanyEnter = {
      name: consulting?.name!,
      manager_phone: consulting?.manager_phone!,
      manager_email: consulting?.manager_email!,
      consent_contact: consulting?.consent_contact!,
      consent_promotion: consulting?.consent_promotion!,
    };
    console.log('@@@#$$@#$@#$@#$@#$!@#SDFASGA', {
      company_membership,
      company,
    });
    const fetchEnter = async () => {
      try {
        const res = await API.post(`reservation/company`, {
          company_membership,
          company,
        });
        console.log('enterprise!@!@!@!', res);
      } catch (error) {
        console.log('예약에러', error);
      }
    };
    fetchEnter();
  };

  const handleModalClose = () => {
    setIsModal(false);
  };

  return (
    <>
      <div className="flex flex-col items-center bg-[#E4EEFE] mb:w-[20rem] mb:h-[45.4375rem] md:w-[46.75rem] md:h-[54rem] rounded-2xl mx-auto my-auto">
        <div className="flex justify-start mb:w-full mb:h-[3.75rem] md:w-[41.75rem] md:h-[5.5rem] text-center items-center">
          {isMobile ? (
            <Image
              onClick={() => history.back()}
              src="/svg/reservation/consultingArrow.svg"
              className=""
              width={14}
              height={14}
              alt="historyback"
            />
          ) : (
            <Image
              onClick={() => history.back()}
              src="/svg/reservation/consultingArrow.svg"
              className=""
              width={24}
              height={24}
              alt="historyback"
            />
          )}
          <div className="flex-1 font-bold leading-[2.125rem] mb:text-[1rem] md:text-[1.5rem]">
            문의 신청
          </div>
        </div>

        <div className="mb:w-[18rem] md:w-[41.75rem] pt-[2rem] border-t-[0.5px] border-blue-400">
          <div className="flex flex-col mb:gap-5 md:gap-8">
            <div className="flex flex-col gap-1 ">
              <p className="font-bold leading-[2.375rem] mb:text-[1.25rem] md:text-[1.75rem]">
                기업 전용 문의
              </p>
              <p className="md:text-[1.25rem] mb:text-[0.75rem] text-[#8D8D9B]">
                자세한 계약 사항 및 일정은 문의 신청을 통해 안내받으실 수
                있습니다.
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-bold mb:text-[0.875rem] md:text-[1.25rem] leading-[2.375rem]">
                기업명
              </p>
              <TextField
                placeholder="(주)일도"
                value={companyName}
                onChange={(e) => handleChange(e, 'companyName')}
              />
            </div>
            <div className="flex flex-col justify-between gap-1">
              <p className="font-bold mb:text-[0.875rem] md:text-[1.25rem] leading-[2.375rem]">
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
              <p className="font-bold mb:text-[0.875rem] md:text-[1.25rem] leading-[2.375rem]">
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
              {/* check ask tokjh*/}
              <div className="flex flex-col gap-4">
                <ConsentCheckbox
                  label="전체 동의"
                  name="allAgree"
                  onChange={handleAllAgreeChange}
                  isChecked={allAgree}
                />
                <div className="flex flex-col gap-5 px-4">
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
              {modal && (
                // 모달 배경 높이, 손봐야할듯
                <div className="fixed top-0 left-0 mb:w-[22.5rem] mb:h-[55.4375rem] md:w-full md:h-full bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="md:w-[46.75rem] md:h-[20.625rem] mb:w-[20rem] mb:h-[15.3125rem] bg-[#E4EEFF]  rounded-lg p-8 text-center">
                    <div className="mb:text-[1rem] md:text-[1.5rem] font-bold mb:mb-2 md:mb-4 ">
                      문의 신청
                    </div>

                    <div className="w-full mb:h-[10.0625rem] md:h-[13.0625rem] flex flex-col justify-between border-t-[0.3px] border-[#BFD4FF]">
                      <div className="flex flex-col gap-2 items-center">
                        <div className="text-[#688AF2] font-bold mb:text-[1rem] md:text-[2rem] pt-[1rem] ">
                          문의 신청이 완료되었습니다.
                        </div>
                        <p className="text-[#8D8D9B] font-bold mb:text-[0.75rem] md:text-[1rem]">
                          담당자 내용 확인 후 1시간 내 연락드릴 예정입니다.
                        </p>
                        <button
                          className="bg-[#688AF2] mb:w-[4.5625rem] mb:h-[2.75rem] md:w-[11.875rem] md:h-[3.875rem] text-white px-4 py-2 rounded-lg mx-auto mt-4"
                          onClick={handleModalClose}
                        >
                          확인
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div
              className={`text-center w-full mb:text-[1rem] mb:h-[2.75rem] md:h-[3.875rem] font-bold md:text-[1.25rem] mb:py-2 md:py-4 rounded-lg ${
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
          </div>
        </div>
      </div>
    </>
  );
}
