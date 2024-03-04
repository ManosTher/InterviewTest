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
    if (searchTerm) {
      setShowCard(false); // Hide the Card component if searchTerm is not empty
    } else {
      setShowCard(true); // Show the Card component if searchTerm is empty
    }

  }, [searchTerm]);

  return (
    <div className='flex justify-center items-center'>
      <div className='w-full md:w-1/3'>
        <SearchBar handleInputChange={handleInputChange} /> {/* Pass handleInputChange function to SearchBar */}
        <HouseView searchTerm={searchTerm} /> {/* Pass searchResults to HouseView */}
        {showCard && <Card />} {/* Display Card component if searchTerm is not empty */}

      </div>
    </div>
  );
}

// <Link href="/addHouse">Add House</Link>