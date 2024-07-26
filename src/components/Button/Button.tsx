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
  value: string;
  type: 'button' | 'reset' | 'submit';
  buttonStyle?: ButtonTypeEnum,
  style?: CSSProperties;
  className?: string,
  onClick: MouseEventHandler<HTMLInputElement>;
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
  
  const {buttonStyle, ...rest} = props;
  props = rest;

  const buttonStyles = buttonStyle === ButtonTypeEnum.OUTLINED ? {
    color: MainTheme.buttonPrimaryColorText,
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
          ...buttonStyles,
          borderWidth: 2,
          borderColor: MainTheme.buttonPrimaryColorBackground,
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
