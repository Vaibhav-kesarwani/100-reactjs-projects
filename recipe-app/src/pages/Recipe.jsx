import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Recipe = () => {
  const { idMeal } = useParams();
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const fetchRecipe = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
    );
    const data = await response.json();
    const meal = data.meals[0];
    console.log(data);
    setRecipe(meal);

    const ingres = [];
    const measuress = [];
    for (let i = 1; i <= 20; i++) {
      const value = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
      console.log(typeof value);
      if (value !== "") {
        ingres.push(value);
      }
      if (measure !== "") {
        measuress.push(measure);
      }
    }
    setIngredients(ingres);
    setMeasures(measuress);
  };

  useEffect(() => {
    console.log(idMeal);
    fetchRecipe();
  }, []);

  return (
    <div className=" shadow-lg rounded-2xl p-6 m-4 space-y-4 max-w-2xl mx-auto">
      <img
        src={recipe.strMealThumb}
        className="size-64 rounded-2xl shadow-md object-cover"
        alt={recipe.strMeal}
      />
      <h1>
        {" "}
        <span className="font-bold text-2xl">Dish Name: </span> {recipe.strMeal}
      </h1>
      <h1>
        {" "}
        <span className="font-bold text-2xl">Dish Area: </span> {recipe.strArea}
      </h1>
      <h1>
        <span className="font-bold text-2xl">Dish Category: </span>
        {recipe.strCategory}
      </h1>

      {/* ingres and measures */}
      <div className="flex flex-row gap-26">
        <div>
          <h3 className="font-bold text-2xl">Ingredients</h3>
          <ul className="gap-3">
            {ingredients.map((value, index) => (
              <li key={index} className="font-light">
                {value}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-2xl">Measures</h3>
          <ul className="gap-3">
            {measures.map((value, index) => (
              <li key={index} className="font-light">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* instructions */}
      <div className="flex flex-col gap-2 mt-12 font-semibold">
      <span className="font-bold text-2xl">Full Instructions: </span>

      <p>{recipe.strInstructions}</p>
      </div>

      <h2 className="font-light text-lg mt-6">Tags: {recipe.strTags}</h2>
      
      <div className="mt-12 gap-8 flex flex-col">
      <span className="font-bold text-lg">Youtube Video Instructions</span>
      <a href={recipe.strYoutube} className="border-0 w-1/4 bg-red-50 text-black p-2 text-center hover:shadow-2xl transition duration-200">Go to Video</a>
      </div>
    </div>
  );
};

export default Recipe;
