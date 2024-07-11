import React, { useState } from 'react';
import { MainTheme } from '@src/config/theme';

interface ISelectProps {
  title?: string,
  items: IItem[];
  onChange: (selectedItem: string | number) => void;
}

interface IItem {
  name: string,
  value: string | number
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
          <option key={item.value} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
