'use client';
import { useEffect, useState } from 'react';
import { Building } from '@/types/office/office';
import Zoom from './components/Zoom';
import Marker from './components/Marker';
import ComponentMap from './components/Map';
import BuildingList from './components/BuildingList';
import CurrentLocationButton from './components/LocationButton';
import BuildingInfo from './components/BuildingInfo';
import { useRecoilState } from 'recoil';
import {
  buildingState,
  currentBuildingState,
  modalState,
} from '../atom/search';
import API from '@/utils/axios';
import Modal from './components/Loader/Modal';

export default function MapPage() {
  const [currentBuilding, setCurrentBuilding] =
    useRecoilState(currentBuildingState);
  const [modal, setModal] = useRecoilState(modalState);
  const [officeBuildings, setOfficeBuildings] =
    useRecoilState<Building[]>(buildingState);

  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await API.get('office/search');
        const content = response.data.data.content;
        setOfficeBuildings(content);
      } catch (error) {
        console.error('Error fetching buildings data:', error);
      }
    };

    fetchBuildingsData();
  }, [setOfficeBuildings]);

  return (
    <>
      <div className="overflow-hidden relative mt-[5rem] max-md:mt-[3.375rem] max-md:h-[calc(100vh_-_3.45rem)]">
        <CurrentLocationButton />
        <ComponentMap />
        <Marker />
        <Zoom />
        <div className="absolute right-[4.44rem] top-[2rem] z-[200] flex flex-row-reverse gap-[1.5rem] h-[calc(100vh_-_7rem_-_9.25rem)] max-h-[50.75rem] min-h-[80.4%] max-md:min-h-0 max-md:h-[calc(100vh_-_4.37rem)] max-md:static">
          <BuildingList />
          {currentBuilding && <BuildingInfo />}
        </div>
        <div className="absolute right-[5.44rem] top-[2rem] z-[201]">
          {modal && <Modal />}
        </div>
      </div>
    </>
  );
}
