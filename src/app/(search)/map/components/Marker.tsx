import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentBuildingState, mapState } from '../../atom/search';
import { OfficeBuilding } from '@/types/office/office';
import { useCallback, useEffect } from 'react';

export default function Marker({
  officeBuildings,
}: {
  officeBuildings: OfficeBuilding[] | null;
}) {
  const map = useRecoilValue(mapState);
  const setCurrentBuilding = useSetRecoilState(currentBuildingState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      officeBuildings?.map((office) => {
        const customContent = `
          <div class="overlay">
            <div class="bg-white group absolute z-10 left-0 bottom-0 -translate-x-1/2 p-4 text-nowrap rounded-[0.25rem] border-black border-[2px] text-sm after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:w-[1.2625rem] after:h-[1.0625rem] after:bg-[url(/images/icons/tail.png)] after:bg-no-repeat after:bg-center after:bg-[length:100%]">
              <div class="flex gap-4 items-center">
                <p class="font-bold text-lg">${office.building.location}</p>
                <div class="bg-white text-black group-hover:block hidden items-center">
                  <div class="flex gap-1 items-center">
                    <Image src="svg/map/star.svg" width={18} height={18} alt="별점이미지" />
                    <b>${office.rating.avg_rating} (${office.rating.count})</b>
                  </div>
                </div>
              </div>
              <div class="group-hover:h-[5.5rem] group-hover:w-[11.875rem] group-hover:opacity-100 opacity-0 h-0 w-0 overflow-hidden flex flex-col gap-3 transition-all">
                <span>
                  <p class="text-xs">${office.building.traffic_info}</p>
                </span>
                <span class="flex gap-2 items-center text-gray-400">
                  <Image src="svg/map/cow.svg" width={18} height={18} alt="소이미지" />
                  <span>소모임 ${office.club_count} 개</span>
                </span>
                <button class="absolute bottom-4 right-5 font-bold w-[4rem] h-[2rem] bg-[#688AF2] rounded-xl text-white">
                  바로 예약
                </button>
              </div>
            </div>
          </div>`;

        const markerPosition = new window.kakao.maps.LatLng(
          office.building.latitude,
          office.building.longitude,
        );
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          clickable: true,
          zIndex: 100,
          content: customContent,
          xAnchor: 0.4,
          yAnchor: 1.7,
        });
        customOverlay.setMap(map);
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach((overlay) => {
          overlay.addEventListener('click', () => {
            alert('안녕');
            setCurrentBuilding(office);
          });
        });
      });
    }
  }, [map, officeBuildings, setCurrentBuilding]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map, officeBuildings]);

  return <></>;
}
