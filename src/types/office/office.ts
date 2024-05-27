export interface Building {
  id: number;
  // 지점명
  location: string;
  // 지역
  region: string;
  // 도시
  city: string;
  // 거리
  street: string;
  adress: string;
  // 수용인원
  capacity: number;
  // 교통정보
  traffic_info: string;
  // 위도 경도
  latitude: string;
  longitude: string;
  images: string;
}

export interface OfficeBuilding {
  building: Building;
  // 소모임수
  club_count: number;
  //평점
  rating: {
    // 평점
    avg_rating: number;
    // 평점개수
    count: number;
  };
}

export interface OfficeBuildingList {
  officeBuildings: OfficeBuilding[];
}
