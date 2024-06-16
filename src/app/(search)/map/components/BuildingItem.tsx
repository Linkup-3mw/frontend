import { Building } from '@/types/office/office';
import {
  buildingState,
  currentBuildingState,
  filterDataState,
} from '../../atom/search';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ModalSkeleton from './skeleton/modalSkeleton';
import ListSkeleton from './skeleton/listSkeleton';

export default function BuildingItem() {
  const [filterData, setFilterData] = useRecoilState(filterDataState);
  const [showInfo, setShowInfo] = useState(false);
  const [currentBuilding, setCurrentBuilding] = useRecoilState<Building | null>(
    currentBuildingState,
  );
  const [click, setClick] = useState(false);
  const [officeBuildings, setOfficeBuildings] =
    useRecoilState<Building[]>(buildingState);
  const [loading, setLoading] = useState(true);
  const handleItemClick = (office: Building) => {
    setClick(true);
    setCurrentBuilding(office);
    setShowInfo(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  console.log('뭐뭐', officeBuildings);
  return (
    <>
      {loading &&
        officeBuildings.map((office, index) => <ListSkeleton key={index} />)}
      {!loading && filterData.length === 0
        ? officeBuildings?.map((office, index) => (
            <div
              key={index}
              className="flex justify-center p-2 md:rounded-lg mb:rounded-sm z-40 "
              onClick={() => handleItemClick(office)}
            >
              <div
                className={`md:w-[26.6875rem] md:h-[8.5rem] mb:w-[20.5rem] mb:h-[5.875rem]  
              flex gap-5 p-4 items-center rounded-md ${
                currentBuilding && currentBuilding.location === office.location
                  ? 'bg-blue-500 text-white '
                  : 'bg-white'
              }`}
              >
                <div>
                  <Image
                    src="/images/office/office_image.png"
                    width={88}
                    height={88}
                    alt={`${office.location}`}
                  />
                </div>
                <div className=" flex flex-col max-md:w-full  md:w-[16.6875rem] mb:h-[3.875rem] md:h-[5.125rem] justify-between">
                  <span className="md:text-lg mb:text-sm font-bold">
                    {office.location}
                  </span>

                  <div className="h-3/3 flex md:text-sm mb:text-xs font-semibold">
                    <div className="flex flex-col">
                      <span>{office.traffic_info}</span>
                      <span>
                        {office.city}구 {office.street} {office.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        : filterData?.map((office, index) => (
            <div
              key={index}
              className="flex justify-center p-2 md:rounded-lg mb:rounded-sm z-40 "
              onClick={() => {
                setCurrentBuilding(office);
                setShowInfo(true);
              }}
            >
              <div
                className={`md:w-[26.6875rem] md:h-[8.5rem] mb:w-[20.5rem] mb:h-[5.875rem]  
              flex gap-5 p-4 items-center bg-white rounded-md ${currentBuilding ? 'bg-blue-500' : ''} active:bg-blue-500 active:rounded-md active:text-white`}
              >
                <div>
                  <Image
                    src="/images/office/check.png"
                    width={88}
                    height={88}
                    alt={`${office.location}`}
                  />
                </div>
                <div className="flex flex-col mb:w-[14.125rem] md:w-[16.6875rem] mb:h-[3.875rem] md:h-[5.125rem] justify-between">
                  <div className="flex justify-between">
                    <p className="font-bold mb:text-[1rem] md:text-lg">
                      {office.location}
                    </p>
                  </div>
                  <p className="text-gray-300 mb:text-[0.625rem] md:text-sm">
                    {office.traffic_info}
                  </p>
                  <p
                    className={`mb:text-[0.625rem] md:text-xs
                    ${currentBuilding && currentBuilding.location === office.location ? 'text-white' : 'text-gray-300 '}`}
                  >
                    {office.city}
                  </p>
                  <div className="flex gap-4 justify-between mb:text-[0.625rem] md:text-xs">
                    <p>
                      {office.city} {office.street} {office.address}
                    </p>
                    <div>
                      <button className="bg-blue-400 rounded-lg mb:w-[3.375rem] mb:h-[1.4375rem] md:w-[3.8125rem] md:h-[1.6875rem] text-white p-1">
                        바로 예약
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
    </>
  );
}
