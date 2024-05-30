import { OfficeBuilding } from '@/types/office/office';
import { currentBuildingState } from '../../atom/search';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Image from 'next/image';

interface BuildingItemProps {
  officeBuildings: OfficeBuilding[] | null;
}
export default function BuildingItem({ officeBuildings }: BuildingItemProps) {
  const setCurrentBuilding = useSetRecoilState<OfficeBuilding | null>(
    currentBuildingState,
  );

  return (
    <>
      {officeBuildings?.map((office, index) => (
        <div
          key={index}
          className="flex justify-center px-2 py-2 rounded-sm z-40 "
          onClick={() => setCurrentBuilding(office)}
        >
          <div className="flex gap-5  p-4 items-center bg-white rounded-md active:bg-blue-500 active:rounded-md active:text-white">
            <div>
              <Image
                src="/images/office/check.png"
                width={88}
                height={88}
                alt={`${office.building.location}`}
              />
            </div>
            <div className="flex flex-col w-[16.6875rem] h-[5.125rem] justify-between">
              <div className="flex justify-between">
                <p className="font-bold text-lg">{office.building.location}</p>
                {office.reviews &&
                  office.reviews.avg_rating &&
                  office.reviews.review_count && (
                    <div className="flex items-center">
                      <Image
                        src="/svg/map/star.svg"
                        width={18}
                        height={18}
                        alt="별"
                      />
                      {office.reviews.avg_rating}.0 (
                      {office.reviews.review_count})
                    </div>
                  )}
              </div>
              <p className="text-gray-300 text-sm">
                {office.building.traffic_info}
              </p>
              <div className="flex gap-4 justify-between text-xs">
                <p>
                  {office.building.street} {office.building.adress}
                </p>
                <div>
                  <button className="bg-blue-400 rounded-xl w-[3.8125rem] h-[1.6875rem] text-white p-1">
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
