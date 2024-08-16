import { ReactNode } from 'react';
import Button from './Button';

type SearchBarWithButtonProps = {
  query: string;
  buttonMessage: string;
  buttonIcon: ReactNode;
  placeholder?: string;
  ariaLabel?: string;
  setQuery: (query: string) => void;
  onButtonClick?: () => void;
};

export default function SearchBarWithButton({
  query,
  buttonMessage,
  buttonIcon,
  placeholder,
  ariaLabel,
  setQuery,
  onButtonClick,
}: SearchBarWithButtonProps) {
  return (
    <div className='card container p-2'>
      <div className='d-flex flex-row'>
        <div className='input-group p-2'>
          <input
            type='text'
            className='form-control'
            aria-label={ariaLabel ?? 'Text input with dropdown button'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder ?? 'Buscar por clave o nombre'}
          />
        </div>

        <Button
          text={buttonMessage}
          trailingIcon={buttonIcon}
          onClick={onButtonClick}
        />
      </div>
    </div>
  );
}
