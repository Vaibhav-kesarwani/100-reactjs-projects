
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Recipes from "./pages/Recipes"
import Recipe from "./pages/Recipe"
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/recipeCategory/:id" element = {<Recipes />}/>
      <Route path="/recipeCategory/:id/:idMeal" element={<Recipe />}/>
    </Routes>
  )
}

export default App
