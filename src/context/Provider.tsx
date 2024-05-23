'use client';

import { RecoilRoot } from 'recoil';
import AuthContext, { Props } from './AuthContext';

export default function RecoilProvider({ children }: Props) {
  return (
    <RecoilRoot>
      <AuthContext>{children}</AuthContext>
    </RecoilRoot>
  );
}
