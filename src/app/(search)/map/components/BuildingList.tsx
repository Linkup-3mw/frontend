import BuildingItem from './BuildingItem';
import BuildingFilter from './BuildingFilter';
import { useState } from 'react';

export default function BuildingList() {
  const [isUp, setIsUp] = useState(true);

  const listUp = () => {
    setIsUp((prev) => !prev);
  };

  return (
    <div className="h-full overflow-hidden rounded-3xl max-md:h-[calc(100vh_-_5rem)]">
      <button
        className="fixed btn-hidden shadow-lg bg-[#F9D91B] p-[0.5rem] rounded-2xl font-bold text-[0.875rem] w-[5.3125rem] h-[2.5rem]  transform-tramslate-1/2 
        "
        style={{
          bottom: '110px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 40,
        }}
        onClick={listUp}
      >
        {isUp ? '지도보기' : '목록보기'}
      </button>

      {/* <div
        className={`hidden-md fixed 
        mb:rounded-t-3xl mb:bottom-0 mb:right-0  mb:left-0 mb:h-[33.25rem] mb:w-[360px]  mx-auto  transition-transform duration-1000
        overflow-hidden ${isUp ? 'mb:h-[17.25rem]' : 'mb:h-[5rem]'}
        md:fixed md:top-[110px] md:left-[70%] md:w-[30.6875rem] md:rounded-3xl md:shadow-2xl md:right-[30px] md:bottom-5 flex flex-col bg-[#E4EEFF] md:h-[56.75rem] z-10
          `}
      > */}
      <div
        className={` h-full
        md:w-[30.6875rem] md:shadow-2xl flex flex-col bg-[#E4EEFF] z-10 max-md:absolute max-md:left-0 max-md:w-full max-md:rounded-t-[1rem] max-md:rounded--[1rem] max-md:shadow-md
        max-md:bottom-0 transition-transform duration-1000  max-md:h-[calc(100vh_-_8rem)]
        ${isUp ? 'max-md:translate-y-[0]' : 'max-md:translate-y-[calc(100%_-_3.75rem)]'}
          `}
      >
        <div className="pt-4 flex flex-col items-center mb-2 ">
          <BuildingFilter isUp={isUp} />
        </div>
        <div className="overflow-y-auto h-[calc(100%_-_5.5rem)] cursor-pointer mt-3 ">
          <BuildingItem />
        </div>
      </div>
    </div>
  );
}
