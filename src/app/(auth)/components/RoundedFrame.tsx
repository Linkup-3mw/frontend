interface Props {
  children: React.ReactNode;
}

export default function RoundedFrame({ children }: Props) {
  return <div className="p-10 rounded-3xl bg-blue-50">{children}</div>;
}
