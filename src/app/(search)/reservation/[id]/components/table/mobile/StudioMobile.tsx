import Image from 'next/image';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  selectedSpaceAllState,
  confirmedState,
  spaceListReservation,
} from '@/app/(search)/atom/office';
import { showMobileTableState } from '@/app/(search)/atom/media';
import { useState } from 'react';

export default function StudioMobile() {
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [isUp, setIsUp] = useState(false);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const amTime = ['08:00', '09:00', '09:30', '10:30'];
  const pmTime = ['12:00', '12:30', '01:00', '01:30'];
  const setMobileTable = useSetRecoilState(showMobileTableState);

  const handleSpaceReady = () => {
    if (
      selectedSpaceAll?.start_date &&
      selectedSpaceAll?.type &&
      selectedSpaceAll?.code &&
      selectedSpaceAll.start_time &&
      selectedSpaceAll.end_time
    ) {
      if (spaceList.length < 3) {
        setSpaceList([...spaceList, { ...selectedSpaceAll }]);
        setSelectedSpaceAll({
          type: '',
          start_date: '',
          end_date: '',
          code: '',
          start_time: '',
          end_time: '',
        });
        setConfirm(true);
        setMobileTable(false);
      } else {
        return;
      }
    }
  };

  const handleSpaceClick = (spaceNumber: string) => {
    setSelectedSpaceAll((prev) => ({
      ...prev,
      code: spaceNumber,
      start_date: prev?.start_date || '',
      end_date: prev?.end_date || '',
      type: prev?.type || '',
    }));
    setSelectedSpaceAll((prev) => ({
      ...prev,
    }));
  };
  const handleSpaceTimeClick = (time: string) => {
    if (selectedSpaceAll?.start_time) {
      setSelectedSpaceAll((prev) => ({
        ...prev,
        end_time: time,
      }));
    } else {
      setSelectedSpaceAll((prev) => ({
        ...prev,
        start_time: time,
      }));
    }
  };
  const toggleUp = () => {
    setIsUp((prev) => !prev);
  };

  return (
    <>
      <div className="hidden-desk w-full  mx-auto">
        <Image
          layout="responsive"
          src="/svg/reservation/imageView/mobile/studioMobile.svg"
          height={290}
          width={360}
          alt="요미"
        />
        <div>
          <div
            onClick={toggleUp}
            className={`overflow-y-scroll scrollbar-hide flex flex-col items-center  pt-3 rounded-t-3xl  bg-[#E4EEFF] w-ful transition-transform duration-1000 ${
              isUp ? 'translate-y-[-120px]' : ''
            }`}
            style={{ height: isUp ? '42.25rem' : '42.25rem' }}
          >
            <div className="">
              <button
                className="z-10 w-[2rem] h-[0.25rem] bg-[#BFD4FF]"
                onClick={toggleUp}
              ></button>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-[0.875rem] leading-5 font-bold">
                공간을 선택하세요
              </p>
              <div className="flex flex-wrap w-[20.5rem] gap-2">
                {Array.from({ length: 30 }, (area, i) => i + 1).map(
                  (area, i) => {
                    const spaceNumber = `I-${String(area).padStart(2, '0')}`;
                    return (
                      <div key={i}>
                        <button
                          onClick={() => handleSpaceClick(spaceNumber)}
                          className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                            selectedSpaceAll?.code === spaceNumber
                              ? 'bg-[#688AF2] text-white'
                              : 'bg-white'
                          }`}
                        >
                          {spaceNumber}
                        </button>
                      </div>
                    );
                  },
                )}
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-[0.875rem] leading-5 font-bold">
                  이용시간을 선택하세요
                </p>{' '}
                <p className="font-bold text-[0.75rem] leading-[1.125rem]">
                  오전
                </p>
                <div className="flex flex-wrap w-[20.5rem] gap-2">
                  <div className="flex flex-wrap gap-2">
                    {amTime.map((am) => (
                      <button
                        key={am}
                        onClick={() => {
                          handleSpaceTimeClick(am);
                        }}
                        className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                          selectedSpaceAll?.start_time === am ||
                          selectedSpaceAll?.end_time === am
                            ? 'bg-[#688AF2] text-white'
                            : 'bg-white'
                        }`}
                      >
                        {am}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p className="font-bold text-[0.75rem] leading-[1.125rem]">
                    오후
                  </p>
                  <div className="flex flex-wrap gap-2 ">
                    {pmTime.map((pm) => (
                      <button
                        key={pm}
                        onClick={() => {
                          handleSpaceTimeClick(pm);
                        }}
                        className={`rounded-lg w-[3rem] h-[2rem] text-xs ${
                          selectedSpaceAll?.start_time === pm ||
                          selectedSpaceAll?.end_time === pm
                            ? 'bg-[#688AF2] text-white'
                            : 'bg-white'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[0.875rem] leading-5 font-bold">예약 정보</p>
              <div className="flex flex-col justify-between items-center mb-10 bg-white w-[20.5rem] h-[9.375rem] rounded-lg p-4">
                <div className="w-[18.5rem] h-[3.875rem]">
                  <div className="flex gap-3 items-center">
                    <p className="text-xs text-gray-400">날짜</p>
                    <p>{selectedSpaceAll?.start_date}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex gap-2 items-center">
                      <p className="text-xs text-gray-400">좌석 유형</p>
                      <p>{selectedSpaceAll?.type}</p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <p className="text-xs text-gray-400">좌석 번호</p>
                      <p>{selectedSpaceAll?.code}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center">
                    <p className="text-xs text-gray-400">이용 시간</p>
                    <p>
                      {selectedSpaceAll?.start_time} -
                      {selectedSpaceAll?.end_time}
                    </p>
                  </div>
                </div>
                {selectedSpaceAll?.start_date &&
                selectedSpaceAll?.type &&
                selectedSpaceAll?.code &&
                selectedSpaceAll?.start_time &&
                selectedSpaceAll.end_time ? (
                  <button
                    className="w-[5.75rem] h-[2.5rem] bg-[#688AF2] rounded-lg text-white"
                    onClick={handleSpaceReady}
                  >
                    확정
                  </button>
                ) : (
                  <button
                    className="w-[5.75rem] h-[2.5rem] bg-[#A3A3AF] rounded-lg text-white"
                    onClick={handleSpaceReady}
                  >
                    확정
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
