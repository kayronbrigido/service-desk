'use client'

import React, { useState } from 'react';
import { MainTheme } from '@src/config/theme';

interface ISelectProps {
  title?: string,
  items: IItem[];
  // eslint-disable-next-line no-unused-vars
  onChange: (selectedItem: string | number) => void;
  testId?: string
}

interface IItem {
  name: string,
  value: string | number
}

const Select = ({ title, items, testId, onChange }: ISelectProps) => {
  const [selectedItem, setSelectedItem] = useState<string>('');
  const [isHide, setIsHide] = useState(true);

  const handleChange = (value: string | number) => {
    setSelectedItem(items.find((item) => item.value === value)?.name ?? '');
    onChange(value);
    setIsHide(true)
  };

  return (
    <div className='rounded my-2 min-w-72 min-h-10' data-testId={testId}
      onClick={() => setIsHide(!isHide)}
      style={{
        backgroundColor: MainTheme.inputPrimaryColorBackground,
        color: MainTheme.inputPrimaryColorText,
      }}>
      <div className="p-2">
        <span>{selectedItem || title}</span>
      </div>
      <div className="flex flex-col content" style={{ position: 'absolute', zIndex: 99, display: isHide ? 'none' : 'flex' }}>
        {items.map((item) => (
          <span
            data-testId={`${testId}Option${item.value}`}
            onClick={() => handleChange(item.value)}
            className='rounded min-w-72 min-h-10 p-2'
            key={item.value}
            style={{
              backgroundColor: MainTheme.inputPrimaryColorBackground,
              color: MainTheme.inputPrimaryColorText
            }}>
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Select;

/*

 <select value={selectedItem}
        onChange={handleChange}
        className='rounded my-2 p-2 min-w-72 min-h-10'
        style={{
          backgroundColor: MainTheme.inputPrimaryColorBackground,
          color: MainTheme.inputPrimaryColorText
        }}
      >
        <option value="" disabled>
          {title}
        </option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>

*/