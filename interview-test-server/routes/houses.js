const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '..', 'data', 'houses.json');

const getAllHouses = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const houses = JSON.parse(data);
    res.json(houses);
  } catch (error) {
    res.status(500).json({ message: "Error reading data" });
  }
};

const getHouseByName = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const houses = JSON.parse(data);
    const name = req.params.name;
    const house = houses.find(h => h.name.toLowerCase() === name.toLowerCase());
    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading data" });
  }
};

const addHouse = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const houses = JSON.parse(data);
    const house = req.body;
    house.id = houses.length + 1;
    houses.push(house);
    await fs.writeFile(dataFilePath, JSON.stringify(houses));
    res.status(201).json(house);
  } catch (error) {
    res.status(500).json({ message: "Error writing data" });
  }
};

/*
const getHouseById = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    const houses = JSON.parse(data);
    const id = req.params.id;
    const decodedId = id.replace(/-/g, '');
    const house = houses.find(h => h.id.replace(/-/g, '') === decodedId);
    if (house) {
      res.json(house);
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error reading data" });
  }
};


const updateHouse = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    let houses = JSON.parse(data);
    const updatedHouse = req.body;
    const index = houses.findIndex(h => h.id === updatedHouse.id);
    if (index !== -1) {
      houses[index] = updatedHouse;
      await fs.writeFile(dataFilePath, JSON.stringify(houses));
      res.json(updatedHouse);
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating data" });
  }
};

const deleteHouse = async (req, res) => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    let houses = JSON.parse(data);
    const id = req.params.id;
    const index = houses.findIndex(h => h.id === id);
    if (index !== -1) {
      houses.splice(index, 1);
      await fs.writeFile(dataFilePath, JSON.stringify(houses));
      res.json({ message: "House deleted successfully" });
    } else {
      res.status(404).json({ message: "House not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting data" });
  }
};
*/


module.exports = {
  getAllHouses,
  getHouseByName,
  addHouse,
  //getHouseById,
  //updateHouse,
  //deleteHouse
};