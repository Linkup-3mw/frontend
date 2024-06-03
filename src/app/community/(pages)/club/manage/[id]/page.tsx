'use client';

import ContentWrap from '@/app/common/components/frame/ContentWrap';
import { useState } from 'react';

interface Member {
  id: number;
  name: string;
  avatar: string;
  job: string;
  location: string;
  lastActivity: string;
}

interface Application {
  id: number;
  name: string;
  avatar: string;
  job: string;
  location: string;
  questions: { question: string; answer: string }[];
}

export default function ClubManagePage() {
  const members: Member[] = [
    {
      id: 1,
      name: '김기준',
      avatar: '/images/club/example.jpg',
      job: '반도체 연구원 지망생',
      location: '신도림',
      lastActivity: '2024.06.01',
    },
    {
      id: 2,
      name: '김지혜',
      avatar: '/images/club/example.jpg',
      job: '프론트엔드 개발자',
      location: '서울',
      lastActivity: '2024.06.01',
    },
    {
      id: 3,
      name: '장문용',
      avatar: '/images/club/example.jpg',
      job: '프론트엔드 개발자',
      location: '서울',
      lastActivity: '2024.06.01',
    },
    {
      id: 4,
      name: '채서영',
      avatar: '/images/club/example.jpg',
      job: '프론트엔드 개발자',
      location: '인천',
      lastActivity: '2024.06.01',
    },
    {
      id: 5,
      name: 'Eva Martinez',
      avatar: '/images/club/example.jpg',
      job: 'Engineer',
      location: 'Berlin',
      lastActivity: '2024.06.01',
    },
    {
      id: 6,
      name: 'David Wilson',
      avatar: '/images/club/example.jpg',
      job: 'Artist',
      location: 'Los Angeles',
      lastActivity: '2024.06.01',
    },
  ];

  const applications: Application[] = [
    {
      id: 1,
      name: '김철수',
      avatar: '/images/club/example.jpg',
      job: '마케팅',
      location: '파리',
      questions: [
        {
          question: '우리 클럽에 가입하고 싶은 이유는 무엇인가요?',
          answer: '커뮤니티를 사랑합니다.',
        },
        {
          question: '당신이 기여할 수 있는 점은 무엇인가요?',
          answer: '마케팅 전문 지식을 제공할 수 있습니다.',
        },
      ],
    },
    {
      id: 2,
      name: '김영희',
      avatar: '/images/club/example.jpg',
      job: '매니저',
      location: '도쿄',
      questions: [
        {
          question: '우리 클럽에 가입하고 싶은 이유는 무엇인가요?',
          answer: '네트워킹을 하고 싶습니다.',
        },
        {
          question: '귀하의 비전은 무엇인가요?',
          answer: '새로운 프로젝트를 성공적으로 이끌고 싶습니다.',
        },
      ],
    },
    {
      id: 3,
      name: '이영희',
      avatar: '/images/club/example.jpg',
      job: '개발자',
      location: '서울',
      questions: [
        {
          question: '왜 개발자가 되었나요?',
          answer: '흥미로워서입니다.',
        },
      ],
    },
    {
      id: 4,
      name: '박철수',
      avatar: '/images/club/example.jpg',
      job: '디자이너',
      location: '뉴욕',
      questions: [
        {
          question: '좋아하는 디자인 스타일은 무엇인가요?',
          answer: '미니멀리즘입니다.',
        },
      ],
    },
    {
      id: 5,
      name: '홍길동',
      avatar: '/images/club/example.jpg',
      job: '영업',
      location: '런던',
      questions: [
        {
          question: '매출을 높이기 위해 무엇을 할 수 있나요?',
          answer: '새로운 고객을 확보할 수 있습니다.',
        },
      ],
    },
    {
      id: 6,
      name: '이순신',
      avatar: '/images/club/example.jpg',
      job: '경영자',
      location: '상하이',
      questions: [],
    },
  ];

  const [expandedApplicationId, setExpandedApplicationId] = useState<
    number | null
  >(null);

  const toggleApplication = (id: number) => {
    setExpandedApplicationId(expandedApplicationId === id ? null : id);
  };

  return (
    <div className="pt-[2.5rem] px-[1.25rem] relative">
      <ContentWrap>
        <div className="bg-blue-50 rounded-2xl p-[2.5rem] relative">
          {/* 관리 폼의 제목 */}
          <div className="flex mb-8">
            <button
              className="mr-[2.5rem] text-xl"
              onClick={() => window.history.back()}
            >
              &lt;
            </button>
            <div className="text-left">
              <h2 className="text-2xl font-bold mb-2 leading-none">
                소모임 이름
              </h2>
              <p className="leading-none font-medium">소모임 설명 </p>
            </div>
          </div>
          <div className="flex">
            {/* 멤버 리스트 */}
            <section className=" border-r border-gray-200 mr-8 pr-8 ">
              <div className="bg-white h-[35.375rem] px-[2rem] py-[1.5rem] rounded-2xl">
                <h2 className="text-xl font-semibold leading-none">
                  멤버 리스트
                </h2>
                <div className="relative w-[30rem] py-[1.5rem]">
                  <input
                    type="text"
                    className="w-full px-4 py-2 pr-10 rounded-full border border-gray-300 focus:outline-none focus:border-blue-300"
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                    <img
                      src="/svg/club/search.svg"
                      alt="Search Icon"
                      className="w-6 h-6 mr-1"
                    />
                  </div>
                </div>
                <ul className="space-y-2 overflow-y-auto h-[25rem]">
                  {members.map((member) => (
                    <li
                      key={member.id}
                      className="flex items-center justify-between p-4"
                    >
                      <div className="flex items-center">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-[3.75rem] h-[3.75rem] rounded-full mr-[1.25rem] border-[0.19rem]"
                        />
                        <div>
                          <h3 className="font-semibold">{member.name}</h3>
                          <p className="text-sm font-semibold">
                            {member.job} | {member.location}
                          </p>
                          <p className="text-sm text-gray-500">
                            마지막 활동일 {member.lastActivity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-main-blue w-[1.5rem] h-[1.5rem] rounded-full border-[0.09rem] border-black mr-2 flex items-center justify-center">
                          <img
                            src="/svg/club/crownIconLine.svg"
                            alt="Crown Icon"
                            className="w-4 h-4"
                          />
                        </div>
                        <img
                          src="/svg/club/trashIcon.svg"
                          alt="Trash Icon"
                          className="w-6 h-6"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
            {/* 신청서 관리 */}
            <section className="h-[35.376rem]">
              <div className="bg-white px-[2rem] py-[1.5rem] rounded-2xl h-[35.375rem]">
                <h2 className="text-xl font-semibold mb-[1.62rem] leading-none">
                  신청서 관리
                </h2>
                <div className="space-y-4 overflow-y-auto h-[30rem]">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="p-4 border rounded-lg w-[47.0625rem]"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img
                            src={application.avatar}
                            alt={application.name}
                            className="w-[3.75rem] h-[3.75rem] rounded-full mr-[1.25rem] border-[0.19rem]"
                          />
                          <div>
                            <h3 className="font-semibold">
                              {application.name}
                            </h3>
                            <p className="text-sm font-semibold">
                              {application.job} | {application.location}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button className="bg-blue-400 text-white w-[4.5rem] h-[2.125rem] rounded font-bold">
                            승인
                          </button>
                          <button className="bg-red-cancel text-white w-[4.5rem] h-[2.125rem] rounded font-bold">
                            거절
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="mt-[-1.3rem]"
                          onClick={() => toggleApplication(application.id)}
                        >
                          {expandedApplicationId === application.id ? (
                            ''
                          ) : (
                            <img
                              src="/svg/club/arrowDown.svg"
                              alt="Arrow Down"
                            />
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
                          {/* 닫기 버튼 */}
                          <div className="flex justify-center">
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
                </div>
              </div>
            </section>
          </div>
        </div>
      </ContentWrap>
    </div>
  );
}
