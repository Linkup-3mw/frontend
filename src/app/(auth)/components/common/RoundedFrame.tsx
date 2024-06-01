interface Props {
  children: React.ReactNode;
}

export default function RoundedFrame({ children }: Props) {
  return (
    <div className="max-w-[46.75rem] w-full p-10 box-border rounded-3xl bg-blue-50 shrink-0">
      {children}
    </div>
  );
}
