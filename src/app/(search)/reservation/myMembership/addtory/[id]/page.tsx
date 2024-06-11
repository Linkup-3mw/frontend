'use client';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Rtab } from '@/app/(search)/atom/office';
import FullPageLoader from '@/app/(search)/map/components/Loader/FullPageLoader';
import { loadingState } from '@/app/(search)/atom/media';
import AddSeatReservation from '../components/seat/AddSeatReservation';
import SeatInformation from '../../../[id]/components/SeatInfomation';
import AddSpaceReservation from '../components/space/AddSpaceReservation';

export default function Addtory() {
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  }, []);

  const [loading, setLoading] = useRecoilState(loadingState);
  const [RTab, setRTab] = useRecoilState(Rtab);

  const renderTabContent = () => {
    switch (RTab) {
      case '좌석':
        return <AddSeatReservation />;
      case '공간':
        return <AddSpaceReservation />;
      default:
        return null;
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}

      <div className="flex gap-6 h-[51.25rem] mt-[8rem] justify-center">
        <div className="flex flex-col bg-[#E4EEFF] md:px-8 md:w-[30.6875rem] mb:w-[90%] mb:px-4 overflow-y-scroll scrollbar-hide rounded-3xl pt-4 ">
          <div className="h-[48px] text-[20px] font-bold mt-3 cursor-pointer">
            <div className="flex justify-start items-center h-[48px] w-full mx-auto">
              <div className="flex space-x-4">
                <div
                  className={`h-[40px] text-center px-4 ${
                    RTab === '좌석'
                      ? 'leading-10 text-black border-b-2 border-gray-500'
                      : 'leading-10 text-gray-300'
                  }`}
                  onClick={() => setRTab('좌석')}
                >
                  좌석
                </div>
                <div
                  className={`h-[40px] text-center px-4 ${
                    RTab === '공간'
                      ? 'leading-10 text-black border-b-2 border-gray-500'
                      : 'leading-10 text-gray-300'
                  }`}
                  onClick={() => setRTab('공간')}
                >
                  공간
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">{renderTabContent()}</div>
        </div>
        <SeatInformation />
      </div>
    </>
  );
}
