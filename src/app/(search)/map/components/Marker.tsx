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

  const buildingOverlayContent = officeBuildings?.map((office) => ({
    buildingId: office.building.id,
    location: office.building.location,
    traffic: office.building.traffic_info,
    review_count: office.reviews ? office.reviews.review_count : 0,
    avg_rating: office.reviews ? office.reviews.avg_rating : 0,
    club_count: office.clubs ? office.clubs.length : 0,
    latitude: office.building.latitude,
    longitude: office.building.longitude,
  }));

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      buildingOverlayContent?.forEach((office) => {
        const customContent = `
            <div id=${office.buildingId} class="overlay bg-white group absolute z-10 left-0 bottom-0 -translate-x-1/2 p-4 box-border text-nowrap rounded-[0.25rem] border-black border-[2px] text-sm after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:w-[1.2625rem] after:h-[1.0625rem] after:bg-[url(/images/icons/tail.png)] after:bg-no-repeat after:bg-center after:bg-[length:100%]">
              <div class="flex gap-4 items-center">
                <p class="font-bold text-lg">${office.location}</p>
                <div class="bg-white text-black group-hover:block hidden items-center">
                  <div class="flex gap-1 items-center">
                    <Image src="svg/map/star.svg" width={18} height={18} alt="별점이미지" />
                    <b>${office.avg_rating} (${office.review_count})</b>
                  </div>
                </div>
              </div>
              <div class="group-hover:h-[6rem] group-hover:w-[11.1875rem] group-hover:opacity-100 opacity-0 h-0 w-0 overflow-hidden flex flex-col gap-3 transition-all">
                <span>
                  <p class="text-xs">${office.traffic}</p>
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
          `;

        const markerPosition = new window.kakao.maps.LatLng(
          office.latitude,
          office.longitude,
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
      });

      window.kakao.maps.event.addListener(map, 'tilesloaded', function () {
        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach((overlay) => {
          overlay.addEventListener('click', (e: Event) => {
            const buildingId = Number((e.currentTarget as HTMLDivElement).id);
            const office = officeBuildings?.filter((office: OfficeBuilding) => {
              return office.building.id === buildingId;
            })[0];
            if (office) setCurrentBuilding(office);
          });
        });
      });
    }
  }, [buildingOverlayContent, map, officeBuildings, setCurrentBuilding]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map, officeBuildings]);

  return <></>;
}
