export const fetchForRecomendation = async (latitude, longitude,type) => {
    try {
        const response = await fetch(`https://localhost:7152/api/objects/nearby?latitude=${latitude}&longitude=${longitude}&place=${type}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched data:', data);
        return data.results.slice(0, 6);  
    } catch (error) {
        console.error('Fetch error', error);
        throw error;
    }
};
