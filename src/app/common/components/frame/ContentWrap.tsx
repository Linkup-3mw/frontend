import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}
export default function ContentWrap({ children, className }: Props) {
  return (
    <div className={`mx-auto max-w-[95rem] w-full box-border ${className}`}>
      {children}
    </div>
  );
}
