'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '../pages/searchBar'; // Updated import path for SearchBar
import HouseView from '../pages/houseView'; // Updated import path for HouseView
import Card from '../pages/card'; // Updated import path for Card

export default function Home(): JSX.Element {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showCard, setShowCard] = useState(true); // State to control the visibility of the Card component

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    // Example logic to update searchResults based on searchTerm
    if (searchTerm) {
      setShowCard(false);
      console.log('Search results:', searchTerm);
    } else {
      setSearchResults([]); // Clear searchResults if searchTerm is empty
      setShowCard(true);
    }
  }, [searchTerm]);

  return (
    <div className='container flex justify-center items-center'>
      <div className='w-full justify-center items-center'>
        <SearchBar handleInputChange={handleInputChange} /> {/* Pass handleInputChange function to SearchBar */}
        <HouseView searchTerm={searchTerm} /> {/* Pass searchResults to HouseView */}
        {showCard && <Card />} {/* Render the Card component only when showCard is true */}
        <Link href="/addHouse">Add House</Link>
      </div>
    </div>
  );
}