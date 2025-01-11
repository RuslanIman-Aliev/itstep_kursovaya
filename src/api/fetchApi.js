export const fetchInfo = async (url) => {
    const response = await fetch(url,{
        method: "GET",
        credentials: "include",
    });
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
    return  response.json();
};