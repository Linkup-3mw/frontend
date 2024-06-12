import { useRecoilState } from 'recoil';
import { modalState } from '@/app/(search)/atom/search';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import FullPageLoader from './FullPageLoader';
import { useRouter } from 'next/navigation';

export default function UpdateModal() {
  const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const closeModal = () => {
    setModal(false);
    router.push('/');
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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-red-800  bg-opacity-50">
          <FullPageLoader />
        </div>
      )}
      {!loading && modal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#E4EEFF] max-md:w-[20rem]  md:w-[46.75rem] h-[23.25rem] rounded-xl shadow-lg flex flex-col justify-center p-8">
            <div className="relative h-[8rem]">
              <p className="md:text-xl mb:text-sm font-semibold text-center mb-8">
                예약 수정이 완료되었습니다.
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
          </div>
        </div>
      )}
    </>
  );
}
