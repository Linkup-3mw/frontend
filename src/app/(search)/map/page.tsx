'use client';
import { OfficeBuilding } from '@/types/office/office';
import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import ComponentMap from './components/Map';
import Marker from './components/Marker';

export default function MapPage() {
  const [office_buildings, setBd] = useState<OfficeBuilding[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: AxiosResponse<OfficeBuilding[]> = await axios.get<
          OfficeBuilding[]
        >('/api/office');
        console.log('res', res);
        setBd(res.data);
      } catch (error) {
        console.error(error);
        // 에러 핸들링: 사용자에게 에러를 표시하거나 필요한 작업 수행
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Marker office_buildings={office_buildings} />
      <ComponentMap />
    </>
  );
}
