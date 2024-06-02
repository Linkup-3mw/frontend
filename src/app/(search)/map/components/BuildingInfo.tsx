import { useRecoilValue } from 'recoil';
import { currentBuildingState } from '../../atom/search';
import BuildingServiceView from './BuildingInfoServiceView';
import BuildingImageSlider from './BuildingImageSlider';

export default function BuildingInfo() {
  const currentBuilding = useRecoilValue(currentBuildingState);

  const BuildingImageUrl = currentBuilding?.building.images;
  const BuildingId = currentBuilding?.building.id;
  return (
    <>
      <div
        className="hidden-md gap-[3rem] rounded-3xl flex flex-col top-[110px] w-[30.6875rem] absolute ease-in duration-300 shadow-2xl right-[530px] bottom-5 z-10 bg-white p-0 m-0 
       "
      >
        <div className="overflow-hidden rounded-t-3xl">
          <BuildingImageSlider
            images={BuildingImageUrl!}
            buildingId={BuildingId!}
          />
        </div>

        <div className="flex flex-col gap-3 justify-start items-center bg-[#E4EEFF] overflow-hidden overflow-y-scroll scrollbar-hide rounded-b-3xl">
          <BuildingServiceView currentBuilding={currentBuilding} />
        </div>
      </div>
    </>
  );
}
