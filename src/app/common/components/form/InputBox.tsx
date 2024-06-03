interface Props {
  text: string;
  errorMsg?: any;
  msg?: string;
  children: React.ReactNode;
}
export default function InputBox({ children, text, errorMsg, msg }: Props) {
  return (
    <div className="mb-[2.5rem] max-md:mb-[1.5rem] max-md:[&_>_i]:break-keep max-md:[&_>_i]:leading-[1.5]">
      <label
        className={`block text-[1.25rem] font-bold  text-main-black leading-none max-md:text-[0.875rem]`}
      >
        {text}
        {children}
      </label>
      {errorMsg && (
        <i
          className={`block text-[#ff513f] text-[0.875rem] not-italic leading-none max-md:text-[0.75rem] max-md:px-[1rem]`}
        >
          {errorMsg}
        </i>
      )}
      {msg && (
        <i className="block text-blue-600 text-[0.875rem] not-italic leading-none max-md:text-[0.75rem] max-md:px-[1rem]">
          {msg}
        </i>
      )}
    </div>
  );
}
