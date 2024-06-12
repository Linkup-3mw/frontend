export interface ClubCardProps {
  hasMatch: boolean;
  id: number;
  member_id: number;
  member_name: string;
  profile_image: string;
  title: string;
  introduction: string;
  detail_introduction: string;
  club_thumbnail: string;
  club_type: string;
  recruit_count: number;
  club_members: ClubMember[];
  club_meetings: ClubMeeting[];
  liked: boolean;
}

export interface ClubMember {
  club_id: number;
  member_id: number;
  member_name: string;
  profile_image: string | null;
  introduction: string;
}

export interface ClubMeeting {
  title: string;
  date: string;
  meetingLocation: string;
  maxCapacity: number;
  fee: number;
}
