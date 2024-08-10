import React, { useState } from "react";
import { HiOutlineMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const GifSearch = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const searchGifs = async () => {
    if (query.length === 0) {
      return;
    }

    navigate(`/search/${query}`);
  };

  function handleSubmit(e) {
    e.preventDefault()
    searchGifs()
  }

  return (
    <form onSubmit={handleSubmit} className="flex relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search all the GIFs and Stickers"
        className="w-full pl-4 pr-14 py-5 text-xl text-black rounded-tl rounded-bl border border-gray-300 outline-none"
      />

      {query && (
        <button type="button" onClick={() => setQuery("")} className="absolute bg-gray-300 opacity-90 rounded-full right-20 mr-2 top-6">
            <HiMiniXMark size={22} />
        </button>
      )}

      <button
        type="submit"
        className="bg-gradient-to-tr from-pink-600 to-pink-400 text-white px-4 py-2 rounded-tr rounded-br "
      >
        <HiOutlineMagnifyingGlass size={35} className="-scale-x-100" />
      </button>
    </form>
  );
};

export default GifSearch;
