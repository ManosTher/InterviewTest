export async function getHouses(): Promise<any> {
    const res = await fetch('https://wizard-world-api.herokuapp.com/houses');

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    } else {
        return res.json();
    }
    }



export async function getHouseByName(name: string): Promise<any> {
    const res = await fetch(`https://wizard-world-api.herokuapp.com/houses?name=${name}`);

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}