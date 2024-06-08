import { number } from 'zod';

//사용자멤버십전체조회
export interface Membership {
  // id: number;
  // location: string;
  description: string[];
  type: string;
  duration: number | null;
  // start_date: string;
  // end_date: string;
  price: number;
}
export interface Reservation {
  id: number;
  start_date: string;
  end_date: string;
  seat: SeatReservation[];
  space: SpaceReservation[];
}
export interface SeatReservation {
  start_date?: string;
  end_date?: string;
  type?: string;
  code?: string;
  month?: number;
}
export interface SpaceReservation {
  type?: string;
  code?: string;
  start_date?: string;
  end_date?: string;
  price?: number;
  start_time?: string;
  end_time?: string;
}
export interface OnePassMembership {
  seat: SeatReservation[];
  space: SpaceReservation[];
}

//남은 좌석 주머니
export interface Remaining {
  id: string;
  type: string;
  code: string;
  available: boolean | null;
  am: string[];
  pm: string[];
  //am,pm 추가
}
export interface CompanyEnter {
  name: string;
  manager_phone: string;
  manager_email: string;
  consent_contact: boolean;
  consent_promotion: boolean;
}
export interface EnterpriseMembership {
  location: string;
  duration: number | null;
  start_date: string;
  end_date: string;
  staff_count: number;
  price: number;
}
export interface EnterPriseResponse {
  company_membership: EnterpriseMembership;
  company: CompanyEnter;
}
