import React, { useEffect, useState } from "react";
import Gif from "../components/Gif";
import { GifState } from "../context/Gif-context";
import FilterGif from "../components/FilterGif";

const Home = () => {
  const { gifs, setGifs, filter } = GifState();
  const [error, setError] = useState(false);

  const fetchTrendingGIFs = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/${filter}/trending?api_key=3o9mfM7t7CHc2R097AgP5p057ttO14QC&limit=25&offset=0&country_code=&rating=g`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const { data } = await res.json();
      setGifs(data);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrendingGIFs();
  }, [filter]);

  return (
    <div>
      <img src="/banner.gif" alt="banner" className="mt-2 rounded w-full" />

      <FilterGif showTrending={true} alignLeft={true} />

      {/* Displaying GIFs */}
      {error ? (
        <h1 className="text-white text-2xl text-center">
         There is an error in the API Endpoint
        </h1>
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2">
          {gifs.map((gif) => (
            <Gif gif={gif} key={gif.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
