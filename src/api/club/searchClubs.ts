import axios, { AxiosResponse } from 'axios';

interface Club {
  id: number;
  member_id: number;
  member_name: string;
  profile_image: string | null;
  title: string;
  introduction: string;
  club_thumbnail: string | null;
  club_type: string;
  recruit_count: number;
  club_members: any[] | null;
  club_meetings: any[] | null;
}

interface SearchClubsResponse {
  status_code: number;
  message: string;
  status: string;
  data: {
    content: Club[];
    pageable: {
      page_number: number;
      page_size: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      unpaged: boolean;
      paged: boolean;
    };
    total_elements: number;
    last: boolean;
    total_pages: number;
    first: boolean;
    number_of_elements: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    number: number;
    size: number;
    empty: boolean;
  };
  success: boolean;
}

const BASE_URL = 'https://api.linkup3mw.com/api/v1';

interface SearchClubsQuery {
  location?: string;
  category?: string[];
  'no-coworker'?: boolean;
  size?: number;
  page?: number;
}

export async function searchClubs(
  query: SearchClubsQuery,
): Promise<SearchClubsResponse> {
  try {
    const response: AxiosResponse<SearchClubsResponse> = await axios.get(
      `${BASE_URL}/club/search`,
      {
        params: query,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error searching clubs:', error);
    throw error;
  }
}
