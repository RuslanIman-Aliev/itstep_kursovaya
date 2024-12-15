import React from "react";
const apiKey = process.env.REACT_APP_API_KEY;
export const fetchBestPlacesNear= async(name)=>{
   try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${apiKey}`)
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
    }
    return await response.json()
   } catch (er) {
    console.error('Fetch error:', er);
    throw er;
   }
}