'use client';
import Modal from '@/app/community/components/club/common/Modal';
import API from '@/utils/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ClubRequestPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [clubData, setClubData] = useState<{
    club_id: number;
    club_title: string;
    club_introduction: string;
    club_detail_introduction: string;
    question: string[];
  } | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (clubData) {
      try {
        const response = await API.post(
          `/club/${clubData.club_id}/application`,
          {
            introduction: `${clubData.club_introduction}`,
            club_answers: answers.map((answer, index) => ({
              answer,
              qorders: index + 1,
            })),
          },
        );

        if (response.status === 200) {
          setSubmitted(true);
          setIsModalOpen(true);
        }
      } catch (error) {
        console.error('Error submitting application:', error);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push('/community/club');
  };

  useEffect(() => {
    const fetchClubData = async () => {
      const currentPath = window.location.pathname;
      const id = currentPath.split('/').pop();
      try {
        const response = await API.get(`/club/${id}/question`);
        setClubData(response.data.data);
        setAnswers(new Array(response.data.data.question.length).fill(''));
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, []);

  return (
    <div className="flex items-center justify-center">
      {submitted ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          clubName={clubData?.club_title || '소모임 이름'}
          shortDescription={clubData?.club_introduction || ''}
          message="가입 신청이 완료 되었습니다!"
          subMessage="승인 결과를 기다려주세요."
          buttonText="확인"
        />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center h-screen mt-4">
          <div className="bg-blue-50 md:px-[2.5rem] px-4 md:pb-[2.5rem] pb-4 rounded-2xl shadow-lg md:w-[62.875rem] w-[20rem] mx-auto">
            <div className="flex items-center font-semibold md:border-b md:border-gray-300 py-[2rem]">
              <h2 className="flex-1 text-center md:text-[1.5rem] text-[1rem] font-bold leading-none">
                소모임 가입 신청
              </h2>
            </div>
            {/* 소모임 정보 */}
            <div className="md:pt-8 pt-2">
              <h3 className=" md:text-[1.5rem] text-[1rem] font-bold mb-2 leading-none">
                {clubData?.club_title}
              </h3>
              <p className="mb-4 font-medium md:text-sm text-xs">
                {clubData?.club_detail_introduction}
              </p>
              <p className=" md:text-[1.25rem] text-xs font-bold my-4">
                신청서 작성 전에 상세 소개를 꼭 읽어주세요!😚
              </p>
              {/* 질문과 답변 입력 */}
              <form onSubmit={handleSubmit} className="pb-2 md:pb-4">
                {clubData?.question.map((question, index) => (
                  <div key={index} className="md:mb-6 mb-4">
                    <label
                      htmlFor={`question${index + 1}`}
                      className="block font-semibold mb-2 md:text-sm text-xs"
                    >
                      {question}:
                    </label>
                    <textarea
                      placeholder="답변을 입력해주세요."
                      id={`question${index + 1}`}
                      name={`question${index + 1}`}
                      className="w-full h-[3.5rem] p-2 border border-gray-300 rounded-md outline-none md:text-sm text-xs"
                      rows={3}
                      maxLength={300}
                      required
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = [...answers];
                        newAnswers[index] = e.target.value;
                        setAnswers(newAnswers);
                      }}
                    />
                  </div>
                ))}
                <button
                  type="submit"
                  className="bg-blue-400 text-white py-2 rounded-lg w-full md:h-[3.875rem] h-[2.75rem] md:text-[1.5rem] text-[1rem]"
                >
                  제출하기
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
