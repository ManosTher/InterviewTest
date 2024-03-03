import React from 'react';

interface SearchBarProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ handleInputChange }) => {
  return (
    <input
      type="text"
      onChange={handleInputChange}
      placeholder="Enter house name"
    />
  );
};

export default SearchBar;