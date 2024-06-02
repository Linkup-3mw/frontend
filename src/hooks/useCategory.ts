import { getIndustry, getOccupation } from '@/app/service/category';
import { useSuspenseQuery } from '@tanstack/react-query';

//산업군 전체 조회
export const useIndustryQuery = () => {
  return useSuspenseQuery({
    queryKey: ['industry'],
    queryFn: getIndustry,
    select: ({ data }) => data,
  });
};

//직종 전체 조회
export const useOccupationQuery = () => {
  return useSuspenseQuery({
    queryKey: ['occupation'],
    queryFn: getOccupation,
    select: ({ data }) => data,
  });
};
