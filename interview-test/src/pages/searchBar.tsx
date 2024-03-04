import React from 'react';

interface SearchBarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleInputChange }) => {
  return (
    <div className='flex justify-center'>
    <input className='w-full p-2 border border-gray-300 rounded-md mb-4 mt-4'
      type="text"
      onChange={handleInputChange}
      placeholder="Enter house name"
    />
    </div>
  );
};

export default SearchBar;