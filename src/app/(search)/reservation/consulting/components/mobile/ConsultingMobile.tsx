import {
  minDeskLayoutState,
  mobileReservationLayoutState,
} from '@/app/(search)/atom/media';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function ConsultingMobile() {
  const [isUp, setIsUp] = useState(false);
  const isMobile = useRecoilValue(mobileReservationLayoutState);
  const minDesk = useRecoilValue(minDeskLayoutState);
  return <>{isMobile && <div>Consulting</div>}</>;
}
