import {
  loadingState,
  mobileReservationLayoutState,
  showMobileTableState,
} from '@/app/(search)/atom/media';
import {
  rsInfoState,
  selectedMembershipId,
  selectedOfficeId,
  userUpdateRlistPutState,
} from '@/app/(search)/atom/membership';
import {
  confirmedState,
  searchRemainingState,
  seatListReservation,
  selectedSeatAllState,
} from '@/app/(search)/atom/office';
import { modalState } from '@/app/(search)/atom/search';
import UpdateModal from '@/app/(search)/map/components/Loader/UpdateModal';
import API from '@/utils/axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

export default function SeatReservationList({
  seatTypes,
}: {
  seatTypes: string[];
}) {
  const [rsInfo, setRsInfo] = useRecoilState(rsInfoState);
  const [searchRemaining, setSearchRemaining] =
    useRecoilState(searchRemainingState);
  const MemberId = useRecoilValue(selectedMembershipId);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [selectedSeatAll, setSelectedSeatAll] =
    useRecoilState(selectedSeatAllState);
  const officeId = useRecoilValue(selectedOfficeId);
  const [showModal, setShowModal] = useState(false);
  const [confirm, setConfirm] = useRecoilState(confirmedState);
  const [showMobileTable, setShowMobileTable] =
    useRecoilState(showMobileTableState);

  const seatImages: Record<string, string> = {
    오픈데스크: '/svg/reservation/opendesk.svg',
    포커스데스크: '/svg/reservation/focusdesk.svg',
    '1인실': '/svg/reservation/oneroom.svg',
    모니터데스크: '/svg/reservation/monitordesk.svg',
  };
  const [seatReservationList, setSeatReservationList] = useRecoilState(
    userUpdateRlistPutState,
  );

  const handleSeatStyleClick = async (seatStyle: string) => {
    setSeatReservationList(true);

    const fetchSeatReservationListData = async () => {
      try {
        const res = await API.get(
          `reservation/${officeId}?type=${seatStyle}&start=${rsInfo?.start_date}&end=${rsInfo?.end_date}`,
        );

        setSearchRemaining(res.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    setSelectedSeatAll((prev) => ({
      ...prev,
      type: seatStyle,
      start_date: rsInfo?.start_date,
      end_date: rsInfo?.end_date,
    }));
    fetchSeatReservationListData();
  };
  //수정 요청
  const removeReservation = () => {
    setSelectedSeatAll(null);
  };
  const fetchSeatReservationUpdate = async () => {
    const updateMembership = {
      type: rsInfo?.type,
      start_date: rsInfo?.start_date,
      start_time: rsInfo?.start_time,
      end_time: rsInfo?.end_time,
      end_date: rsInfo?.end_date,
      prise: null,
      seat_id: selectedSeatAll?.code,
    };

    try {
      const res = await API.put(
        `reservation/individual/my-membership/${MemberId}/reservation/${rsInfo?.id}`,
        updateMembership,
      );
      setSearchRemaining(res.data.data);
    } catch (error) {
      console.error('Error updating seat reservation:', error);
    } finally {
      setShowModal(true);
    }
    setConfirm(false);
  };

  return (
    <div>
      <div className="h-48px text-20px font-bold mt-3 text-gray-300 cursor-pointer">
        <div className="flex flex-col gap-4 justify-start h-48px w-full mx-auto">
          <p className="text-xl font-bold text-black">자율 좌석 변경</p>

          <p className="text-lg font-bold text-black">
            기존 예약 정보를 확인하세요.
          </p>
          <div className="bg-white w-full h-auto mb-4 rounded-lg cursor-pointer">
            <div className="p-4 flex justify-start">
              <div className="flex flex-col pr-4 border-r-2">
                <div className="text-black font-normal">
                  {rsInfo?.seat_type}
                </div>
                <div className="font-bold text-lg text-black">
                  {rsInfo?.seat_code}
                </div>
              </div>
              <div className="text-black font-normal pl-4">
                {rsInfo?.start_date}
              </div>
            </div>
          </div>
          <p className="text-lg font-bold text-black">
            좌석 유형을 선택하세요.
          </p>
          <div className="flex flex-col mb-4 justify-between">
            <div className="flex w-full">
              {seatTypes.map((seatStyle) => (
                <div
                  key={seatStyle}
                  onClick={() => handleSeatStyleClick(seatStyle)}
                  className={`mb:w-full mr-2 mb:h-auto md:w-[6.29688rem] md:h-[7.75rem] flex flex-col justify-center items-center p-2 gap-2 rounded-lg ${
                    seatStyle === selectedSeatAll?.type
                      ? 'bg-blue-400 text-white'
                      : 'bg-white'
                  }`}
                >
                  <Image
                    width={`${isMobile ? 44 : 64}`}
                    height={`${isMobile ? 44 : 64}`}
                    alt={`${seatStyle}`}
                    src={seatImages[seatStyle]}
                  />
                  <p className="md:text-sm mb:text-[0.525rem] mb:font-bold">
                    {seatStyle}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="btn-hidden w-full text-center my-4 hidden-desk">
            <button
              onClick={() => setShowMobileTable(true)}
              className={`w-[5.5rem] h-[2.5rem] text-white rounded-lg leading-[1.375rem]
            ${selectedSeatAll?.type ? ' bg-blue-400' : ' bg-gray-400'}`}
            >
              좌석 선택
            </button>
          </div>
          {selectedSeatAll && (
            <div className="flex flex-col gap-4">
              <p className="text-md font-bold text-black">
                수정하신 예약 정보를 확인해주세요.
              </p>
              <div className="w-full flex flex-col gap-5 bg-white rounded-xl">
                <div className=" md:w-[26.6875rem] mb:h-[4.1875rem] md:h-[5.625rem] bg-white text-lg rounded-xl p-1 pl-2 mb-2">
                  <div className="text-black flex mb:gap-1 md:gap-2 mb:p-2 md:p-4 justify-start">
                    <div className="w-1/3  border-gray-200 border-r">
                      <p className="mb:text-[0.75rem] md:text-[1.1rem] md:leading-7 mb:leading-5">
                        {selectedSeatAll?.type}
                      </p>
                      <p className=" md:text-[1.25rem] font-bold ">
                        {selectedSeatAll?.code}
                      </p>
                    </div>
                    <div className="w-2/3 flex justify-between">
                      <div className="pl-4 md:text-lg mb:text-xs  mb:leading-5 md:leading-7">
                        <p>{selectedSeatAll?.start_date} ~ </p>
                        {/* <p> {selectedSeatAll?.end_date}</p> */}
                      </div>
                      {!isMobile ? (
                        <div className="">
                          <button
                            className="rounded-lg w-[4.625rem] h-[2rem] text-sm text-white font-semibold bg-[#FF4163]"
                            onClick={() => removeReservation()}
                          >
                            선택 취소
                          </button>
                        </div>
                      ) : (
                        <button
                          className="rounded-lg w-[1.75rem] h-[1.75rem] text-sm text-white font-semibold bg-[#FF4163]"
                          onClick={() => removeReservation()}
                        >
                          X
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div
                onClick={() => fetchSeatReservationUpdate()}
                className="w-full text-center my-4"
              >
                <button className="w-[5.5rem] h-[2.5rem] bg-blue-400 text-white rounded-lg leading-[1.375rem]">
                  수정 하기
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && <UpdateModal />}
    </div>
  );
}
