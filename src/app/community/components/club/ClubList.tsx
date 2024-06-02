import ClubCard, { ClubCardProps } from '@components/club/ClubCard';

interface ClubListProps {
  clubs: ClubCardProps[];
}

export default function ClubList({ clubs }: ClubListProps) {
  return (
    <div className="grid grid-cols-4 gap-[2rem] mt-8">
      {clubs.map((club, index) => (
        <ClubCard key={index} {...club} />
      ))}
    </div>
  );
}
