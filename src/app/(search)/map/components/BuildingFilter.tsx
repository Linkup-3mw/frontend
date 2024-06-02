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
  const [selectedIndustry, setSelectedIndustry] = useState(false);
  const [selectedOccupation, setSelectedOccupation] = useState(false);

  const GangNamGoo = [
    '강남구',
    '서초구',
    '영등포구',
    '관악구',
    '구로구',
    '강서구',
  ];
  const GangBookGoo = ['중구', '종로구', '용산구', '성동구', '마포구'];
  const Gyeonggi = '성남시';
  const Industry = [
    'IT',
    '건설',
    '부동산',
    '생산/제조',
    '연구/개발',
    '금융',
    '통신',
    '무역',
    '물류',
    '의료',
    '교육',
    '문화/예술',
    '미디어',
    '관광',
    'F&B',
    '기타',
  ];
  const Occupation = [
    '개발',
    '기획',
    '분석',
    '디자인',
    '마케팅',
    '컨설팅',
    '영업/판매',
    '촬영/편집',
    '회계',
    '세무',
    '법무',
    '상품기획',
    'MD',
    'CS',
    '사무지원',
    '기타',
  ];
  const handleRegionClick = () => {
    setSelectedRegion(!selectedRegion);
    setSelectedIndustry(false);
    setSelectedOccupation(false);
  };

  const handleSanupkunClick = () => {
    setSelectedIndustry(!selectedIndustry);
    setSelectedRegion(false);
    setSelectedOccupation(false);
  };

  const handleJickunClick = () => {
    setSelectedOccupation(!selectedOccupation);
    setSelectedRegion(false);
    setSelectedIndustry(false);
  };

  return (
    <div className="flex gap-2 w-[26.6875rem] items-center">
      <div
        className={`bg-white rounded-t-md ${
          selectedRegion
            ? 'active text-black border-[1px] border-blue-300'
            : 'text-gray-400'
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
        <div
          className="
        md:absolute md:top-[80px] md:left-7 md:right-0 md:bottom-0 md:w-[26.6875rem] md:h-[30rem]
        mb:w-[20.5rem] mb:h-[22.25rem] mb:fixed p-4 mb:top-20 mb:left-5 mb:right-0 mb:bottom-0 
        bg-white z-50 shadow-lg rounded-xl border border-gray-300"
        >
          <div className="flex justify-between items-center">
            <h1
              className="
          mb:text-[1rem] md:font-semibold
          md:text-xl mb:font-normal"
            >
              강남
            </h1>
            
            <div className="flex gap-5 items-center">
              <div className="flex gap-2 items-center">
                <p className="font-normal md:text-sm mb:text-[0.625rem]">
                  선택 초기화
                </p>
                <Image
                  src="svg/reservation/reset.svg"
                  width={12}
                  height={12}
                  alt="필터 초기화"
                />
              </div>
              <Image
                className="btn-hidden"
                onClick={() => setSelectedRegion(false)}
                src="svg/reservation/cancel.svg"
                width={18}
                height={18}
                alt="취소"
              />
            </div>
          </div>

          <ul className="p-2 grid grid-cols-4 gap-4">
            {GangNamGoo.map((city) => (
              <li key={city}>
                <button
                  className="md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
                mb:text-xs md:text-[1rem]"
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 md:my-2 mb:my-1"></div>
          <h1
            className="
          mb:text-[1rem] md:font-bold
          md:text-xl mb:font-normal"
          >
            강북
          </h1>
          <ul className="p-2 grid grid-cols-4 gap-2">
            {GangBookGoo.map((city) => (
              <li key={city}>
                <button
                  className="md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
                 mb:text-xs md:text-[1rem]"
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-300 md:my-2 mb:my-1"></div>
          <h1
            className="
                   mb:text-[1rem] md:font-bold
                   md:text-xl mb:font-normal
          "
          >
            경기
          </h1>
          <ul className="p-2 grid grid-cols-4 gap-2">
            <li>
              <button
                className="md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
               mb:text-xs md:text-[1rem]"
              >
                {Gyeonggi}
              </button>
            </li>
          </ul>
        </div>
      )}
      <div
        onClick={handleSanupkunClick}
        className="w-[7.8125rem] h-[2.5rem] text-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
      >
        <div className="flex items-center">
          <span className="mr-2 ">산업군 선택</span>
          <Image src="svg/map/arrow.svg" width={24} height={24} alt="화살표" />
        </div>
      </div>
      {selectedIndustry && (
        <div className="absolute p-4 top-20 bg-white w-[26.6875rem] h-[27rem] z-50 shadow-lg rounded-md border border-gray-300">
          <h1
            className="
                   mb:text-[1rem] md:font-bold
                   md:text-xl mb:font-normal
          
          "
          >
            직무
          </h1>
          <ul className="p-2 grid grid-cols-4 gap-4">
            {Industry.map((industry) => (
              <li key={industry}>
                <button className="bg-white border-2 w-full rounded-md">
                  {industry}
                </button>
              </li>
            ))}
          </ul>
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
      {selectedOccupation && (
        <div className="absolute p-4 top-20 bg-white w-[26.6875rem] h-[27rem] z-50 shadow-lg rounded-md border border-gray-300">
          <h1
            className="
                   mb:text-[1rem] md:font-bold
                   md:text-xl mb:font-normal
          "
          >
            직무
          </h1>
          <ul className="p-2 grid grid-cols-4 gap-4">
            {Occupation.map((occupation) => (
              <li key={occupation}>
                <button className="bg-white border-2 w-full rounded-md">
                  {occupation}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
