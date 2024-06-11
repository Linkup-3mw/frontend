import { Suspense } from 'react';
import ClubMain from '@components/club/ClubMain';

export default async function ClubPage() {
  return (
    <Suspense>
      <ClubMain />
    </Suspense>
  );
}
