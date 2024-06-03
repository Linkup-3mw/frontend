'use client';

import { mapState } from '../../atom/search';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import FullPageLoader from './Loader/FullPageLoader';
import Image from 'next/image';

export default function CurrentLocationButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const map = useRecoilValue(mapState);

  const handleCurrentPosition = () => {
    setLoading(true);

    const options = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: Infinity,
    };

    if (navigator.geolocation && map) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = new window.kakao.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude,
          );

          if (currentPosition) {
            setLoading(false);
            map.panTo(currentPosition);
            alert('현재 위치로 이동되었습니다.');
          }

          return currentPosition;
        },
        () => {
          alert('현재 위치를 가져올 수 없습니다.');
          setLoading(false);
        },
        options,
      );
    }
  };

  return (
    <>
      {loading && <FullPageLoader />}

      <button
        type="button"
        onClick={handleCurrentPosition}
        className="fixed z-[10] w-[2.5rem] h-[2.5rem] p-2 shadow left-10 top-40 bg-white rounded-md hover:shadow-lg focus:shadow-lg hover:bg-blue-200"
      >
        <Image
          src="/svg/map/geolocation.svg"
          width={40}
          height={40}
          alt="현재위치 버튼"
        />
      </button>
    </>
  );
}
