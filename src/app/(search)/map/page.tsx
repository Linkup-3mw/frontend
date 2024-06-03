'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OfficeBuilding } from '@/types/office/office';
import Zoom from './components/Zoom';
import Marker from './components/Marker';
import ComponentMap from './components/Map';
import BuildingList from './components/BuildingList';
import CurrentLocationButton from './components/LocationButton';
import BuildingInfo from './components/BuildingInfo';
import { useRecoilState, useRecoilValue } from 'recoil';
import { buildingState } from '../atom/search';
import { currentBuildingState } from '../atom/search';
import { mobileReservationLayoutState } from '../atom/media';

export default function MapPage() {
  const [officeBuildings, setOfficeBuildings] =
    useRecoilState<OfficeBuilding[]>(buildingState);
  const [currentBuilding, setCurrentBuilding] =
    useRecoilState(currentBuildingState);
  const [isUp, setIsUp] = useState(false);

  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8888/office_buildings',
        );
        const { data: buildings } = response;
console.log(buildings)
        setOfficeBuildings(buildings);
      } catch (error) {}
    };

    fetchBuildingsData();
  }, [setOfficeBuildings]);

  return (
    <>
      <div>
        <CurrentLocationButton />
        <Marker officeBuildings={officeBuildings} />
        <ComponentMap />
        <Zoom />

        <div className="">
          <BuildingList
            officeBuildings={officeBuildings}
            isUp={isUp}
       
          />
          {currentBuilding && <BuildingInfo />}
        </div>
      </div>
    </>
  );
}
