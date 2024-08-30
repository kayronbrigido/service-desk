import { ChangeEventHandler } from 'react';
import { MainTheme } from '@src/config/theme';

interface IInput {
  alt?: string;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange: ChangeEventHandler<T>;
  value: string | readonly string[] | number;
  name?: string
  secret?: boolean
} 

const Input = (props: IInput) => {

  const { secret, ...restProps} = props;
  return (
    <div>
      <input type={secret ? 'password' : 'text'}
        {...restProps} 
        className='rounded my-2 p-2 min-w-72 min-h-10'
        style={{
          backgroundColor: MainTheme.inputPrimaryColorBackground,
          color: MainTheme.inputPrimaryColorText
        }}
      />
    </div>
  )
}

export default Input;