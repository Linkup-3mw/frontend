export interface SearchInputProps {
  placeholder?: string;
  className?: string;
}

export default function SearchInput({
  placeholder,
  className,
}: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:outline-none focus:border-blue-300 mb:h-[2.5rem]"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
        <img
          src="/svg/club/search.svg"
          alt="Search Icon"
          className="w-6 h-6 mr-1"
        />
      </div>
    </div>
  );
}
