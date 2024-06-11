import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Building } from '@/types/office/office';
import API from '@/utils/axios';
import {
  buildingState,
  currentBuildingState,
  filterDataState,
  mapState,
} from '../../atom/search';

export default function Marker() {
  const map = useRecoilValue(mapState);
  const setCurrentBuilding = useSetRecoilState(currentBuildingState);
  const [officeBuildings, setOfficeBuildings] =
    useRecoilState<Building[]>(buildingState);
  const [filterData, setFilterData] = useRecoilState(filterDataState);

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await API.get('/office/search');
        const content = response.data.data.content;
        setOfficeBuildings(content);
      } catch (error) {
        console.error('error :', error);
      }
    };

    fetchBuildingsData();
  }, [setOfficeBuildings]);

  useEffect(() => {
    const removeOverlays = () => {
      const overlays = document.querySelectorAll('.overlay');
      overlays.forEach((overlay) => {
        overlay.parentNode?.removeChild(overlay);
      });
    };

    removeOverlays();
  }, []);

  useEffect(() => {
    const buildingOverlayContent = officeBuildings?.map((office) => ({
      buildingId: office.id,
      location: office.location,
      traffic: office.traffic_info,
      latitude: office.latitude,
      longitude: office.longitude,
    }));

    const filterOverlayContent = filterData?.map((office) => ({
      buildingId: office.id,
      location: office.location,
      traffic: office.traffic_info,
      latitude: office.latitude,
      longitude: office.longitude,
    }));

    const loadKakaoMarkers = () => {
      if (map) {
        buildingOverlayContent?.forEach((office) => {
          const customContent = `
            <div id=${office.buildingId} class="overlay bg-white group absolute z-10 left-0 bottom-0 -translate-x-1/2 p-4 box-border text-nowrap rounded-[0.25rem] text-sm shadow-lg after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:w-[1.2625rem] after:h-[1.0625rem] after:bg-[url(/svg/map/tail.svg)] after:bg-no-repeat after:bg-center after:bg-[length:100%]">
              <div class="flex gap-4 items-center">
                <p class="font-bold text-sm">${office.location}</p>
                <div class="bg-white text-black group-hover:block hidden items-center">
                  <div class="flex gap-1 items-center">
                    <Image src="/svg/map/star.svg" width={18} height={18} alt="별점이미지" />
                    <b>별점 리뷰갯수</b>
                  </div>
                </div>
              </div>
              <div class="group-hover:h-[6rem] group-hover:w-[11.1875rem] group-hover:opacity-100 opacity-0 h-0 w-0 overflow-hidden flex flex-col gap-3 transition-all">
                <span>
                  <p class="text-xs">${office.traffic}</p>
                </span>
                <span class="flex gap-2 items-center text-gray-400">
                  <Image src="/svg/map/cow.svg" width={18} height={18} alt="소이미지" />
                  <span>소모임  개</span>
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
              console.log('마커눌렀다');
              const buildingId = Number((e.currentTarget as HTMLDivElement).id);
              const office = officeBuildings?.filter((office: Building) => {
                return office.id === buildingId;
              })[0];
              if (office) setCurrentBuilding(office);
            });
          });
        });
      }

      if (map && filterData.length > 0) {
        filterOverlayContent?.forEach((office) => {
          const customContent = `
            <div id=${office.buildingId} class="overlay text-[1rem] text-white bg-[#688AF2]  group absolute z-10 left-0 bottom-0 -translate-x-1/2 p-4 box-border text-nowrap rounded-[0.25rem] text-sm shadow-lg after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:w-[1.2625rem] after:h-[1.0625rem] after:bg-[url(/svg/map/tailblue.svg)] after:bg-no-repeat after:bg-center after:bg-[length:100%]">
              <div class="flex gap-4 items-center">
                <p class="font-bold text-sm">${office.location}</p>
                <div class="text-white group-hover:block hidden items-center">
                  <div class="flex gap-1 items-center">
                    <Image src="/svg/map/star.svg" width={18} height={18} alt="별점이미지" />
                    <b>별점 리뷰갯수</b>
                  </div>
                </div>
              </div>
              <div class="group-hover:h-[6rem] group-hover:w-[11.1875rem] group-hover:opacity-100 opacity-0 h-0 w-0 overflow-hidden flex flex-col gap-3 transition-all">
                <span>
                  <p class="text-xs">${office.traffic}</p>
                </span>
                <span class="flex gap-2 items-center ">
                  <Image src="/svg/map/cow.svg" width={18} height={18} alt="소이미지" />
                  <span>소모임  개</span>
                </span>
                <button class="absolute bottom-4 right-5 font-bold w-[4rem] h-[2rem] bg-white rounded-xl text-[#688AF2]">
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
              console.log('v파란색마커눌렀다');
              const buildingId = Number((e.currentTarget as HTMLDivElement).id);
              const office = officeBuildings?.filter((office: Building) => {
                return office.id === buildingId;
              })[0];
              if (office) setCurrentBuilding(office);
            });
          });
        });
      }
    };

    loadKakaoMarkers();
  }, [map, officeBuildings, filterData, setCurrentBuilding]);

  return <></>;
}
