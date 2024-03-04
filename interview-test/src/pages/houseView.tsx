import React, { useState, useEffect } from 'react';
import { getHouseByName } from '../service/apiService';
import SpinnerProps from '../pages/spinner'; 

interface HouseViewProps {
    searchTerm: string;
  }
export default function HouseView({ searchTerm }: HouseViewProps): JSX.Element {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [noMatching, setNoMatching] = useState('No matching houses');
    let matchingHouses = []; // Declare matchingHouses in the outer scope of the useEffect

    console.log('Search results state:', searchTerm);
    
    
    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          if (searchTerm) {
            try {
              const result = await getHouseByName(searchTerm);
              const matchingHouses = result.filter((house: any) =>
                house.name.toLowerCase().includes(searchTerm.toLowerCase())
              );
              console.log('Matching houses:', matchingHouses);
              setSearchResults(matchingHouses);
              setNoMatching(''); // Clear the no matching message when there are matching houses
            } catch (error) {
              console.error('Error:', error);
              setNoMatching('Error fetching houses'); // Set error message if there's an error fetching data
            }
            setLoading(false);
          } else {
            setSearchResults([]);
            console.log(searchResults, 'Search term is empty');
            setNoMatching('');            
            }            
        };
        
        fetchData(); // Fetch data when the component mounts or when the searchTerm changes
      }, [searchTerm]);
    
      useEffect(() => {
        if ( searchTerm.length > 0 &&  searchResults.length === 0) {
            setNoMatching('No matching houses');
            setLoading(true);      
        }
      })

      
    function isValidColor(color: string) {
        const colorNames = [
            'white', 'black', 'silver', 'gray', 'red', 'maroon', 'yellow', 'olive',
            'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'
        ];

        if (colorNames.includes(color.toLowerCase())) {
            return true;
        }

        const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        if (hexColorRegex.test(color)) {
            return true;
        }

        return false;
    }
    
    return (

        <div>
            {noMatching}
            {loading === true && searchTerm.length > 0 && <SpinnerProps /> } {  }
            {searchResults.length > 0 &&  (
                <div>
                    <h2>Matching Houses</h2>
                    {searchResults.map((house: any) => {
                        const colors = house.houseColours.split(" and ");
                        let gradientColors = colors.join(', ');

                        const invalidColors = colors.filter((color: string) => !isValidColor(color));
                        if (invalidColors.length > 0) {
                            gradientColors = 'white, black';
                        }

                        return (
                            <div key={house.id} className="w-full p-2 border border-gray-300 rounded-md mb-4 shadow-xl">
                                <div className="flex justify-between">
                                    <div className="text-xl font-bold mb-2">{house.name}</div>
                                    <p>{house.animal}</p>
                                </div>
                                <div className="w-25 h-5 mb-2" style={{ backgroundImage: `linear-gradient(to right, ${gradientColors})` }}></div>
                                <div className="text-lg">
                                    <p>Founder: {house.founder}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            

        </div>
        
    );
}
