import ClubList from '@components/club/ClubList';
import Pagination from '@components/club/Pagination';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ClubCardProps } from '@components/club/ClubCard';

interface RenderClubsProps {
  clubs: ClubCardProps[];
  totalItems: number;
  showPagination: boolean;
}

export default function RenderClubs({
  clubs,
  totalItems,
  showPagination,
}: RenderClubsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const itemsPerPage = 24;
  const [currentPage, setCurrentPage] = useState<number>(1);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    router.push(`?page=${pageNumber}`);
    const params = new URLSearchParams(searchParams);
    params.set('page', `${pageNumber}`);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <ClubList clubs={clubs} />
      {showPagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </>
  );
}
