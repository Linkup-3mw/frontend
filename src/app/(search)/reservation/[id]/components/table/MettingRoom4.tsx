import Image from 'next/image';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  selectedSpaceAllState,
  confirmedState,
  spaceListReservation,
  seatListReservation,
  searchRemainingState,
} from '@/app/(search)/atom/office';
import { currentBuildingState } from '@/app/(search)/atom/search';

export default function MeetingRoom4() {
  const [selectedSpaceAll, setSelectedSpaceAll] = useRecoilState(
    selectedSpaceAllState,
  );
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [spaceList, setSpaceList] = useRecoilState(spaceListReservation);
  const [remaining, setSearchRemaining] = useRecoilState(searchRemainingState);
  const currentOffice = useRecoilValue(currentBuildingState);
  const id = currentOffice?.id;

  const amTime = ['08:00', '09:00', '09:30', '10:30'];
  const pmTime = ['12:00', '12:30', '01:00', '01:30'];
  console.log('remaining@@@@', remaining);
  // console.log(selectedSpaceAll);
  // useEffect(() => {
  //   const fetchSpaceData = async () => {
  //     try {
  //       const res = await API.get(
  //         `reservation/${id}?type=${selectedSpaceAll?.type}&start=${selectedSpaceAll?.start_date}&end=${selectedSpaceAll?.end_date}`,
  //       );
  //       setSearchRemaining(res.data.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchSpaceData();
  // });

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
        });
        setConfirm(true);
      } else {
        return;
      }
    }
  };

  const handleSpaceClick = (spaceNumber: string) => {
    // const searchParams = new URLSearchParams(window.location.search);
    // searchParams.set('spaceId', spaceNumber);
    // const url = `${window.location.pathname}?${searchParams.toString()}`;
    // window.history.pushState(null, '', url);
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

  return (
    <>
      <div className="hidden-360 flex flex-col relative w-[61.8125rem] h-[51.25rem] rounded-md justify-end">
        <div className="absolute inset-0">
          <Image
            src="/images/office/2.jpeg"
            layout="fill"
            objectFit="cover"
            alt="오피스이미지"
          />
        </div>
        <div className="relative flex gap-4 h-[19.35rem] bottom-0 bg-[#E4EEFF] p-8 ">
          <div className="flex flex-col gap-6 w-[44.5rem] overflow-y-scroll scrollbar-hide">
            <p className="text-[1.25rem] font-bold leading-7">
              공간을 선택하세요
            </p>
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
            <div className="flex flex-col gap-6">
              <p className="text-[1.25rem] font-bold leading-7">
                이용 시간을 선택하세요.
              </p>
              <div className="flex flex-col gap-4">
                <p className="font-bold leading-[1.375rem]">오전</p>
                <div className="flex flex-wrap gap-2">
                  {amTime.map((am) => (
                    <button
                      key={am}
                      onClick={() => handleSpaceTimeClick(am)}
                      className={`rounded-lg w-[4rem] h-[2.5rem] ${
                        remaining.map((item) => item.toString()).includes(am)
                          ? 'bg-gray-500 text-white'
                          : selectedSpaceAll?.start_time === am ||
                              selectedSpaceAll?.end_time === am
                            ? 'bg-[#688AF2] text-white'
                            : 'bg-white'
                      }`}
                      disabled={remaining
                        .map((item) => item.toString())
                        .includes(am)}
                    >
                      {am}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <p className="font-bold leading-[1.375rem]">오후</p>
                <div className="flex flex-wrap gap-2">
                  {pmTime.map((pm) => (
                    <button
                      key={pm}
                      onClick={() => handleSpaceTimeClick(pm)}
                      className={`rounded-lg w-[4rem] h-[2.5rem] ${
                        remaining.some((item) => item.toString() === pm)
                          ? 'bg-gray-500 text-white'
                          : selectedSpaceAll?.start_time === pm ||
                              selectedSpaceAll?.end_time === pm
                            ? 'bg-[#688AF2] text-white'
                            : 'bg-white'
                      }`}
                      disabled={remaining.some(
                        (item) => item.toString() === pm,
                      )}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-start">
            <p className="text-[1.25rem] font-semibold">예약 정보</p>
            <div className="flex flex-col gap-2 justify-between p-4 bg-white w-[12.3125rem] h-[13rem] rounded-lg">
              <div>
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
