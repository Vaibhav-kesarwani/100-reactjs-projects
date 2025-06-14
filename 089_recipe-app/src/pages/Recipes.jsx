import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
const Recipes = () => {
  const { id } = useParams();
  const [meals, setMeals] = useState([]);

  const fetchMeals = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`
      );
      const data = await response.json();
      console.log(data.meals);
      setMeals(data.meals ||  []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [id]);

  return (
    <div className="text-center">
      <h2 className=" text-2xl text-center justify-center">
        Search Results for, <span className="text-3xl font-bold">{id}</span>
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {meals.length > 0 ? meals.map((meal, index) => (
          <Link key={index} to={`${meal.idMeal}`}>
            <div className="p-3 m-2 shadow-md hover:shadow-2xl transition duration-300">
                <img src={meal.strMealThumb} alt="" className="object-cover max-w-fit m-auto rounded-md h-52" />
                <h3>Dish Name: {meal.strMeal}</h3>
                <h4>Category: {meal.strCategory}</h4>
                <h3>Area: {meal.strArea}</h3>
            </div>
          </Link>
        )) : 
        <p className="text-xl text-center justify-center m-12">Sorry Nothing to Show here</p>
        }
      </div>
    </div>
  );
};

export default Recipes;
