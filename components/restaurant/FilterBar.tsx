import React from 'react';

type FilterOption = {
  id: string;
  label: string;
};

interface FilterBarProps {
  options: FilterOption[];
  selectedOption: string;
  onChange: (id: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ options, selectedOption, onChange }) => {
  return (
    <div className="flex overflow-x-auto py-3 px-4 gap-2 no-scrollbar">
      {options.map((option) => (
        <button
          key={option.id}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium ${
            selectedOption === option.id
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;