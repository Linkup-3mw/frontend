import { modalState } from '@/app/(search)/atom/search';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import FullPageLoader from './FullPageLoader';
import Image from 'next/image';
import Link from 'next/link';
import {
  confirmModalState,
  yesOrNoState,
} from '@/app/(search)/atom/membership';

export default function ConfirmModal() {
  const [confirmModal, setConfirmModal] = useRecoilState(confirmModalState);
  const [loading, setLoading] = useState(true);
  const [yesOrNo, setYesOrNo] = useRecoilState(yesOrNoState);
  const closeModal = () => {
    setConfirmModal(false);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <FullPageLoader />
        </div>
      )}
      {!loading && confirmModal && (
        <div className="z-[2000] fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#E4EEFF] max-md:w-[20rem]  md:w-[46.75rem] h-[23.25rem] rounded-xl shadow-lg flex flex-col justify-center p-8">
            <div className="relative h-[8rem]">
              <p className="md:text-xl mb:text-sm font-semibold text-center mb-8">
                정말 예약을 수정하시겠습니까?
              </p>
              <Image
                className="cursor-pointer absolute top-0 right-2"
                onClick={closeModal}
                src="/svg/reservation/cancel.svg"
                width={18}
                height={18}
                alt="취소"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                onClick={() => {
                  setYesOrNo(true);
                  setConfirmModal(false);
                }}
                className="bg-[#688AF2] text-center  text-white px-6 py-3 rounded-md transition-colors duration-300 hover:bg-red-500"
              >
                네
              </button>
              <button
                onClick={() => {
                  setYesOrNo(false);
                  setConfirmModal(false);
                }}
                className="bg-[#688AF2] text-center  text-white px-6 py-3 rounded-md transition-colors duration-300 hover:bg-red-500"
              >
                아니요
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
