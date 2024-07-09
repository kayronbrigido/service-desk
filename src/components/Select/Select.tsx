import { MainTheme } from '@src/config/theme';
import React, { useState } from 'react';

interface ISelectProps {
  title?: string,
  items: string[];
  onChange: (selectedItem: string) => void;
}

const Select = ({ title, items, onChange }: ISelectProps) => {
  const [selectedItem, setSelectedItem] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedItem(value);
    onChange(value);
  };

  return (
    <div>
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
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
