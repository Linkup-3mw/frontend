import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  rsInfoState,
  selectedMembershipId,
  userReservationList,
  selectedOfficeId,
  userMembershipListState,
} from '@/app/(search)/atom/membership';
import API from '@/utils/axios';
import Image from 'next/image';
import { mobileReservationLayoutState } from '@/app/(search)/atom/media';

export default function UserSearchRList() {
  return <div>안녕</div>;
}
