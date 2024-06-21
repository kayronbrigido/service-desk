import { ChangeEventHandler } from 'react';

interface IInput {
  alt?: string;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange?: ChangeEventHandler<T>;
  value?: string | readonly string[] | number;
  name?: string
} 

const Input = (props: IInput) => {

  return (
    <div>
      <input type='text' {...props} className='rounded'/>
    </div>
  )
}

export default Input;