import { useState } from 'react';
import { OfficeBuilding } from '@/types/office/office';
import Image from 'next/image';

interface BuildingFilterProps {
  officeBuildings: OfficeBuilding[] | null;
}

export default function BuildingFilter({
  officeBuildings,
}: BuildingFilterProps) {
  const [selectedRegion, setSelectedRegion] = useState(false);
  const [selectedSanupkun, setSelectedSanupkun] = useState(false);
  const [selectedJickun, setSelectedJickun] = useState(false);

  const gangNamGoo = [
    '강남구',
    '서초구',
    '영등포구',
    '관악구',
    '구로구',
    '강서구',
  ];
  const GangBookGoo = ['중구', '종로구', '용산구', '성동구', '마포구'];

  const handleRegionClick = () => {
    setSelectedRegion(!selectedRegion);
    setSelectedSanupkun(false);
    setSelectedJickun(false);
  };

  const handleSanupkunClick = () => {
    setSelectedSanupkun(!selectedSanupkun);
    setSelectedRegion(false);
    setSelectedJickun(false);
  };

  const handleJickunClick = () => {
    setSelectedJickun(!selectedJickun);
    setSelectedRegion(false);
    setSelectedSanupkun(false);
  };

  return (
    <div className="flex gap-2 w-[26.6875rem] items-center border-gray-300">
      <div
        className={`bg-white rounded-md ${
          selectedRegion ? 'active text-black' : 'text-gray-400'
        }`}
      >
        <div
          onClick={handleRegionClick}
          className="flex w-[10.0625rem] h-[2.5rem] rounded-md items-center justify-center cursor-pointer shadow-md transition-all duration-1000"
        >
          <div className="flex items-center">
            <span className="mr-2">지역 선택</span>
            <Image
              src="svg/map/arrow.svg"
              width={24}
              height={24}
              alt="화살표"
            />
          </div>
        </div>
      </div>
      {selectedRegion && (
        <div className="absolute p-4 top-20 bg-white w-[26.6875rem] h-[27rem] z-50 shadow-lg rounded-md border border-gray-300">
          <h1 className="text-xl font-bold">강남</h1>
          <ul className="p-2 grid grid-cols-4 gap-4">
            {gangNamGoo.map((city) => (
              <li key={city}>
                <button className="bg-white border-2 w-full rounded-md">
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-4"></div>
          <h1 className="text-xl font-bold">강남</h1>
          <ul className="p-2 grid grid-cols-4 gap-2">
            {GangBookGoo.map((city) => (
              <li key={city}>
                <button className="bg-white border-2 w-full rounded-md">
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 my-4"></div>
          <h1 className="text-xl font-bold">경기</h1>
          <ul className="p-2 grid grid-cols-4 gap-2">
            {GangBookGoo.map((city) => (
              <li key={city}>
                <button className="bg-white border-2 w-full rounded-md">
                  {city}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div
        onClick={handleSanupkunClick}
        className="w-[7.8125rem] h-[2.5rem] text-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
      >
        <div className="flex items-center">
          <span className="mr-2">산업군 선택</span>
          <Image src="svg/map/arrow.svg" width={24} height={24} alt="화살표" />
        </div>
      </div>
      {selectedSanupkun && (
        <div className="absolute top-20 bg-white w-[26.6875rem] h-[10rem] z-50 shadow-lg rounded-md border border-gray-300 transition-transform transform duration-300">
          <ul className=""></ul>
        </div>
      )}
      <div className="relative">
        <div
          onClick={handleJickunClick}
          className="w-[7.8125rem] h-[2.5rem] text-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
        >
          <div className="flex items-center">
            <span className="mr-2">직군 선택</span>
            <Image
              src="svg/map/arrow.svg"
              width={24}
              height={24}
              alt="화살표"
            />
          </div>
        </div>
      </div>
      {selectedJickun && (
        <div className="absolute top-20 bg-white w-[26.6875rem] h-[10rem] z-50 shadow-lg rounded-md border border-gray-300 transition-transform transform duration-300"></div>
      )}
    </div>
  );
}
