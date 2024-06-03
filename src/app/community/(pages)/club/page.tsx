import Club from '@components/club/Club';
import { Suspense } from 'react';

export default function ClubPage() {
  return (
    <Suspense>
      <Club></Club>
    </Suspense>
  );
}
