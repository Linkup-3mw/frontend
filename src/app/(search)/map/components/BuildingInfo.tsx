import { useRecoilState, useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import BuildingServiceView from './BuildingInfoServiceView';
import BuildingImageSlider from './BuildingImageSlider';
import { useEffect } from 'react';
import API from '@/utils/axios';

export default function BuildingInfo() {
  const [currentBuilding, setCurrentBuilding] =
    useRecoilState(currentBuildingState);
  const BuildingId = currentBuilding?.id;
  const id = currentBuilding?.id;
  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await API.get(`/office/${BuildingId}`);
        const content = response.data.data.content;
      } catch (error) {
        console.error('Error fetching buildings data:', error);
      }
    };
    if (id) fetchBuildingsData();
  }, [BuildingId, currentBuilding, id]);
  return (
    <>
      <div
        className="mb:w-full md:w-[30.6875rem] mb:bottom-0 z-[100] h-full
         md:top-[110px] rounded-3xl md:shadow-2xl md:right-[580px] md:bottom-5 max-md:absolute max-md:left-0
       flex flex-col mb:top-[2rem]  ease-in duration-300 shadow-2xl mb:right-[0px] bottom-5 bg-white p-0 m-0 
       "
      >
        <div className="">
          <BuildingImageSlider buildingId={BuildingId!} />
        </div>

        <div className="flex flex-col justify-start items-center bg-[#E4EEFF] overflow-y-scroll rounded-b-3xl">
          <BuildingServiceView currentBuilding={currentBuilding} />
        </div>
      </div>
    </>
  );
}
