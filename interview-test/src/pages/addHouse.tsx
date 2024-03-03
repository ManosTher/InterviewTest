import React, { useState, ChangeEvent, FormEvent } from 'react';
import { addHouse } from '../service/apiService';

interface House {
  name: string;
  houseColours: string;
  founder: string;
  animal: string;
  element: string;
  ghost: string;
  commonRoom: string;
}

interface AddHouseFormProps {
  onAddHouse: (house: House) => void;
}

const AddHouseForm: React.FC<AddHouseFormProps> = ({ onAddHouse }) => {
  const [house, setHouse] = useState<House>({
    name: '',
    houseColours: '',
    founder: '',
    animal: '',
    element: '',
    ghost: '',
    commonRoom: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHouse(prevHouse => ({
      ...prevHouse,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addHouse(house);
    // You can also reset the form fields here if needed
  };

  return (
      <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={house.name} onChange={handleChange} placeholder="Name" />
          <input type="text" name="houseColours" value={house.houseColours} onChange={handleChange} placeholder="House Colours" />
          <input type="text" name="founder" value={house.founder} onChange={handleChange} placeholder="Founder" />
          <input type="text" name="animal" value={house.animal} onChange={handleChange} placeholder="Animal" />
          <input type="text" name="element" value={house.element} onChange={handleChange} placeholder="Element" />
          <input type="text" name="ghost" value={house.ghost} onChange={handleChange} placeholder="Ghost" />
          <input type="text" name="commonRoom" value={house.commonRoom} onChange={handleChange} placeholder="Common Room" />
          <button type="submit">Add House</button>
      </form>
  );
};

export default AddHouseForm;