import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Root from "./pages/Root";
import ListBox from "./components/ListBox";
import { Link } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Root />
      </>
    ),
    children: [
      {
        path: "/",
        element: (
          <>
            <>
              <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content text-center">
                  <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-purple-400">
                      Store all you favourite movie, series names in one place!
                    </h1>
                    <p className="py-6"></p>
                    <button className="btn btn-primary bg-purple-400 border-none">
                      <Link to="/movies">TV Series</Link>
                    </button>
                  </div>
                </div>
              </div>
            </>
          </>
        ),
      },
      {
        path: "/movies",
        element: (
          <>
            <h1 className="text-4xl text-purple-400 py-8 w-8/12 mx-auto">
              Movies
            </h1>
            <ListBox />
          </>
        ),
      },
      {
        path: "/tv-series",
        element: (
          <>
            <h1 className="text-4xl text-purple-400 py-8 w-8/12 mx-auto">
              TV-Series
            </h1>
            <ListBox />
          </>
        ),
      },
      {
        path: "/watchlist",
        element: (
          <>
            <h1 className="text-4xl text-purple-400 py-8 w-8/12 mx-auto">
              Watch List
            </h1>
            <ListBox />
          </>
        ),
      },
      {
        path: "/order-food",
        element: (
          <>
            <h1 className="text-4xl text-purple-400 py-8 w-8/12 mx-auto">
              Order Food
            </h1>
          </>
        ),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
