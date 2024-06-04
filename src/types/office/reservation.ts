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
