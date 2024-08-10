import { GiphyFetch } from "@giphy/js-fetch-api";
import { createContext, useContext, useEffect, useState } from "react";

const GifContext = createContext();

const GifProvider = ({ children }) => {
  const [gifs, setGifs] = useState([]);
  const [filter, setFilter] = useState("gifs");  // Ensure the initial state matches one of the filter values
  const [favorites, setFavorites] = useState([]);


  const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

  const addToFavorites = (currentGif) => {
    const copyFavList = [...favorites]
    const index = copyFavList.findIndex((item) => item.id === currentGif.id)

    if (index === -1) {
      copyFavList.push(currentGif)
    } else {
      copyFavList.splice(index, 1)
    }

    setFavorites(copyFavList)
    localStorage.setItem("favoritesGIFs", JSON.stringify(copyFavList))
  }

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favoritesGIFs")) || []
    setFavorites(favorites)
  }, [])

  return (
    <GifContext.Provider
      value={{
        gf,
        gifs,
        setGifs,
        filter,
        setFilter,
        favorites,
        setFavorites,
        addToFavorites
      }}
    >
      {children}
    </GifContext.Provider>
  );
};

export const GifState = () => {
  return useContext(GifContext);
};

export default GifProvider;
