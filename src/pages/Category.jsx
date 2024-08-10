import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Gif from "../components/Gif";
import FollowOn from "../components/FollowOn";

const Category = () => {
  const [results, setResults] = useState([]);

  const { category } = useParams();

  const fetchResults = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=3o9mfM7t7CHc2R097AgP5p057ttO14QC&q=${category}&limit=25&offset=0&rating=g&lang=en`
      );
      const result = await res.json();
      console.log(result);
      setResults(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [category]);

  return (
    <div className="flex flex-col sm:flex-row gap-5 my-4">
      <div className="w-full sm:w-72">
        {results.length > 0 && <Gif gif={results[0]}hover={false} />}
        <span className="text-gray-400 text-sm pt-2">
          Don&apos;t tell it to me, GIF it to me!
        </span>

        <FollowOn />

        <div className="divider"></div>
      </div>

      <div>
        <h2 className="text-4xl pb-1 font-extrabold capitalize">{category.split("-").join(" & ")} GIFs</h2>
        <h2 className="text-lg text-gray-400 pb-3 font-bold hover:text-gray-50 cursor-pointer">@{category}</h2>

        {results.length > 0 && (
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-6 gap-2">
            {results.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
