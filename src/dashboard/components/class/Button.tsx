import { ReactNode } from 'react';

type ButtonProps = {
  text: string;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  onClick?: () => void;
};

export default function Button({
  text,
  leadingIcon,
  trailingIcon,
  onClick,
}: ButtonProps) {
  return (
    <button
      type='button'
      className='btn btn-primary m-2 d-flex align-items-center justify-constent-center'
      onClick={onClick}
    >
      {leadingIcon}
      {text}
      {trailingIcon}
    </button>
  );
}
