interface Props {
  fillColor?: string;
}
const CircleWithCheck = ({ fillColor = '#D0D0D8' }: Props) => {
  return (
    <svg
      className="peer-has-[:checked]:hidden bg-red"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32C7.16344 32 0 24.8366 0 16Z"
        fill={fillColor}
      />
      <path d="M8 15L14 21L24 11" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};

export default CircleWithCheck;
