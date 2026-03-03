import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { token } = useAuth();
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = useCallback(async () => {
    if (!token) {
      setFavorites([]);
      return;
    }
    try {
      const res = await axios.get('http://localhost:5001/api/favorites', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFavorites(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  const addFavorite = async (propertyId) => {
    if (!token) return;
    try {
      await axios.post(`http://localhost:5001/api/favorites/${propertyId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const removeFavorite = async (propertyId) => {
    if (!token) return;
    try {
      await axios.delete(`http://localhost:5001/api/favorites/${propertyId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchFavorites();
    } catch (err) {
      console.error(err);
    }
  };

  const isFavorite = (propertyId) => {
    return favorites.some((f) => f.id === propertyId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite, fetchFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}