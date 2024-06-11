'use client';
import {
  Rtab,
  showImageState,
  selectedSeatAllState,
  selectedSpaceAllState,
  searchRemainingState,
} from '@/app/(search)/atom/office';
import Image from 'next/image';
import OpenTable from './table/OpenTable';
import { useRecoilState, useRecoilValue } from 'recoil';
import { SeatReservation, SpaceReservation } from '@/types/office/reservation';
import MettingRoom4 from './table/MettingRoom4';
import MeetingRoom8 from './table/MettingRoom8';
import SeminarRoom from './table/SeminarRoom';
import MonitorDesk from './table/MonitorDesk';
import OneRoom from './table/OneRoom';
import Studio from './table/Studio';
import FocusDesk from './table/FocusDesk';
import Reserved from './table/Reserved';
import OnlyEnter from './table/OnlyEnter';
import { mobileReservationLayoutState } from '@/app/(search)/atom/media';
import { useEffect, useState } from 'react';
import { userUpdateRlistPutState } from '@/app/(search)/atom/membership';

function ReservationTableStyleSeat({
  selectedSeatAll,
}: {
  selectedSeatAll: SeatReservation;
}) {
  if (selectedSeatAll && selectedSeatAll.type) {
    switch (selectedSeatAll.type) {
      case '오픈데스크':
        return <OpenTable />;
      case '포커스데스크':
        return <FocusDesk />;
      case '1인실':
        return <OneRoom />;
      case '모니터데스크':
        return <MonitorDesk />;
      case '지정좌석':
        return <Reserved />;
      case '기업 전용 지정 좌석':
        return <OnlyEnter />;
      default:
        return;
    }
  } else {
    return;
  }
}

function ReservationTableStyleSpace({
  selectedSpaceAll,
}: {
  selectedSpaceAll: SpaceReservation;
}) {
  if (selectedSpaceAll && selectedSpaceAll.type) {
    switch (selectedSpaceAll.type) {
      case '미팅룸(4인)':
        return <MettingRoom4 />;
      case '미팅룸(8인)':
        return <MeetingRoom8 />;
      case '컨퍼런스룸':
        return <SeminarRoom />;
      case '스튜디오':
        return <Studio />;
      default:
        return;
    }
  } else {
    return;
  }
}

export default function SeatInformation() {
  const selectedSeatAll = useRecoilValue(selectedSeatAllState);
  const selectedSpaceAll = useRecoilValue(selectedSpaceAllState);
  const [showImage, setShowImage] = useRecoilState(showImageState);
  const RTab = useRecoilValue(Rtab);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const [loading, setLoading] = useState(true);
  const seatReservationList = useRecoilValue(userUpdateRlistPutState);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 6000);
  });
  return (
    <>
      <div
        className={`relative md:w-[61.8125rem] ${
          isMobile ? '' : 'md:h-[51.25rem]'
        }`}
      >
        {showImage && (
          <div
            className=" md:w-[61.8126rem] mb:hidden md:block md:inset-0 z-0"
            style={{ objectFit: 'cover' }}
          >
            <Image
              src="/svg/reservation/imageView/default.svg"
              layout="fill"
              alt="오피스이미지"
            />
          </div>
        )}
        <div>
          {!loading && (
            <>
              {RTab === '좌석' && selectedSeatAll && (
                <ReservationTableStyleSeat selectedSeatAll={selectedSeatAll} />
              )}
              {RTab === '공간' && selectedSpaceAll && (
                <ReservationTableStyleSpace
                  selectedSpaceAll={selectedSpaceAll}
                />
              )}
              {/* {RTab === '공간' ||
                (selectedSpaceAll?.type && seatReservationList && (
                  <ReservationTableStyleSpace
                    selectedSpaceAll={selectedSpaceAll}
                  />
                ))} */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
