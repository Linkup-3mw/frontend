interface Props {
  text: string;
  errorMsg?: any;
  msg?: string;
  children: React.ReactNode;
}
export default function InputBox({ children, text, errorMsg, msg }: Props) {
  return (
    <div className="mb-[2.5rem]">
      <label
        className={`block text-[1.25rem] font-bold  text-main-black leading-none`}
      >
        {text}
        {children}
      </label>
      {errorMsg && (
        <i
          className={`block text-[#ff513f] text-[0.875rem] not-italic leading-none`}
        >
          {errorMsg}
        </i>
      )}
      {msg && (
        <i className="block text-blue-600 text-[0.875rem] not-italic leading-none">
          {msg}
        </i>
      )}
    </div>
  );
}
