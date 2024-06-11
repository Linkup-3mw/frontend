import { getSession } from 'next-auth/react';

export async function fetchServerSession() {
  const session = await getSession();
  return session;
}
