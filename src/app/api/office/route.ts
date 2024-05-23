import { NextRequest, NextResponse } from 'next/server';
import { OfficeBuilding } from '@/types/office/office';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET(req: NextRequest) {
  const officeBuildings: OfficeBuilding[] = await fetchOfficeData();
  console.log('officeBuildings', officeBuildings);
  return NextResponse.json(officeBuildings);
}

async function fetchOfficeData(): Promise<OfficeBuilding[]> {
  try {
    const filePath = path.join(process.cwd(), 'public', 'db.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    if (Array.isArray(data.office_buildings)) {
      return data.office_buildings;
    } else {
      throw new Error('Invalid data format');
    }
  } catch (error) {
    console.error('Error fetching office data:', error);
    return []; // 빈 배열 반환 또는 다른 오류 처리 방법 사용
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { Building } from '@/types/office/office';
// import { OfficeBuilding } from '@/types/office/office';
// import path from 'path';
// import { promises as fs } from 'fs';

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const id = searchParams.get('id') as string;
//   //모든
//   const office_buildings: OfficeBuilding[] = await fetchOfficeData();
//   console.log('building@@@@', office_buildings);
//   return NextResponse.json(office_buildings);
// }
// async function fetchOfficeData(): Promise<OfficeBuilding[]> {
//   const filePath = path.join(process.cwd(), 'public', 'db.json');
//   const jsonData = await fs.readFile(filePath, 'utf-8');
//   const data = JSON.parse(jsonData);
//   console.log('@@@@@@@@@@@data¸', data);

//   return data.OFFICE; // 수정: OFFICE 키에 해당하는 값만 반환
// }
