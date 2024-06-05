// import { Membership, Reservation } from './reservation';

// export interface LoadOffice {
//   id: number;
//   location: string;
//   region: string;
//   city: string;
//   street: string;
//   address: string;
//   capacity: number;
//   images: string;
//   latitude: number;
//   logitude: number;
//   traffic_info: string;
// }

// interface OfficeDetail {
//   // 빌딩아이디
//   office_building_id: number;
//   // 좌석 예약 종류
//   open_desk: boolean;
//   partition: boolean;
//   isolation_room: boolean;
//   monitor_desk: boolean;
//   //공간 예약 종류
//   conf4: boolean;
//   conf8: boolean;
//   seminar_room: boolean;
//   studio: boolean;
//   // 공용 시설
//   lounge: boolean;
//   phone_booth: boolean;
//   relax_room: boolean;
//   oaroom: boolean;
//   snack_bar: boolean;
//   coffee: boolean;
//   postbox: boolean;
//   parking: boolean;
// }

// interface Coworker {
//   name: string;
// }
// // 리뷰
// interface Review {
//   reviewer: string;
//   rating: number;
//   content: string;
//   created_at: string;
// }
// // 소모임
// interface Club {
//   id: number;
//   title: string;
//   category: string;
//   created_at: string;
// }
// export interface OfficeBuilding {
//   building: Building;
//   office_detail: OfficeDetail;
//   coworkers: Coworker[];
//   reviews: {
//     created_at: any;
//     review_count: number;
//     avg_rating: number;

//     reviews: Review[];
//   };
//   // 소모임수
//   clubs: Club[];
//   membership: Membership;
//   reservation: Reservation;
// }

// export interface OfficeBuildingList {
//   officeBuildings: OfficeBuilding[];
// }

export interface OfficeDetail {
  office_building_id: number;
  open_desk: boolean;
  partition: boolean;
  isolation_room: boolean;
  monitor_desk: boolean;
  conf4: boolean;
  conf8: boolean;
  seminar_room: boolean;
  studio: boolean;
  lounge: boolean;
  phone_booth: boolean;
  relax_room: boolean;
  oaroom: boolean;
  snack_bar: boolean;
  coffee: boolean;
  postbox: boolean;
  parking: boolean;
}

export interface Review {
  rating: number;
  content: string;
  created_at: string; // Use string to represent date
}

export interface Reviews {
  review_count: number;
  avg_rating: number;
  reviews: Review[];
}

export interface Club {
  id: number;
  title: string;
  category: string;
  created_at: string;
}

export interface OfficeBuilding {
  id: number;
  location: string;
  region: string;
  city: string;
  street: string;
  address: string;
  open_hours: number;
  capacity: number;
  office_count: number;
  traffic_info: string;
  office_phone: string;
  latitude: number;
  longitude: number;
  image: string;
}

// 지점 개별조회
export interface OfficeBuildingDetail {
  office_building: OfficeBuilding;
  office_detail: OfficeDetail;
  reviews: Reviews;
  clubs: Club[];
}

// 평점
export interface Rating {
  avg_rating: number;
  count: number;
}

// 빌딩
export interface Building {
  buildingId: any;
  id: number;
  location: string;
  region: string;
  city: string;
  street: string;
  address: string;
  capacity: number;
  traffic_info: string;
  latitude: number;
  longitude: number;
  images: string;
}

// 전체 조회 안에
export interface OfficeBuildingSummary {
  building: Building;
  rating: Rating;
}

// 전체 조회
export interface OfficeBuildingsResponse {
  office_buildings: OfficeBuildingSummary[];
}
