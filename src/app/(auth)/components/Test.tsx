'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Test() {
  const { data: session } = useSession();

  return (
    <>
      {session && (
        <>
          {session.user?.email}
          <button
            className="block w-3 bg-yellow-100"
            onClick={() => signOut({ callbackUrl: '/' })}
          >
            logout
          </button>
        </>
      )}
    </>
  );
}
