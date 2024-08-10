import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from "./layouts/AppLayout";
import Home from "./pages/Home";
import Category from "./pages/Category";
import SearchPage from "./pages/Search";
import SingleGif from "./pages/SingleGif";
import Favorites from "./pages/Favorites";



const router = createBrowserRouter([
  {
    element: <AppLayout />,


    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/:category',
        element: <Category />
      },
      {
        path: '/search/:query',
        element: <SearchPage />
      },
      {
        path: "/gifs/:gifId",
        element: <SingleGif />
      },
      {
        path: '/favorites',
        element: <Favorites />
      },
    ]
  }
])

const App = () => {
  return (
   <RouterProvider router={router}/>
  )
};

export default App;
