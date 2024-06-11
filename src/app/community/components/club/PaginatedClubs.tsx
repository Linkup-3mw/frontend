import { ClubCardProps } from '@components/club/ClubCard';

interface PaginatedClubsProps {
  clubs: ClubCardProps[];
  currentPage: number;
  itemsPerPage: number;
}

export default function PaginatedClubs({
  clubs,
  currentPage,
  itemsPerPage,
}: PaginatedClubsProps) {
  const indexOfLastClub = currentPage * itemsPerPage;
  const indexOfFirstClub = indexOfLastClub - itemsPerPage;
  return clubs.slice(indexOfFirstClub, indexOfLastClub);
}
