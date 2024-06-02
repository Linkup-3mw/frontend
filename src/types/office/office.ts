import { Membership, Reservation } from './reservation';

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
interface OfficeDetail {
  // 빌딩아이디
  office_building_id: number;
  // 좌석 예약 종류
  open_desk: boolean;
  partition: boolean;
  isolation_room: boolean;
  monitor_desk: boolean;
  //공간 예약 종류
  conf4: boolean;
  conf8: boolean;
  seminar_room: boolean;
  studio: boolean;
  // 공용 시설
  lounge: boolean;
  phone_booth: boolean;
  relax_room: boolean;
  oaroom: boolean;
  snack_bar: boolean;
  coffee: boolean;
  postbox: boolean;
  parking: boolean;
}

interface Coworker {
  name: string;
}
// 리뷰
interface Review {
  reviewer: string;
  rating: number;
  content: string;
  created_at: string;
}
// 소모임
interface Club {
  id: number;
  title: string;
  category: string;
  created_at: string;
}
export interface OfficeBuilding {
  building: Building;
  office_detail: OfficeDetail;
  coworkers: Coworker[];
  reviews: {
    created_at: any;
    review_count: number;
    avg_rating: number;

    reviews: Review[];
  };
  // 소모임수
  clubs: Club[];
  membership: Membership;
  reservation: Reservation;
}

export interface OfficeBuildingList {
  officeBuildings: OfficeBuilding[];
}
