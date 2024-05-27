'use client';
import { SessionProvider } from 'next-auth/react';

export type Props = {
  children: React.ReactNode;
};
export default function AuthContext({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
