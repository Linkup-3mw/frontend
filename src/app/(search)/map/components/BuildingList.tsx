import { OfficeBuilding } from '@/types/office/office';
import BuildingItem from './BuildingItem';
import BuildingFilter from './BuildingFilter';
import { useRecoilValue } from 'recoil';

export interface BuildingListProps {
  officeBuildings: OfficeBuilding[] | null;
}

export default function BuildingList({ officeBuildings }: BuildingListProps) {
  return (
    <>
      <div className="fixed flex flex-col bg-[#E4EEFF] top-[110px] w-[30.6875rem] max-h-[50rem] overflow-hidden rounded-3xl shadow-2xl right-[30px] bottom-5 z-10">
        <div className="pt-6 flex justify-center h-[5.5rem] mt-2 mb-4">
          <BuildingFilter officeBuildings={officeBuildings} />
        </div>

        <div className="overflow-y-auto scrollbar-hide cursor-pointer rounded-b-3xl mt-3 ">
          <BuildingItem officeBuildings={officeBuildings} />
        </div>
      </div>
    </>
  );
}
