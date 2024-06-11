import { Suspense } from 'react';
import { fetchServerSession } from '@/utils/session';
import ClubMain from '../../components/club/ClubMain';

export default async function ClubPage() {
  const session = await fetchServerSession();

  return (
    <Suspense>
      <ClubMain />
    </Suspense>
  );
}
