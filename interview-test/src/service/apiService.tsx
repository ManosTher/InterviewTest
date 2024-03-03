export async function getHouses(): Promise<any> {
    const res = await fetch('http://localhost:8080/houses/');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    } else {
        return res.json();
    }
    }



export async function getHouseByName(name: string): Promise<any> {
    const res = await fetch(`http://localhost:8080/houses/?name=${name}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export async function addHouse(house: any): Promise<any> {
    const res = await fetch('http://localhost:8080/houses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(house)
    });
  
    if (!res.ok) {
      throw new Error('Failed to add house');
    } else {
      return res.json();
    }
  }