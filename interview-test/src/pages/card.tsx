import React, { useState, useEffect } from 'react';
import { getHouses } from '../service/apiService';

type House = {
  id: number;
  name: string;
  animal: string;
  houseColours: string;
  founder: string;
}

export default function Card(): JSX.Element {
  const [data, setData] = useState<House[]>([]);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const houses = await getHouses();
        setData(houses);
      } catch (error) {
        console.error('Error fetching house data:', error);
      }
    };

    fetchHouses();
  }, []);

  function isValidColor(color: string): boolean {
    const colorNames = [
      'white', 'black', 'silver', 'gray', 'red', 'maroon', 'yellow', 'olive',
      'lime', 'green', 'aqua', 'teal', 'blue', 'navy', 'fuchsia', 'purple'
    ];

    if (colorNames.includes(color.toLowerCase())) {
      return true; // Valid CSS color name
    }

    const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (hexColorRegex.test(color)) {
      return true; // Valid hexadecimal color
    }

    return false; // Invalid color
  }

  return (
    <div>
      {data.map((house) => {
        const colors = house.houseColours.split(" and ");
        let gradientColors = colors.join(', ');

        // Check if any color is not valid, then use white to black as fallback
        const invalidColors = colors.filter(color => !isValidColor(color));
        if (invalidColors.length > 0) {
          gradientColors = 'white, black';
        }

        return (
          <div key={house.id} className="border-2 rounded-lg shadow-lg p-4 mb-4 w-1/2">
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
  );
}