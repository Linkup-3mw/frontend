'use client';
import { useMobileLayout } from '@/app/(search)/map/hooks/mobile/useMobileLayout';
import Consulting from './components/Consulting';
import ConsultingMobile from './components/mobile/ConsultingMobile';
import { useRecoilValue } from 'recoil';
import { mobileReservationLayoutState } from '../../atom/media';

export default function ConsultingPage() {
  return <Consulting />;
}
