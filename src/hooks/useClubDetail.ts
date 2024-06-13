import { getClubDetailInfo } from '@/app/service/clubDetail';
import {
  IClubBoardListData,
  IClubMeetingListData,
} from '@/types/club/detail/clubDetail';
import API from '@/utils/axios';
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';

//소모임 상세 정보 조회
export const useClubDetailInfoQuery = (club_id: number) => {
  return useQuery({
    queryKey: ['clubDetail', club_id],
    queryFn: async () => await getClubDetailInfo(club_id),
  });
};

//소모임 공지사항, 게시판 목록 조회
export const useClubBoardListQuery = (club_id: number, type: string) => {
  return useInfiniteQuery<{ data: IClubBoardListData }>({
    queryKey: ['clubBoardList', club_id, type],
    queryFn: async ({ pageParam }) => {
      const res = await API.get(`/club/${club_id}/${type}?page=${pageParam}`);
      return res.data;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalPages = lastPage.data.total_pages - 1;
      const currentPage = allPages.length - 1;
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
  });
};
//소모임 공지사항, 게시판 목록 조회
// export const useClubBoardListQuery = (club_id: number, type: string) => {
//   return useQuery({
//     queryKey: ['clubBoardList', club_id, type],
//     queryFn: async (): Promise<IClubBoardListData | undefined> => {
//       try {
//         const res = await API.get(`/club/${club_id}/${type}`);
//         console.log('공지 게시판 목록 조회', res.data.data);
//         return res.data.data;
//       } catch (e: any) {
//         console.log(e);
//       }
//     },
//   });
// };

//소모임 정모 목록 조회
export const useClubMeetingListQuery = (club_id: Number) => {
  return useQuery({
    queryKey: ['clubMeetingList', club_id],
    queryFn: async (): Promise<IClubMeetingListData | undefined> => {
      try {
        const res = await API.get(`/club/${club_id}/meeting`);
        return res.data.data;
      } catch (e: any) {
        console.log(e);
      }
    },
  });
};
