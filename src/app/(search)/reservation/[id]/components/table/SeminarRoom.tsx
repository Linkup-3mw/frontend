import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedSpaceAllState,
  confirmedState,
  spaceListReservation,
  searchRemainingState,
} from '@/app/(search)/atom/office';
import { useEffect, useState } from 'react';
import { loadingState } from '@/app/(search)/atom/media';
import TimeSkeleton from '../skeleton/TimeSkeleton';

export default function SeminarRoom() {
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [remaining, setSearchRemaining] = useRecoilState(searchRemainingState);
  const [click, setClick] = useState('');
  const [loading, setLoading] = useRecoilState(loadingState);
  const [isExpanded, setIsExpanded] = useState(true);
  const [amTime, setAmTime] = useState([
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
  ]);
  const pmTime = [
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
    '20:30',
    '21:00',
    '21:30',
  ];
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [setLoading]);

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
      } else {
        return;
      }
    }
  };

  const handleSpaceClick = (spaceCode: string) => {
    setSelectedSpaceAll((prev) => ({
      ...prev,
      code: spaceCode,
    }));
    setClick(spaceCode);
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
  const renderTime = remaining.filter((item) => item.id === click);
  return (
    <>
      <div className="hidden-360 flex flex-col relative w-[61.8125rem] h-[51.25rem] overflow-hidden rounded-md justify-end">
        <div className="absolute inset-0">
          <Image
            src="/svg/reservation/imageView/seminarRoom.svg"
            layout="fill"
            objectFit="cover"
            alt="오피스이미지"
          />
        </div>
        <div
          onClick={handleClick}
          className="absolute bottom-0 shadow-2xl left-[50%] transform -translate-y-1/2 bg-[#688AF2] text-gray-500 rounded-[50%] p-4 z-10"
        >
          {isExpanded ? (
            <Image
              src="/svg/map/arrow.svg"
              width={20}
              height={20}
              alt="업 아이콘"
            />
          ) : (
            <Image
              className="rotate-180"
              src="/svg/map/arrow.svg"
              width={20}
              height={20}
              alt="업 아이콘"
            />
          )}
        </div>
        <div
          className={`relative flex gap-4 h-[19.375rem] bg-[#E4EEFF] p-8 transition-transform duration-500 transform rounded-xl shadow-xl ${
            isExpanded ? '-translate-y-[-5px]' : 'translate-y-[70%]'
          }`}
        >
          <div className="flex flex-col gap-4 w-[44.5rem] overflow-y-scroll scrollbar-hide">
            <p className="text-[1.25rem] font-semibold">공간을 선택하세요</p>
            <div className="flex flex-wrap gap-2">
              {remaining.map((space, i) => (
                <div key={i}>
                  <button
                    onClick={() => handleSpaceClick(space.id)}
                    className={`rounded-lg w-[4rem] h-[2.5rem] ${
                      space.available === false
                        ? 'bg-gray-400 text-black'
                        : selectedSpaceAll?.code === space.code
                          ? 'bg-[#688AF2] text-white'
                          : 'bg-white'
                    }`}
                  >
                    {space.code}
                  </button>
                </div>
              ))}
            </div>
            {click && (
              <div className="flex flex-col gap-6">
                <p className="text-[1.25rem] font-bold leading-7">
                  이용 시간을 선택하세요.
                </p>
                <div className="flex flex-col gap-4">
                  <p className="font-bold leading-[1.375rem]">오전</p>
                  <div className="flex flex-wrap gap-2">
                    {loading ? (
                      amTime.map((item, index) => (
                        <div key={index}>
                          <TimeSkeleton />
                        </div>
                      ))
                    ) : (
                      <>
                        {amTime.map((am, idx) => {
                          const isAvailable = renderTime.some((item) =>
                            item.am.includes(am),
                          );
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSpaceTimeClick(am)}
                              className={`rounded-lg w-[4rem] h-[2.5rem] ${
                                isAvailable
                                  ? 'bg-white text-black'
                                  : 'bg-gray-500 text-white'
                              }`}
                              disabled={!isAvailable}
                            >
                              {am}
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <p className="font-bold leading-[1.375rem]">오후</p>
                  <div className="flex flex-wrap gap-2 ">
                    {loading ? (
                      pmTime.map((item, index) => (
                        <div key={index}>
                          <TimeSkeleton />
                        </div>
                      ))
                    ) : (
                      <>
                        {pmTime.map((pm, idx) => {
                          const isAvailable = renderTime.some((item) =>
                            item.am.includes(pm),
                          );
                          return (
                            <button
                              key={idx}
                              onClick={() => handleSpaceTimeClick(pm)}
                              className={`rounded-lg w-[4rem] h-[2.5rem] ${
                                isAvailable
                                  ? 'bg-white text-black'
                                  : 'bg-gray-500 text-white'
                              }`}
                              disabled={!isAvailable}
                            >
                              {pm}
                            </button>
                          );
                        })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-[1.25rem] font-semibold">예약 정보</p>
            <div className="flex flex-col gap-2 justify-between p-4 bg-white w-[12.3125rem] h-[13rem] rounded-lg">
              <div>
                <p className="text-[0.75rem] text-gray-300">날짜</p>
                <div>{selectedSpaceAll?.start_date}</div>
                <div className="flex gap-3">
                  <div className="pr-2 border-r-[0.1rem] border-gray-300">
                    <p className="text-[0.75rem] text-gray-300">공간유형</p>
                    <div>{selectedSpaceAll?.type}</div>
                  </div>
                  <div>
                    <p className="text-gray-300 text-[0.75rem]">공간번호</p>
                    <div>{selectedSpaceAll?.code}</div>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-gray-300 text-[0.75rem]"> 예약 시간</p>
                <p>
                  {selectedSpaceAll?.start_time} ~ {selectedSpaceAll?.end_time}
                </p>
              </div>

              <button
                onClick={handleSpaceReady}
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
