interface Props {
  className?: string;
}

export const CalenderIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <path
        d="M5 9.5V16.5C5 18.1569 6.34315 19.5 8 19.5H17C18.6569 19.5 20 18.1569 20 16.5V9.5M5 9.5V7.5C5 5.84315 6.34315 4.5 8 4.5H17C18.6569 4.5 20 5.84315 20 7.5V9.5M5 9.5H20"
        stroke="#51515D"
      />
      <path d="M8.75 2.5V6.75M16.25 2.5V6.75" stroke="#51515D" />
    </svg>
  );
};

export const LocationIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <path
        d="M5.50006 8.62791C5.50006 4.96742 8.63406 2 12.5 2C16.366 2 19.5 4.96742 19.5 8.62791C19.5 13.4884 17.2898 17.0164 12.5 21C7.8613 16.2075 5.50006 13.4884 5.50006 8.62791Z"
        stroke="#51515D"
      />
      <path
        d="M16 9C16 10.933 14.433 12.5 12.5 12.5C10.567 12.5 9 10.933 9 9C9 7.067 10.567 5.5 12.5 5.5C14.433 5.5 16 7.067 16 9Z"
        stroke="#51515D"
      />
    </svg>
  );
};

export const MoneyIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <circle cx="12.5" cy="12" r="9" stroke="#51515D" />
      <path
        d="M7.7 9L8.9 12M17.3 9L16.1 12M8.9 12L10.1 15L12.5 9L14.9 15L16.1 12M8.9 12H6.5M16.1 12H18.5"
        stroke="#51515D"
        strokeLinejoin="bevel"
      />
    </svg>
  );
};

export const MemberIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <path
        d="M15 14C18.5912 14 21.5 16.685 21.5 20L8.5 20C8.5 16.685 11.4088 14 15 14Z"
        fill="white"
        stroke="#51515D"
      />
      <path
        d="M10 14C13.5913 14 16.5 16.685 16.5 20L3.5 20C3.5 16.685 6.40875 14 10 14Z"
        fill="white"
        stroke="#51515D"
      />
      <circle cx="15" cy="7.5" r="3.5" fill="white" stroke="#51515D" />
      <circle cx="10" cy="7.69922" r="3.5" fill="white" stroke="#51515D" />
    </svg>
  );
};

export const SpeakerIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M5.3 4.88H2V10.64H3.1M5.3 4.88V10.64M5.3 4.88L13 2V12.56L7.5 11.1886L6.5 10.9392M5.3 10.64H3.1M5.3 10.64L6.5 10.9392M3.1 10.64V14H6.5V10.9392"
        stroke="#171717"
      />
    </svg>
  );
};

export const CommentIcon = ({ className }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      className={className}
    >
      <path
        d="M18.9357 20.0078L13.4921 14.5643L13.4921 12.7497L20.7502 12.7497L20.7502 20.0078L18.9357 20.0078Z"
        fill="#97BAFE"
        stroke="#171717"
      />
      <path
        d="M4.25 5.25H20.75V15.75H4.25V5.25Z"
        fill="#97BAFE"
        stroke="#171717"
      />
      <rect x="8" y="9.75" width="1.5" height="1.5" fill="#171717" />
      <rect x="11.75" y="9.75" width="1.5" height="1.5" fill="#171717" />
      <rect x="15.5" y="9.75" width="1.5" height="1.5" fill="#171717" />
    </svg>
  );
};
