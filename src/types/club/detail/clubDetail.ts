export interface IClubInfo {
  id: number;
  member_id: number;
  member_name: string;
  member_username: string;
  profile_image: string;
  title: string;
  introduction: string;
  club_type: string;
  recruit_count: number;
  club_members: any[]; //타입 추후 수정
  // club_members: IClubMember[];
  club_meetings: { date: string }[];
  liked: boolean;
  detail_introduction: string;
}

export interface IClubMember {
  club_id: number;
  member_id: number;
  member_name: string;
  profile_image: string;
  introduction: string;
  ishost?: boolean | undefined;
}

// VISITOR = 멤버십 없음
export type ClubMemberType = 'NONE_MEMBER' | 'MEMBER' | 'HOST' | 'VISITOR';

export interface ITabList {
  id: number;
  name: string;
  path: TabMenuType;
}

export type TabMenuType = 'notice' | 'board' | 'meeting' | '';

export interface IClubBoardList {
  writer_id: number;
  writer_name: string;
  writer_username: string;
  writer_occupation?: string;
  writer_thumbnail: string | null;
  content: string;
  date?: string;
  id: number;
  title: string;
  type: string;
  comments?: any[];
}

export interface IClubBoardListData {
  content: IClubBoardList[];
  first: boolean;
  last: boolean;
  pageable: {
    offset: number;
    page_number: number;
    page_size: number;
    paged: boolean;
  };
  total_pages: number;
}

//타입 수정해
export interface IClubMeetingList {
  [key: string]: any;
}

export interface IClubMeetingListData {
  [key: string]: any;
}

export interface IMeetingData {
  id: number;
  title: string;
  date: string;
}

export interface IRegistMeetingData {
  title: string;
  date: string;
  meeting_location: string;
  max_capacity: number;
  fee: number;
}

export interface IMeetingData {
  date: string;
  fee: number;
  id: number;
  max_capacity: number;
  meeting_location: string;
  member_image: string;
  member_name: string;
  title: string;
}

export interface IBoardComment {
  comment_id: number;
  comment: string;
  club_notice_id: number;
  club_member_id: number;
  club_member_username: string;
  club_member_thumbnail: string;
  club_member_occupation: string;
}
