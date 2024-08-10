import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiMiniChevronUp,
  HiMiniChevronDown,
  HiMiniHeart,
} from "react-icons/hi2";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa";
import { IoCodeSharp } from "react-icons/io5";
import Gif from "../components/Gif"; // Assuming you have a Gif component to display individual GIFs
import FollowOn from "../components/FollowOn";
import { GifState } from "../context/Gif-context";

const SingleGif = () => {
  const { gifId } = useParams(); // Get gif ID from URL parameters
  const [gif, setGif] = useState(null);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [error, setError] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const { favorites, addToFavorites } = GifState();

  const fetchGif = async () => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/${gifId}?api_key=3o9mfM7t7CHc2R097AgP5p057ttO14QC`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch GIF");
      }
      const { data } = await res.json();
      setGif(data);
      fetchRelatedGifs(data.title); // Fetch related GIFs based on the title or tags
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  const fetchRelatedGifs = async (query) => {
    try {
      const res = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=3o9mfM7t7CHc2R097AgP5p057ttO14QC&q=${encodeURIComponent(
          query
        )}&limit=20`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch related GIFs");
      }
      const { data } = await res.json();
      setRelatedGifs(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchGif();
  }, [gifId]);

  const shareGif = () => {
    // Assignment
  };

  const embedGif = () => {
    // Assignment
  };

  if (error) {
    return (
      <h1 className="text-white text-2xl text-center">Error fetching GIF</h1>
    );
  }

  if (!gif) {
    return <h1 className="text-white text-2xl text-center">Loading...</h1>;
  }

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {gif?.user?.description.length > 100 ? (
              <p className="py-4 whitespace-pre-line text-sm text-gray-400">
                {readMore
                  ? gif?.user?.description
                  : gif?.user?.description.slice(0, 100) + "..."}
                <div
                  className="flex items-center faded-text cursor-pointer"
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? (
                    <>
                      Read less <HiMiniChevronUp size={20} />
                    </>
                  ) : (
                    <>
                      Read more <HiMiniChevronDown size={20} />
                    </>
                  )}
                </div>
              </p>
            ) : (
              gif?.user?.description
            )}
          </>
        )}

        <FollowOn />

        <div className="divider"></div>

        {gif?.source && (
          <div>
            <span
              className="faded-text" //custom - faded-text
            >
              Source
            </span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-3 text-xl">{gif.title}</div>
            <Gif gif={gif} hover={false} />

            {/* MOBILE UI  */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />

              <div className="px-2">
                <p>{gif?.user?.display_name}</p>
                <p>@{gif?.user?.username}</p>
              </div>

              <button className="ml-auto">
                <FaPaperPlane size={25} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addToFavorites(gif)}
              className="flex gap-5 items-center font-bold text-lg"
            >
              <HiMiniHeart
                size={30}
                className={`${
                  favorites.findIndex((item) => item.id === gif.id) !== -1 ? "text-red-500" : ""
                }`}
              />
              Favorite
            </button>
            <button
              onClick={shareGif} // Assignment
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25} />
              Share
            </button>
            <button
              onClick={embedGif} // Assignment
              className="flex gap-5 items-center font-bold text-lg"
            >
              <IoCodeSharp size={30} />
              Embed
            </button>
          </div>
        </div>

        <div>
          <span className="font-extrabold">Related GIFs</span>
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleGif;
