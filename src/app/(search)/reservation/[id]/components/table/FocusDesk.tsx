import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  seatListReservation,
  selectedSeatAllState,
  confirmedState,
  infoMsgState,
} from '@/app/(search)/atom/office';
import { useMobileLayout } from '@/app/(search)/map/hooks/mobile/useMobileLayout';
import {
  minDeskLayoutState,
  mobileReservationLayoutState,
} from '@/app/(search)/atom/media';

export default function FocusDesk() {
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [seatList, setSeatList] = useRecoilState(seatListReservation);

  useMobileLayout();

  const handleSeatReady = () => {
    if (
      selectedSeatAll?.start_date &&
      selectedSeatAll?.type &&
      selectedSeatAll?.code
    ) {
      if (seatList.length < 5) {
        setSeatList([...seatList, { ...selectedSeatAll }]);
        setSelectedSeatAll({
          type: '',
          start_date: '',
          end_date: '',
          code: '',
        });
        setConfirm(true);
      } else {
        return;
      }
    }
  };

  const handleSeatClick = (seatNumber: string) => {
    setSelectedSeatAll((prev) => ({
      ...prev,
      code: seatNumber,
      start_date: prev?.start_date || '',
      end_date: prev?.end_date || '',
      type: prev?.type || '',
    }));
  };
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const minDesk = useRecoilValue(minDeskLayoutState);
  return (
    <>
      {!isMobile && !minDesk ? (
        <div className="flex flex-col justify-end w-[61.8125rem] h-[51.25rem] relative overflow-hidden rounded-md">
          <div className="absolute inset-0">
            <Image
              src="/images/office/1.jpeg"
              layout="fill"
              objectFit="cover"
              alt="오피스이미지"
            />
          </div>

          <div className="relative flex  gap-4 h-[19.375rem]  bg-[#E4EEFF] p-8">
            <div className="flex flex-col gap-4 w-[44.5rem]">
              <p className="text-[1.25rem] font-semibold">좌석 선택</p>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 30 }, (area, i) => i + 1).map(
                  (area, i) => {
                    const seatNumber = `B-${String(area).padStart(2, '0')}`;
                    return (
                      <div key={i}>
                        <button
                          onClick={() => handleSeatClick(seatNumber)}
                          className={`rounded-lg w-[4rem] h-[2.5rem] ${
                            selectedSeatAll?.code === seatNumber
                              ? 'bg-[#688AF2] text-white'
                              : 'bg-white'
                          }`}
                        >
                          {seatNumber}
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 justify-start">
              <p className="text-[1.25rem] font-semibold">예약 정보</p>
              <div className="flex flex-col gap-2 justify-between p-4 bg-white w-[12.3125rem] h-[13rem] rounded-lg">
                <div>
                  <p className="text-[0.75rem] text-gray-300">날짜</p>
                  {selectedSeatAll?.start_date}
                  <div className="flex gap-3">
                    <div className="pr-2 border-r-[0.1rem] border-gray-300">
                      <p className="text-[0.75rem] text-gray-300">좌석유형</p>
                      <p className="">{selectedSeatAll?.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-[0.75rem]">좌석번호</p>
                      <p>{selectedSeatAll?.code}</p>
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
      ) : null}
    </>
  );
}
