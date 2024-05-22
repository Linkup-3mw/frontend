import React from 'react';

interface Props {
  children: React.ReactNode;
}
export default function ContentWrap({ children }: Props) {
  return (
    <div className="mx-auto max-w-[95rem] w-full box-border bg-slate-400">
      {children}
    </div>
  );
}
