import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  buildingState,
  currentBuildingState,
  mapState,
} from '../../atom/search';
import { OfficeBuilding } from '@/types/office/office';
import { useCallback, useEffect } from 'react';

export default function Marker({
  office_buildings,
}: {
  office_buildings: OfficeBuilding[] | null;
}) {
  const map = useRecoilValue(mapState);
  const setCurrentBuilding = useSetRecoilState(currentBuildingState);

  const loadKakaoMarkers = useCallback(() => {
    if (map) {
      office_buildings?.forEach((office) => {
        const customContent = `
                <div class="overlay">
                <div class="group absolute hover:z-50 z-10 left-0 bottom-0 -translate-x-1/2 p-4 text-nowrap rounded-[0.25rem] bg-white border-[2px] border-solid border-black text-sm after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:w-[1.2625rem] after:h-[1.0625rem] after:bg-[url(/images/icons/tail.png)] after:bg-no-repeat after:bg-center after:bg-[length:100%]">
                  <b>${office.building.location}</b>
     
                  <div class="group-hover:h-32 group-hover:w-52 group-hover:opacity-100 opacity-0 h-0 w-0 overflow-hidden flex flex-col gap-3 transition-all">
                    <i>${office.building.traffic_info}</i>
                    <div>
                      <span>인원 ${office.building.capacity}/300</span>
                      <span>리뷰 ${office.rating.avg_rating} (132)</span>
                    </div>
                    <span>소모임 ${office.club_count} 개</span>
                    <span>팀 3명 / 친구 5명</span>
                  </div>
                </div>
              </div> 
                `;
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
        console.log('customOverlay???', customOverlay);
        customOverlay.setMap(map);

        const overlays = document.querySelectorAll('.overlay');
        overlays.forEach((overlay) => {
          overlay.addEventListener('click', () => {
            alert('안녕');
            // console.log('아시바랑ㄹ낭ㄹㅁ넝리;ㄴㅁ', setCurrentBuilding);
            setCurrentBuilding(office);
          });
        });
      });
    }
  }, [map, office_buildings]);

  useEffect(() => {
    loadKakaoMarkers();
  }, [loadKakaoMarkers, map]);
  return <></>;
}
