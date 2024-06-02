import { OfficeBuilding } from '@/types/office/office';
import BuildingItem from './BuildingItem';
import BuildingFilter from './BuildingFilter';
import { useState } from 'react';

export interface BuildingListProps {
  officeBuildings: OfficeBuilding[] | null;
  isMobile: boolean;
  isUp: boolean;
}

export default function BuildingList({
  officeBuildings,
  isMobile,
}: BuildingListProps) {
  const [isUp, setIsUp] = useState(false);
  const listUp = () => {
    setIsUp((prev) => !prev);
  };
  return (
    <>
      <button
        className="fixed btn-hidden shadow-lg bg-[#F9D91B] p-[0.5rem] rounded-2xl font-bold text-[0.875rem] w-[5.3125rem] h-[2.5rem]  transform-tramslate-1/2 z-990
        "
        style={{
          bottom: '110px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 990,
        }}
        onClick={listUp}
      >
        {isUp ? '지도보기' : '목록보기'}
      </button>

      <div
        className={`hidden-md fixed mb:bottom-0 mb:right-0 mb:h-[43.25rem] mb:w-[22.5rem]  mx-auto 
    mb:transition-transform mb:duration-600 overflow-hidden mb:border-4 ${
      isUp ? 'mb:h-[43.25rem] ' : 'mb:h-[5.5rem]'
    }

    md:fixed md:top-[110px] md:w-[30.6875rem] md:rounded-3xl md:shadow-2xl  md:right-[30px] md:bottom-5 flex flex-col bg-[#E4EEFF] md:h-[56.75rem] overflow-hidden z-10

          `}
      >
        <div className="pt-6 flex flex-col items-center h-[5.5rem] mt-2 mb-4 mx-auto">
          <BuildingFilter officeBuildings={officeBuildings} />
        </div>
        <div className="overflow-y-auto scrollbar-hide cursor-pointer  mt-3 ">
          <BuildingItem officeBuildings={officeBuildings} />
        </div>
      </div>
    </>
  );
}
