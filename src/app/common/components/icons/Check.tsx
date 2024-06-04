interface Props {
  color?: string;
}

const Check = ({ color = '#B9B9C3' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className="w-full h-full"
    >
      <path d="M8 15L14 21L24 11" stroke={color} strokeWidth="1.5" />
    </svg>
  );
};

export default Check;
