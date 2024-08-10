import React from "react";
import { GifState } from "../context/Gif-context";
import Gif from "../components/Gif";

const Favorites = () => {
  const {favorites} = GifState()

  return (
    <div>
      {favorites.length > 0 ? (
          <div  className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-5">
            {favorites.map((gif) => (
              <Gif gif={gif} key={gif?.id} />
            ))}
          </div>
      ) : (
        <p className="text-2xl font-semibold text-center mt-5">"You have no favorites GIFs & Stickers, Add some!"</p>
      )}
    </div>
  )
};

export default Favorites;
