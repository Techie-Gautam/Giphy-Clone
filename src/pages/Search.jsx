import React, { useEffect, useState } from "react";
import { GifState } from "../context/Gif-context";
import { useParams } from "react-router-dom";
import FilterGif from "../components/FilterGif";
import Gif from "../components/Gif";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const {gf, filter} = GifState

  const {query} = useParams()

  const fetchSearchResults = async () => {
   try {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=3o9mfM7t7CHc2R097AgP5p057ttO14QC&q=${query}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
    const result = await res.json()
    setSearchResults(result.data)
   } catch (error) {
    console.log(error);
   }

  }
  
  useEffect(() => {
    fetchSearchResults()
  }, [filter, query])

  return (
    <div className="my-4">
      <h2 className="text-5xl pb-3 font-extrabold">Search Results for {query}</h2>

      {/* <FilterGif alignLeft={true} /> */}

      {searchResults.length > 0 ? (
       <div className="columns-2 md:columns-3 lg:columns-4 gap-2">
         {searchResults.map((gif) => (
          <Gif gif={gif} key={gif.id} />
        ))}
       </div>
      ) : (
        <span>No GIFs found for {query}. Try searching another thing!</span>
      )}
    </div>
  )
};

export default SearchPage;
