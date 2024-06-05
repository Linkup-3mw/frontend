import ClubCard, { ClubCardProps } from '@components/club/ClubCard';

interface ClubListProps {
  clubs: ClubCardProps[];
}

export default function ClubList({ clubs }: ClubListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-[2rem] gap-4 md:mt-8 mt-4">
      {clubs.map((club, index) => (
        <ClubCard key={index} {...club} />
      ))}
    </div>
  );
}
