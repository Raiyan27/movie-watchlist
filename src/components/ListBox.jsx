import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

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
          Add Item
        </h2>
        <input
          type="text"
          placeholder="Enter Item Name"
          value={movieName}
          required
          onChange={(e) => setMovieName(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            Add
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

const ListBox = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const pathName = location.pathname.split("/").pop();
  const apiEndpoint =
    pathName === "tv-series"
      ? "tv-series"
      : pathName === "watchlist"
      ? "watchlist"
      : "movies";
  const listName = pathName.charAt(0).toUpperCase() + pathName.slice(1);

  useEffect(() => {
    fetch(`http://localhost:5000/${apiEndpoint}`)
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, [apiEndpoint]);

  const addItem = (itemName) => {
    const newItem = {
      serial: items.length + 1,
      name: itemName,
    };

    fetch(`http://localhost:5000/${apiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    })
      .then((response) => response.json())
      .then((addedItem) => {
        setItems([...items, addedItem]);
      });
  };

  const deleteItem = (id) => {
    fetch(`http://localhost:5000/${apiEndpoint}/${id}`, {
      method: "DELETE",
    }).then(() => {
      const updatedItems = items.filter((item) => item.id !== id);

      const updatedItemsWithSerial = updatedItems.map((item, index) => ({
        ...item,
        serial: index + 1,
      }));

      setItems(updatedItemsWithSerial);
    });
  };

  const clearAllItems = () => {
    Promise.all(
      items.map((item) =>
        fetch(`http://localhost:5000/${apiEndpoint}/${item.id}`, {
          method: "DELETE",
        })
      )
    ).then(() => setItems([]));
  };

  return (
    <>
      <div className="w-8/12 mx-auto">
        <div className="text-white flex items-center bg-purple-600 rounded-t-2xl p-2">
          <h1 className="mr-3">Serial</h1>
          <div className="flex flex-grow justify-between items-center">
            <h1>Title</h1>
            <div className="flex items-center gap-2">
              <h1>Clear All</h1>
              <button
                className="btn btn-circle btn-outline"
                onClick={clearAllItems}
              >
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
          {items.map((item) => (
            <div key={item.serial} className="flex">
              <div className="px-4 text-lg">{item.serial}</div>
              <div className="flex justify-between flex-grow border-l border-gray-100">
                <h1 className="text-lg ml-3">{item.name}</h1>
                <button
                  className="text-3xl rounded-xl border px-2 py-0 mr-3"
                  onClick={() => deleteItem(item.id)}
                >
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
            + Add to {listName}
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addItem}
      />
    </>
  );
};

export default ListBox;
