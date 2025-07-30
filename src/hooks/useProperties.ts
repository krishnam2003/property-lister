import { useState, useEffect } from 'react';
import type { Property, NewProperty } from '../types/Property';

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = 'http://localhost:3001/properties';

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch properties');
      }
      const data = await response.json();
      setProperties(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (newProperty: NewProperty): Promise<boolean> => {
    try {
      const propertyToAdd = {
        ...newProperty,
        fullDescription: newProperty.fullDescription || newProperty.description,
        sqft: newProperty.sqft || 1000,
        image: newProperty.image || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
        coordinates: newProperty.coordinates || { lat: 0, lng: 0 }
      };

      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyToAdd),
      });

      if (!response.ok) {
        throw new Error('Failed to add property');
      }

      // Refresh the properties list
      await fetchProperties();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add property');
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    addProperty,
    refetch: fetchProperties
  };
};