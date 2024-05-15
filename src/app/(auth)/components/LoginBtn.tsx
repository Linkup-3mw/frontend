import { Control, useWatch } from 'react-hook-form';

const LoginBtn = ({ control }: { control: Control }) => {
  const email = useWatch({
    control,
    name: 'email',
  });
  const password = useWatch({
    control,
    name: 'password',
  });
  return (
    <button
      disabled={(!email || !password) && true}
      type="submit"
      className="blue_square_btn mb-4"
    >
      로그인
    </button>
  );
};
export default LoginBtn;
