'use client' 

import { CSSProperties, MouseEventHandler, useState } from 'react';
import { MainTheme } from '@config/theme';

export enum ButtonTypeEnum {
  // eslint-disable-next-line no-unused-vars
  FILLED = 'FILLED',
  // eslint-disable-next-line no-unused-vars
  OUTLINED = 'OUTLINED'
}
interface IButton {
  alt?: string;
  value?: string;
  type: 'button' | 'reset' | 'submit';
  buttonStyle?: ButtonTypeEnum,
  style?: CSSProperties;
  className?: string,
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

  const buttonStyle = props.buttonStyle === ButtonTypeEnum.OUTLINED ? {
    color: MainTheme.buttonPrimaryColorText,
    borderColor: MainTheme.buttonPrimaryColorBackground,
    borderWidth: 2
  } : {
    backgroundColor: MainTheme.buttonPrimaryColorBackground,
    color: MainTheme.buttonPrimaryColorText,
  }

  return (
    <div>
      <input
        {...props}
        className={`rounded my-2 p-2 min-w-72 min-h-10 ${props.className}`}
        style={{
          ...buttonStyle,
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
