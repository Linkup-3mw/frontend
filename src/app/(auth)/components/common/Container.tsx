interface Props {
  children: React.ReactNode;
}

export default function Container({ children }: Props) {
  return (
    <div className="flex items-center justify-center min-w-[100vw] min-h-[100vh] p-[3.19rem] pt-[10rem]  bg-blue-100 box-border max-md:p-[1.25rem] max-md:pt-[4.875rem]">
      {children}
    </div>
  );
}
