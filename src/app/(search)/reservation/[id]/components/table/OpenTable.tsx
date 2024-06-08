import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  seatListReservation,
  selectedSeatAllState,
  confirmedState,
  selectedSpaceAllState,
  searchRemainingState,
} from '@/app/(search)/atom/office';

import { currentBuildingState } from '@/app/(search)/atom/search';

export default function OpenTable() {
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);
  const [remaining, setSearchRemaining] = useRecoilState(searchRemainingState);
  const currentOffice = useRecoilValue(currentBuildingState);
  const id = currentOffice?.id;

  const handleSeatReady = () => {
    if (
      selectedSeatAll?.start_date &&
      selectedSeatAll?.end_date &&
      selectedSeatAll?.type &&
      selectedSeatAll?.code
    ) {
      if (seatList.length < 5) {
        setSeatList([...seatList, { ...selectedSeatAll }]);
        // setSelectedSeatAll({
        //   type: '',
        //   start_date: '',
        //   end_date: '',
        //   code: '',
        // });
        setConfirm(true);
      } else {
        return;
      }
    }
  };

  const handleSeatClick = (seatNumber: string) => {
    // 좌석 클릭
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('seatId', seatNumber);
    const url = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', url);
    setSelectedSeatAll((prev) => ({
      ...prev,
      code: seatNumber,
      start_date: prev?.start_date || ' ',
      end_date: prev?.end_date || '',
      type: prev?.type || '',
    }));
  };

  return (
    <>
      <div className="hidden-360 flex flex-col justify-end w-[61.8125rem] h-[51.25rem] relative overflow-hidden rounded-md">
        <div className="mb:h-[18.3125rem] md:w-[61.8126rem] md:h-[51.25rem] absolute inset-0">
          <Image
            src="/images/office/1.jpeg"
            layout="fill"
            objectFit="cover"
            alt="오피스이미지"
          />
        </div>

        <div className="relative flex gap-4 h-[19.375rem] bg-[#E4EEFF] p-8">
          <div className="flex flex-col gap-4 w-[44.5rem]">
            <p className="text-[1.25rem] font-semibold">좌석 선택</p>
            <div className="flex flex-wrap gap-2">
              {remaining.map((seat, i) => (
                <div key={i}>
                  <button
                    onClick={() => handleSeatClick(seat.id)}
                    className={`rounded-lg w-[4rem] h-[2.5rem] ${
                      seat.available === false
                        ? 'bg-gray-400 text-black'
                        : selectedSeatAll?.code === seat.code
                          ? 'bg-[#688AF2] text-white'
                          : 'bg-white'
                    }`}
                  >
                    {seat.code}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-start">
            <p className="text-[1.25rem] font-semibold">예약 정보</p>
            <div className="flex flex-col gap-2 justify-between p-4 bg-white w-[12.3125rem] h-[13rem] rounded-lg">
              <div>
                <p className="text-[0.75rem] text-gray-300">날짜</p>
                <div>{selectedSeatAll?.start_date}</div>
                <div className="flex gap-3">
                  <div className="pr-2 border-r-[0.1rem] border-gray-300">
                    <p className="text-[0.75rem] text-gray-300">공간유형</p>
                    <div>{selectedSeatAll?.type}</div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-[0.75rem]">공간번호</p>
                    <div>{selectedSeatAll?.code}</div>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSeatReady}
                className="rounded-xl text-white w-[10.3125rem] h-[2.5rem] bg-[#688AF2]"
              >
                확정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
