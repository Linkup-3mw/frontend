'use client';

import ContentWrap from '@/app/common/components/frame/ContentWrap';
import { useState } from 'react';
import { members } from '../../../../data/members';
import { applications } from '../../../../data/applications';
import SearchInput from '@/app/community/components/club/SearchInput';

interface MobileMenuProps {
  handleMenuSelect: (selectedMenu: string) => void;
  menuSelection: string;
}

export default function ClubManagePage() {
  const [expandedApplicationId, setExpandedApplicationId] = useState<
    number | null
  >(null);
  const [mobileViewMode, setMobileViewMode] = useState('members'); // 초기값은 'members'로 설정

  const handleMenuSelect = (selectedMenu: string) => {
    if (selectedMenu === '멤버 리스트') {
      setMobileViewMode('members');
    } else if (selectedMenu === '신청서 관리') {
      setMobileViewMode('requests');
    }
  };

  const toggleApplication = (id: number) => {
    setExpandedApplicationId(expandedApplicationId === id ? null : id);
  };

  const ApplicationHeader = () => {
    return (
      <>
        <div className="md:flex md:mb-8 mb-4">
          <button
            className="mr-[2.5rem] text-xl mb-4"
            onClick={() => window.history.back()}
          >
            &lt;
          </button>
          <div className="text-left">
            <h2 className="md:text-2xl text-[1rem] font-bold mb-2 leading-none">
              소모임 이름
            </h2>
            <p className="leading-none font-medium md:text-[1rem] text-sm">
              소모임 설명
            </p>
          </div>
        </div>
      </>
    );
  };

  const MemberList = () => {
    return (
      <>
        <ul className="space-y-2 md:overflow-y-auto md:h-[25rem]">
          {members.map((member) => (
            <li
              key={member.id}
              className="flex items-center justify-between p-4"
            >
              <div className="flex items-center">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="md:w-[3.75rem] md:h-[3.75rem] w-[2rem] h-[2rem] rounded-full md:mr-[1.25rem] mr-[0.69em] border-[0.19rem] border-main-green"
                />
                <div>
                  <h3 className="font-semibold md:text-base text-sm">
                    {member.name}
                  </h3>
                  <p className="md:text-sm text-xs md:font-semibold">
                    {member.job} | {member.location}
                  </p>
                  <p className="md:text-sm text-xs text-gray-600">
                    마지막 활동일 {member.lastActivity}
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-main-blue md:w-[1.5rem] md:h-[1.5rem] w-[1rem] h-[1rem] rounded-full border-[0.09rem] border-black mr-2 flex items-center justify-center">
                  <img
                    src="/svg/club/crownIconLine.svg"
                    alt="Crown Icon"
                    className="md:p-[0.2rem] p-[0.1rem]"
                  />
                </div>
                <img
                  src="/svg/club/trashIcon.svg"
                  alt="Trash Icon"
                  className="md:w-6 w-4"
                />
              </div>
            </li>
          ))}
        </ul>
      </>
    );
  };

  const RequestMemberList = () => {
    const ApproveAndRefuseButtons = () => {
      return (
        <div className="flex items-center space-x-4 w-full md:text-sm text-xs">
          <button className="bg-blue-400 text-white md:w-[4.5rem] flex-grow h-[2.125rem] rounded font-bold">
            승인
          </button>
          <button className="bg-red-cancel text-white md:w-[4.5rem] flex-grow h-[2.125rem] rounded font-bold">
            거절
          </button>
        </div>
      );
    };

    return (
      <>
        {applications.map((application) => (
          <div
            key={application.id}
            className="p-4 border rounded-lg md:bg-none bg-white"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-grow">
                <img
                  src={application.avatar}
                  alt={application.name}
                  className="md:w-[3.75rem] md:h-[3.75rem] w-[2rem] h-[2rem] rounded-full md:mr-[1.25rem] mr-[0.69em] border-[0.19rem] border-main-green"
                />
                <div>
                  <h3 className="font-semibold md:text-base text-sm">
                    {application.name}
                  </h3>
                  <p className="md:text-sm text-xs md:font-semibold">
                    {application.job} | {application.location}
                  </p>
                </div>
              </div>
              <div className="flex md:hidden justify-end">
                <button
                  className="mt-[-1.3rem]"
                  onClick={() => toggleApplication(application.id)}
                >
                  {expandedApplicationId === application.id ? (
                    ''
                  ) : (
                    <img src="/svg/club/arrowDown.svg" alt="Arrow Down" />
                  )}
                </button>
              </div>
              <div className="hidden md:flex">
                <ApproveAndRefuseButtons />
              </div>
            </div>

            {expandedApplicationId !== application.id && (
              <div className="md:hidden flex mt-4">
                <ApproveAndRefuseButtons />
              </div>
            )}

            <div className="md:flex justify-center hidden">
              <button
                className="mt-[-1.3rem]"
                onClick={() => toggleApplication(application.id)}
              >
                {expandedApplicationId === application.id ? (
                  ''
                ) : (
                  <img src="/svg/club/arrowDown.svg" alt="Arrow Down" />
                )}
              </button>
            </div>

            {expandedApplicationId === application.id && (
              <div className="mt-[1.5rem]">
                {application.questions.map((qa, index) => (
                  <div key={index} className="space-y-4 mb-[1.5rem]">
                    <p className="text-gray-500 font-normal text-xs leading-none">
                      {qa.question}
                    </p>
                    <p className="font-semibold text-sm leading-none">
                      {qa.answer}
                    </p>
                  </div>
                ))}

                <div className="justify-center hidden md:flex">
                  <button
                    className=""
                    onClick={() => toggleApplication(application.id)}
                  >
                    <img src="/svg/club/arrowUp.svg" alt="Arrow Up" />
                  </button>
                </div>

                <div className="md:hidden mb-4">
                  <ApproveAndRefuseButtons />
                </div>

                <div className="justify-center md:hidden flex">
                  <button
                    className=""
                    onClick={() => toggleApplication(application.id)}
                  >
                    <img src="/svg/club/arrowUp.svg" alt="Arrow Up" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  };

  const MobileMenu = ({ handleMenuSelect, menuSelection }: MobileMenuProps) => {
    return (
      <div className="md:hidden flex font-bold md:text-xl text-xs border-b border-gray-300">
        <button
          onClick={() => handleMenuSelect('멤버 리스트')}
          className={`text-xs md:text-lg font-semibold px-[0.5rem] py-4 leading-none ${menuSelection === '멤버 리스트' ? '' : 'text-gray-500'} border-b-2 ${
            menuSelection === '멤버 리스트'
              ? 'border-main-black outline-inner'
              : 'border-transparent'
          }`}
        >
          멤버 리스트
        </button>
        <button
          onClick={() => handleMenuSelect('신청서 관리')}
          className={`text-xs md:text-lg font-semibold px-[0.5rem] py-4 leading-none ${menuSelection === '신청서 관리' ? '' : 'text-gray-500'} border-b-2 ${
            menuSelection === '신청서 관리'
              ? 'border-main-black outline-inner'
              : 'border-transparent'
          }`}
        >
          신청서 관리
        </button>
      </div>
    );
  };

  return (
    <div className="pt-[2.5rem] px-[1.25rem] relative">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl md:p-[2.5rem] p-4">
          <ApplicationHeader />
          <MobileMenu
            handleMenuSelect={handleMenuSelect}
            menuSelection={
              mobileViewMode === 'members' ? '멤버 리스트' : '신청서 관리'
            }
          />
          <div className="flex justify-between md:flex-row flex-col">
            {/* 멤버 리스트 */}
            <section
              className={`md:w-2/5 ${mobileViewMode === 'members' ? 'block' : 'hidden'} md:block`}
            >
              <div className="md:bg-white md:h-[35.375rem] md:px-[2rem] md:py-[1.5rem] rounded-2xl">
                <h2 className="md:flex hidden text-xl font-semibold leading-none">
                  멤버 리스트
                </h2>
                <div className="relative md:py-[1.5rem] py-[1rem]">
                  <SearchInput
                    placeholder="찾고 싶은 소모임을 검색하세요."
                    className="w-full text-xs"
                  />
                </div>
                <MemberList />
              </div>
            </section>
            <div className=" border-r border-gray-200 mr-8 pr-8 md:block hidden"></div>
            {/* 신청서 관리 */}
            <section
              className={`flex-grow ${mobileViewMode === 'requests' ? 'block' : 'hidden'} md:block`}
            >
              <div className="md:bg-white md:px-[2rem] md:py-[1.5rem] py-4 rounded-2xl md:h-[35.375rem]">
                <h2 className="md:flex hidden text-xl font-semibold mb-[1.62rem] leading-none">
                  신청서 관리
                </h2>
                <div className="space-y-4 md:overflow-y-auto md:h-[30rem]">
                  <RequestMemberList />
                </div>
              </div>
            </section>
          </div>
        </div>
      </ContentWrap>
    </div>
  );
}
