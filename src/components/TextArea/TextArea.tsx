import { ChangeEventHandler } from 'react';
import { MainTheme } from '@src/config/theme';

interface ITextArea {
  alt?: string;
  maxLength?: number;
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  onChange: ChangeEventHandler<T>;
  value: string | readonly string[] | number;
  name?: string
  className?: string
} 

const TextArea = (props: ITextArea) => {
  const { className, ...rest} = props;
  return (
      <textarea 
        className={`rounded my-2 p-2 min-w-72 min-h-10 ${className}`}
        style={{
          backgroundColor: MainTheme.inputPrimaryColorBackground,
          color: MainTheme.inputPrimaryColorText
        }}
        {...rest} 
      />
  )
}

export default TextArea;