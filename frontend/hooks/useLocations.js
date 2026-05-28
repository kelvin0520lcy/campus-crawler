import { useState } from 'react'
import { useCallback } from 'react';
import { API_URL } from '../constants/api.js';

export const useLocations = () => {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchLocations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/locations`);
            const data = await response.json();

            setLocations(data.locations);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching locations: ", error);
        }
    });

    return { locations, loading, fetchLocations }
}
