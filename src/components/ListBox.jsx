import React from "react";
import { useState, useEffect } from "react";

const ListBox = () => {
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
      <div className="w-8/12 mx-auto">
        <h1 className="text-4xl text-purple-400 py-3">Watched Movies</h1>
        <div className="text-white flex items-center bg-purple-600 rounded-t-2xl p-2">
          <h1 className="mr-3">Serial</h1>
          <div className="flex flex-grow justify-between items-center">
            <h1>Title</h1>
            <div className="flex items-center gap-2">
              <h1>Clear All</h1>
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
                <button className="text-3xl rounded-xl border px-2 py-0 mr-3">
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
    </>
  );
};

export default ListBox;
