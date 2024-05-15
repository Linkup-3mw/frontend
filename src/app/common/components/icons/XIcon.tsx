interface Props {
  size?: string;
}
const XIcon = ({ size = '14' }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.99823 8.06039L1.19738 13.8612L0.136719 12.8006L5.93757 6.99973L0.137166 1.19933L1.19783 0.138672L6.99823 5.93907L12.7986 0.138672L13.8593 1.19933L8.05889 6.99973L13.8597 12.8006L12.7991 13.8612L6.99823 8.06039Z"
        fill="#171717"
      />
    </svg>
  );
};
export default XIcon;
