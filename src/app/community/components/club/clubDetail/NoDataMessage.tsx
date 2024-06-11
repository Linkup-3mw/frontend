interface Props {
  message?: string;
}

export default function NoDataMessage({
  message = '데이터가 존재하지 않습니다.',
}: Props) {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <p className="text-blue-400">{message}</p>
    </div>
  );
}
