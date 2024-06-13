import { modalState } from '@/app/(search)/atom/search';
import FullPageLoader from '@/app/(search)/map/components/Loader/FullPageLoader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
export function ReservationDelete() {
  const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setModal(false);
    router.push('/');
  };
  useEffect(() => {
    const waiting = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(waiting);
  }, []);
  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <FullPageLoader />
        </div>
      )}
      {!loading && modal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#E4EEFF] max-md:w-[20rem]  md:w-[46.75rem] h-[23.25rem] rounded-xl shadow-lg flex flex-col justify-center p-8">
            <div className="relative h-[8rem]">
              <p className="md:text-xl mb:text-sm font-semibold text-center mb-8">
                예약이 삭제되었습니다.
              </p>
            </div>

            <div onClick={closeModal} className="flex flex-col space-y-4 ">
              <Link
                className="bg-[#688AF2] text-center  text-white px-6 py-3 rounded-md transition-colors duration-300"
                href="main"
              >
                <button>홈으로</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default function ReservationSuccess() {
  const [modal, setModal] = useRecoilState(modalState);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const closeModal = () => {
    setModal(false);
    router.push('/');
  };
  useEffect(() => {
    const waiting = setTimeout(() => {
      setLoading(false);
    }, 4000);
    return () => clearTimeout(waiting);
  }, []);

  return (
    <>
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-30">
          <FullPageLoader />
        </div>
      )}
      {!loading && modal && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-[#E4EEFF] max-md:w-[20rem]  md:w-[46.75rem] h-[23.25rem] rounded-xl shadow-lg flex flex-col justify-center p-8">
            <div className="relative h-[8rem]">
              <p className="md:text-xl mb:text-sm font-semibold text-center mb-8">
                예약이 완료되었습니다.
              </p>
            </div>

            <div onClick={closeModal} className="flex flex-col space-y-4 ">
              <Link
                className="bg-[#688AF2] text-center  text-white px-6 py-3 rounded-md transition-colors duration-300"
                href="main"
              >
                <button>홈으로</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
