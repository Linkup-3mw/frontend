import BuildingItem from './BuildingItem';
import BuildingFilter from './BuildingFilter';
import { useState } from 'react';

export default function BuildingList() {
  const [isUp, setIsUp] = useState(true);

  const listUp = () => {
    setIsUp((prev) => !prev);
  };
  return (
    <>
      <button
        className="fixed btn-hidden shadow-lg bg-[#F9D91B] p-[0.5rem] rounded-2xl font-bold text-[0.875rem] w-[5.3125rem] h-[2.5rem]  transform-tramslate-1/2 
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
        className={`hidden-md fixed 
        mb:rounded-t-3xl mb:bottom-0 mb:right-0  mb:left-0 mb:h-[43.25rem] mb:w-[380px]  mx-auto 
        mb:transition-transform mb:duration-600 overflow-hidden ${
          isUp
            ? 'mb:h-[33.25rem] mb:transition-all mb:duration-500 mb:ease-in-out'
            : 'mb:h-[5.5rem] mb:transition-all mb:duration-500 mb:ease-in-out'
        }
        md:fixed md:top-[110px] md:left-[70%] md:w-[30.6875rem] md:rounded-3xl md:shadow-2xl md:right-[30px] md:bottom-5 flex flex-col bg-[#E4EEFF] md:h-[56.75rem] z-10
          `}
      >
        <div className="pt-4 flex flex-col items-center mb-2 mx-auto">
          <BuildingFilter isUp={isUp} />
        </div>
        <div className="overflow-y-auto scrollbar-hide cursor-pointer mt-3 ">
          <BuildingItem />
        </div>
      </div>
    </>
  );
}
