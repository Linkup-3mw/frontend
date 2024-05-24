'use client';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { OfficeBuilding } from '@/types/office/office';
import Zoom from './components/Zoom';
import Marker from './components/Marker';
import ComponentMap from './components/Map';
import BuildingList from './components/BuildingList';
import CurrentLocationButton from './components/LocationButton';

export default function MapPage() {
  const [officeBuildings, setOfficeBuildings] = useState<
    OfficeBuilding[] | null
  >(null);
  useEffect(() => {
    const fetchBuildingsData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8888/office_buildings',
        );
        const { data: buildings } = response;
        console.log(buildings);
        setOfficeBuildings(buildings);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBuildingsData();
  }, []);
  return (
    <>
      <CurrentLocationButton />
      <Marker officeBuildings={officeBuildings} />
      <ComponentMap />
      <Zoom />
      <BuildingList officeBuildings={officeBuildings} />
    </>
  );
}
