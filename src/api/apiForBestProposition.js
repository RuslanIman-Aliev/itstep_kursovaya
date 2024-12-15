import React from "react";
export const fetchBestProporties = async() =>{
try{
    const response = await fetch("https://localhost:7152/api/objects/ShowAllTypeByRating")
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
    }
    return await response.json()
}
catch (er){
    console.error('Fetch error', er);
    throw er;
}
}