import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [movieName, setMovieName] = useState("");

  const handleSubmit = () => {
    onSubmit(movieName);
    setMovieName("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96 transform transition-all">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add Movie
        </h2>
        <input
          type="text"
          placeholder="Enter Movie Name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Add Movie
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [movies, setMovies] = useState([]);
  const [serial, setSerial] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/movies")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setSerial(data.length ? data[data.length - 1].serial + 1 : 1);
      });
  }, []);

  const addMovie = (movieName) => {
    const newMovie = {
      serial,
      name: movieName,
    };

    fetch("http://localhost:5000/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((response) => response.json())
      .then((addedMovie) => {
        setMovies([...movies, addedMovie]);
        setSerial(serial + 1);
      });
  };

  return (
    <>
      <div className="bg-purple-200 rounded-full container mx-auto mt-3">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/tv-series">TV Series</Link>
                </li>
                <li>
                  <Link to="/movies">Movies</Link>
                </li>
                <li>
                  <Link to="/watchlist">Watch List</Link>
                </li>
                <li>
                  <Link to="/order-food">Order Food</Link>
                </li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost text-xl">
              Gay
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 text-base">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tv-series">TV Series</Link>
              </li>
              <li>
                <Link to="/movies">Movies</Link>
              </li>
              <li>
                <Link to="/watchlist">Watch List</Link>
              </li>
              <li>
                <Link to="/order-food">Order Food</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end">
            <a className="btn btn-circle">Jayed Ikbal</a>
          </div>
        </div>
      </div>

      <div className="w-8/12 mx-auto">
        <h1 className="text-4xl text-purple-400 py-3">Watched Movies</h1>
        <div className="text-white flex items-center bg-purple-600 rounded-t-2xl p-2">
          <h1 className="mr-3">Serial</h1>
          <div className="flex flex-grow justify-between items-center">
            <h1>Title</h1>
            <div className="flex items-center gap-2">
              <h1>Clear</h1>
              <button className="btn btn-circle btn-outline">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div id="card-container" className="bg-purple-200 rounded-b-xl">
          {movies.map((movie) => (
            <div key={movie.serial} className="flex">
              {/* <span>{movie.serial}</span> - <span>{movie.name}</span> */}
              <div className="px-4 text-lg">{movie.serial}</div>
              <div className="flex justify-between flex-grow border-l border-gray-100">
                <h1 className="text-lg ml-3">{movie.name}</h1>
                <button className="text-3xl rounded-xl border px-2 py-1 mr-3">
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex p-3 justify-center">
          <button
            className="btn bg-purple-500 border-none text-white"
            onClick={() => setIsModalOpen(true)}
          >
            + Add To Watch List
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addMovie}
      />
    </>
  );
};

export default NavBar;
