'use client';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  Rtab,
  selectedSeatAllState,
  selectedSpaceAllState,
} from '@/app/(search)/atom/office';
import FullPageLoader from '@/app/(search)/map/components/Loader/FullPageLoader';
import { loadingState, showMobileTableState } from '@/app/(search)/atom/media';
import AddSeatReservation from '../components/seat/AddSeatReservation';
import SeatInformation from '../../../[id]/components/SeatInfomation';
import AddSpaceReservation from '../components/space/AddSpaceReservation';
import OpenTableMobile from '../../../[id]/components/table/mobile/OpenTableMobile';

export default function Addtory() {
  const [loading, setLoading] = useRecoilState(loadingState);
  const [RTab, setRTab] = useRecoilState(Rtab);
  const showMobileTable = useRecoilValue(showMobileTableState);
  const selectedSeatAll = useRecoilValue(selectedSeatAllState);
  const selectedSpaceAll = useRecoilValue(selectedSpaceAllState);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // 예시로 1000ms(1초) 후에 loading 상태를 false로 변경
  }, [setLoading]); // useEffect 내에서 사용된 상태나 props가 없으므로 빈 배열을 전달합니다.

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

      <div className="flex justify-center">
        {!showMobileTable && (
          <div className="mt-[5rem] md:flex mx-4 w-[95rem] gap-4  ">
            <div className="md:flex md:w-[95rem] mb:w-full mx-auto  gap-4 flex flex-col bg-[#E4EEFF] md:px-8 mb:px-4 rounded-3xl pt-4 h-[51.25rem] overflow-y-scroll">
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

            <div>{!showMobileTable && <SeatInformation />}</div>
          </div>
        )}

        {showMobileTable && (
          <>
            <div className="flex justify-center items-center w-[100%]">
              <OpenTableMobile />
            </div>
          </>
        )}
      </div>
    </>
  );
}
