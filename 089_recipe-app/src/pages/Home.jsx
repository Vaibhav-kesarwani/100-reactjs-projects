import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchItem] = useState("");
  const navigate = useNavigate();

  async function fetchMeals() {
    const url = "https://www.themealdb.com/api/json/v1/1/categories.php";
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.categories);
      setItems(data.categories);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSearch = () => {
    // <Link to={`recipeCategory/${searchTerm}`}></Link>
    navigate(`recipeCategory/${searchTerm}`);
  };

  return (
    <div className="flex flex-col">
      <div className="w-[640px] mb-4 h-24 shadow-sm text-center justify-center m-auto">
        <h1 className="mb-4 font-bold font-sans text-2xl">
          Recipe Categories for you, what you wanna make?
        </h1>
        <div className="flex justify-between">
          <input
            type="text"
            className="w-[400px] items-center rounded-xl p-2 bg-gray-100"
            placeholder="Have Something Else in Mind.....?"
            onChange={(event) => setSearchItem(event.target.value)}
          />
          <button
            className="border-0 cursor-pointer bg-black text-white p-2 rounded-xl hover:text-black hover:shadow-2xl hover:bg-white transition-colors duration-200"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {items.map((item) => (
          <Link to={`recipeCategory/${item.strCategory}`} key={item.idCategory}>
            <div className=" shadow-md rounded-xl p-4 m-3 cursor-pointer hover:shadow-2xl transition-shadow duration-300">
              <img
                src={item.strCategoryThumb}
                alt={item.strCategory}
                className="w-fit h-48 rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.strCategory}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {item.strCategoryDescription}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
