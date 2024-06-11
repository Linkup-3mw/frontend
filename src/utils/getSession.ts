'use server';
import { authOptions } from '@/app/api/auth/authOptions';
import { getServerSession } from 'next-auth';

export async function getSession() {
  return await getServerSession(authOptions);
}
