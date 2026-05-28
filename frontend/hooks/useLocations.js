import { useState } from 'react'
import { useCallback } from 'react';
import { API_URL } from '../constants/api.js';

export const useLocations = () => {

    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const fetchLocations = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}/locations`);
            const data = await response.json();
            setError(false);

            setLocations(data.locations);
        } catch (error) {
            console.error("Error fetching locations: ", error);
            setError(true);
            setLocations([]);
        } finally {
            setLoading(false);
        }
    });

    return { locations, loading, error, fetchLocations }
}
