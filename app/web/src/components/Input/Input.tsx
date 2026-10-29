import { ChangeEventHandler } from 'react';
import { MainTheme } from '@src/config/theme';

interface IInput {
  alt?: string;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange: ChangeEventHandler<T>;
  onClick?: () => void;
  value: string | readonly string[] | number;
  name?: string
  secret?: boolean
  divClassName?: string;
  inputClassName?: string
} 

export const Input = (props: IInput) => {

  const { secret, divClassName, inputClassName, onClick, ...restProps} = props;
  return (
    <div className={divClassName} onClick={onClick}>
      <input type={secret ? 'password' : 'text'}
        {...restProps} 
        className={`rounded my-2 p-2 min-w-72 min-h-10 ${inputClassName}`}
        style={{
          backgroundColor: MainTheme.inputPrimaryColorBackground,
          color: MainTheme.inputPrimaryColorText
        }}
      />
    </div>
  )
}
