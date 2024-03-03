import React, { useState, useEffect } from 'react';
import { getHouseByName } from '../service/apiService';
import Spinner from '../pages/spinner'; 

interface HouseViewProps {
    searchTerm: string;
  }
export default function HouseView({ searchTerm }: HouseViewProps): JSX.Element {
    const [searchResults, setSearchResults] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
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
                    setSearchResults(matchingHouses);
                    console.log('Search results:', matchingHouses);
                } catch (error) {
                    console.error('Error:', error);
                }
            } else {
                setSearchResults([]); 
                setLoading(false);               
            }
        };
        fetchData();
    }, [searchTerm]);


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
                            <div key={house.id} className="border-2 rounded-lg shadow-lg p-4 mb-4 w-1/2 ">
                                <div className="flex justify-between">
                                    <div className="text-xl font-bold">{house.name}</div>
                                    <p>{house.animal}</p>
                                </div>
                                <div className="w-25 h-5" style={{ backgroundImage: `linear-gradient(to right, ${gradientColors})` }}></div>
                                <div className="text-lg">
                                    <p>{house.founder}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
                                {loading && searchResults.length === 0 && <Spinner />}{!loading && searchResults.length === 0 && <div>No matching houses found</div>}

        </div>
        
    );
}
