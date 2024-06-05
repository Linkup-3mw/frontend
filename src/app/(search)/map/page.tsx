'use client';
import { useEffect, useState } from 'react';
import { Building, OfficeBuildingsResponse } from '@/types/office/office';
import Zoom from './components/Zoom';
import Marker from './components/Marker';
import ComponentMap from './components/Map';
import BuildingList from './components/BuildingList';
import CurrentLocationButton from './components/LocationButton';
import BuildingInfo from './components/BuildingInfo';
import { useRecoilState } from 'recoil';
import { buildingState, currentBuildingState } from '../atom/search';
import API from '@/utils/axios';

export default function MapPage() {
  const [currentBuilding, setCurrentBuilding] =
    useRecoilState(currentBuildingState);

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
  }, []);

  return (
    <>
      <div>
        <CurrentLocationButton />
        <ComponentMap />
        <Marker />
        <Zoom />
        <div className="">
          <BuildingList />
          {currentBuilding && <BuildingInfo />}
        </div>
      </div>
    </>
  );
}
