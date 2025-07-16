import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState([]); // produtos completos

  useEffect(() => {
    async function fetchFavorites() {
      if (!user) return;

      try {
        const res = await axios.get("/api/me/favoritos");
        setFavoritos(res.data);
      } catch (err) {
        console.error("Erro ao carregar favoritos", err);
      }
    }

    fetchFavorites();
  }, [user]);

  const isFavorite = (productId) => favoritos.some((p) => p.id === productId);

  const toggleFavorite = async (productId) => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    try {
        const isFavorito = isFavorite(productId);
  
        if (isFavorito) {
          await axios.delete(`/api/me/favoritos/${productId}`);
        } else {
          await axios.post(`/api/me/favoritos/${productId}`);
        }
  
        // sempre recarrega os favoritos após ação
        const res = await axios.get(`/api/me/favoritos`);
        setFavoritos(res.data);
      } catch (err) {
        const mensagem =
          err.response?.data || "Erro inesperado ao alterar favorito.";
        console.log(mensagem);
      }
  };

  return (
    <FavoritesContext.Provider
      value={{ favoritos, isFavorite, toggleFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
