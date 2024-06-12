import { useEffect, useState } from 'react';
import { Building, OfficeBuilding } from '@/types/office/office';
import Image from 'next/image';
import { useRecoilState } from 'recoil';
import { buildingState, filterDataState } from '../../atom/search';
import API from '@/utils/axios';

interface BuildingFilterProps {
  isUp: boolean;
}

export default function BuildingFilter({ isUp }: BuildingFilterProps) {
  const [selectedRegion, setSelectedRegion] = useState(false);
  const [selectedIndustry, setSelectedIndustry] = useState(false);
  const [selectedOccupation, setSelectedOccupation] = useState(false);
  const [selectedR, setSelectedR] = useState('');
  const [officeBuildings, setOfficeBuildings] =
    useRecoilState<Building[]>(buildingState);

  const [filterData, setFilterData] = useRecoilState(filterDataState);

  const handleFilterClick = (city: string) => {
    setSelectedR(city);
    const fetchBuildingsData = async () => {
      try {
        const response = await API.get(`office/search?city=${city}`);
        const filter = response.data.data.content;
        setFilterData(filter);
      } catch (error) {
        console.error('error :', error);
      }
    };
    fetchBuildingsData();
  };
  const handleResetFilter = () => {
    setFilterData(officeBuildings);
  };

  const GangNamGoo = ['강남', '서초', '영등포', '관악', '구로', '강서'];
  const GangBookGoo = ['중구', '종로', '용산', '성동', '마포'];
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

  useEffect(() => {
    if (!isUp) {
      setSelectedRegion(false);
      setSelectedIndustry(false);
      setSelectedOccupation(false);
    }
  }, [isUp]);
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
    <div className="justify-center mb:pl-4 flex gap-2 md:pl-0 items-center ">
      <div
        className={`bg-white rounded-md ${
          selectedRegion
            ? 'active text-black border-[1px] border-blue-300'
            : 'text-gray-400'
        }`}
      >
        {/* <div
          onClick={() => handleRegionClick()}
          className="flex mx-auto
          mb:w-[6.5625rem] mb:h-[2rem] mb:text-[0.75rem]  
          md:text-[1rem] md:w-[10.0625rem] md:h-[2.5rem] rounded-md items-center justify-center cursor-pointer shadow-md transition-all duration-1000"
        > */}
        <div
          onClick={() => handleRegionClick()}
          className="flex mx-auto
          mb:w-[9.5625rem] mb:h-[2rem] mb:text-[0.75rem]  
          md:text-[1rem] md:w-[10.0625rem] md:h-[2.5rem] rounded-md items-center justify-center cursor-pointer shadow-md transition-all duration-1000"
        >
          <div className="flex items-center">
            <span className="mr-2">지역 선택</span>
            <Image
              src="/svg/map/Arrow.svg"
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
        md:absolute md:top-[70px] 
        mb:absolute p-4 mb:top-[-40px]
        bg-white z-100 shadow-lg rounded-xl border border-gray-300 transform -translate-x-1 -translate-y-1 "
        >
          <div className=" flex flex-col mx-auto">
            <div className="flex justify-between items-center">
              <h1
                className="
          mb:text-[1rem] md:font-semibold
          md:text-xl mb:font-normal"
              >
                강남
              </h1>

              <div className="flex gap-5 items-center">
                <div
                  onClick={handleResetFilter}
                  className="flex gap-2 items-center cursor-pointer"
                >
                  <p className="font-normal md:text-sm mb:text-[0.625rem]">
                    선택 초기화
                  </p>
                  <Image
                    src="/svg/reservation/reset.svg"
                    width={12}
                    height={12}
                    alt="필터 초기화"
                  />
                </div>
                <Image
                  className="btn-hidden"
                  onClick={() => setSelectedRegion(false)}
                  src="/svg/reservation/cancel.svg"
                  width={18}
                  height={18}
                  alt="취소"
                />
              </div>
            </div>

            <ul className="p-2 grid grid-cols-4 gap-4 ">
              {GangNamGoo.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => handleFilterClick(city)}
                    className="max-md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
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
                    onClick={() => handleFilterClick(city)}
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
        </div>
      )}
      <div
        onClick={handleSanupkunClick}
        className="mb:w-[5.1875rem] mb:h-[2rem] 
        mb:text-[0.75rem] 
        md:text-[1rem] 
        md:w-[7.8125rem] md:h-[2.5rem] text-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
      >
        <div className="flex items-center">
          <span className="mr-2 ">산업군</span>
          <Image src="/svg/map/arrow.svg" width={24} height={24} alt="화살표" />
        </div>
      </div>
      {selectedIndustry && (
        <div
          className="
          md:absolute md:top-[70px] 
        mb:absolute p-4 mb:top-[-40px]
        bg-white z-100 shadow-lg rounded-xl border border-gray-300 transform -translate-x-1 -translate-y-1"
        >
          <div className="flex justify-between">
            <h1
              className="
                   mb:text-[1rem] md:font-bold
                   md:text-xl mb:font-normal
          
          "
            >
              직무
            </h1>
            <div className="flex gap-5 items-center">
              <div
                onClick={handleResetFilter}
                className="flex gap-2 items-center cursor-pointer"
              >
                <p className="font-normal md:text-sm mb:text-[0.625rem]">
                  선택 초기화
                </p>
                <Image
                  src="/svg/reservation/reset.svg"
                  width={12}
                  height={12}
                  alt="필터 초기화"
                />
              </div>
              <Image
                className="btn-hidden"
                onClick={() => setSelectedIndustry(false)}
                src="/svg/reservation/cancel.svg"
                width={18}
                height={18}
                alt="취소"
              />
            </div>
          </div>

          <ul className="p-2 grid grid-cols-4 gap-4">
            {Industry.map((industry) => (
              <li key={industry}>
                <button
                  className="md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
                mb:text-xs md:text-[1rem]"
                >
                  {industry}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="">
        <div
          onClick={handleJickunClick}
          className="mb:w-[5.1875rem] mb:h-[2rem] mb:text-[0.75rem] 
          
          md:text-[1rem] md:w-[7.8125rem] md:h-[2.5rem] text-gray-400 bg-white rounded-md flex items-center justify-center cursor-pointer shadow-md transition-all duration-300"
        >
          <div className="flex items-center">
            <span className="mr-2">직군</span>
            <Image
              src="/svg/map/Arrow.svg"
              width={24}
              height={24}
              alt="화살표"
            />
          </div>
        </div>
      </div>
      {selectedOccupation && (
        <div
          className="
          md:absolute md:top-[70px] 
          mb:absolute p-4 mb:top-[-40px]
          bg-white z-100 shadow-lg rounded-xl border border-gray-300 transform -translate-x-1 -translate-y-1"
        >
          <div className="flex justify-between">
            <h1
              className="
                   mb:text-[1rem] md:font-bold
                   md:text-xl mb:font-normal
          
          "
            >
              직군
            </h1>
            <div className="flex gap-5 items-center cursor-pointer">
              <div
                onClick={handleResetFilter}
                className="flex gap-2 items-center cursor-pointer"
              >
                <p className="font-normal md:text-sm mb:text-[0.625rem]">
                  선택 초기화
                </p>
                <Image
                  src="/svg/reservation/reset.svg"
                  width={12}
                  height={12}
                  alt="필터 초기화"
                />
              </div>
              <Image
                className="btn-hidden"
                onClick={() => setSelectedOccupation(false)}
                src="/svg/reservation/cancel.svg"
                width={18}
                height={18}
                alt="취소"
              />
            </div>
          </div>
          <ul className="p-2 grid grid-cols-4 gap-4">
            {Occupation.map((occupation) => (
              <li key={occupation}>
                <button
                  className="md:w-[5.25rem] md:h-[3rem] mb:w-[4.25rem] mb:h-[2rem] bg-white border-2 rounded-xl
                mb:text-xs md:text-[1rem]"
                >
                  {occupation}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="border-t border-blue-500 md:my-2 mb:my-1"></div>
    </div>
  );
}
