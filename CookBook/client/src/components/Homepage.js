import React, { useEffect, useState } from "react";
import { getHomepageRecipes } from "../modules/recipeManager";
import { ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import Recipe from "./Recipes/Recipe";

const Homepage = () => {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    getHomepageRecipes().then((recipes) => setRecipes(recipes))
  }

  useEffect(() => {
    getRecipes();
  }, []);
  return(
    <div>
      <div>
        <h1>Check out the newest recipes!</h1>
      </div>
      <div className="container">
      <div className="row justify-content-center">
        <ListGroup>
          {recipes.map((recipe) => {
            return (
              <ListGroupItem key={recipe.id}>
                <Recipe recipe={recipe} />
                <Link to={`/recipes/${recipe.id}`}>Details</Link>
              </ListGroupItem>
            );
          })}
        </ListGroup>
      </div>
    </div>
  </div>
  )
}

export default Homepage;