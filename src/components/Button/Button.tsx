import { CSSProperties, MouseEventHandler, useState } from 'react';
import { MainTheme } from '@config/theme';

interface IButton {
  alt?: string;
  value?: string;
  type: 'button' | 'reset' | 'submit';
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLInputElement>;
}

const Button = (props: IButton) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => {
    setIsPressed(true);
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  return (
    <div>
      <input
        {...props}
        className='rounded my-2 p-2 min-w-72 min-h-10'
        style={{
          backgroundColor: MainTheme.buttonPrimaryColorBackground,
          color: MainTheme.buttonPrimaryColorText,
          cursor: 'pointer',
          transform: isPressed ? 'scale(0.95)' : 'scale(1)',
          transition: 'transform 0.1s ease-in-out',
          ...props.style,
        }}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      />
    </div>
  );
};

export default Button;
