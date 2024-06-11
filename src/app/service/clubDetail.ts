import {
  IClubBoardListData,
  IClubInfo,
  IRegistMeetingData,
} from '@/types/club/detail/clubDetail';
import API from '@/utils/axios';
import { notFound } from 'next/navigation';
import { cache } from 'react';

//소모임 상세 정보 조회
export const getClubDetailInfo = cache(
  async (club_id: number): Promise<IClubInfo | undefined> => {
    try {
      const res = await API.get(`/club/${club_id}`);
      console.log('detail data', res.data.data);
      return res.data.data;
    } catch (e: any) {
      const status = e.response.status;
      if (status === 404) {
        notFound();
      } else {
        console.error(e);
      }
    }
  },
);

// 소모임 공지사항, 게시판 목록 조회
export const getClubBoardList = async (
  club_id: number,
  type: string,
): Promise<IClubBoardListData | undefined> => {
  try {
    const res = await API.get(`/club/${club_id}/${type}`);
    console.log('목록조회', res.data);
    console.log(res.data);
    return res.data;
  } catch (e: any) {
    const status = e.response.status;
    if (status === 403) {
      throw new Error('로그인 후 이용 가능합니다.');
    }
    if (status === 500) {
      throw new Error('서버에 오류가 발생했습니다.');
    }
  }
};

// 소모임 공지사항, 게시판 상세 조회
export const getClubBoardDetail = cache(
  async (club_id: number, post_id: number) => {
    try {
      const res = await API.get(`/club/${club_id}/post/${post_id}`);
      console.log(res.data);
      return res.data.data;
    } catch (e: any) {
      console.error(e);
      if (e.response.status === 404) {
        notFound();
      }
      if (e.response.status === 500) {
        console.error(e.response);
        // throw new Error('서버에서 오류가 발생했습니다.');
      }
    }
  },
);

//소모임 공지사항, 게시판 삭제
export const deleteBoard = async (club_id: number, notice_id: number) => {
  try {
    const res = await API.delete(`/club/${club_id}/post/${notice_id}`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

//소모임 찜 하기
export const setClubLiked = async (club_id: number) => {
  try {
    const res = await API.post(`/club/${club_id}/like`);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// 멤버십 가입 여부 확인
export const getMyMembership = cache(async () => {
  try {
    const res = await API.get(`/reservation/my-membership`);
    console.log('membership', res.data.data);
    // true, false로 구분
    return res.data.data.length > 0;
  } catch (e) {
    console.error(e);
  }
});

export const registerMeeting = async (
  club_id: number,
  params: IRegistMeetingData,
) => {
  try {
    const res = await API.post(`/club/${club_id}/meeting`, params);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// 소모임 공지, 게시판 댓글 등록
export const registerComment = async (
  club_id: number,
  notice_id: number,
  type: string,
  comment: string,
) => {
  try {
    const res = await API.post(`/club/${club_id}/post/${notice_id}/comment`, {
      comment,
    });
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
