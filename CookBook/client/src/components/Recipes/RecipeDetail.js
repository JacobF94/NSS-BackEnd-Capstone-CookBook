import React, { useEffect, useState } from "react";
import { getRecipeDetails } from "../../modules/recipeManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const RecipeDetails = () => {
    const [recipe, setRecipe] = useState(null);
    const { recipeId } = useParams();
    const getRecipe = (id) => {
        getRecipeDetails(id).then((recipe) => setRecipe(recipe));
    }

    useEffect(() => {
        getRecipe(recipeId);
    }, [])
    if (recipe === null) {
        return null
    }
    return (
            <Card style={{margin:"1rem"}}>
                <CardBody>
                    <CardTitle tag="h1">{recipe.name}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h2">{recipe.description}</CardSubtitle>
                    <CardText>{recipe.instructions}</CardText>
                    <CardFooter>
                        <Link to={`/profile/${recipe.profile.name}`}>Recipe made by {recipe.profile.name}</Link>
                    </CardFooter>
                </CardBody>
            </Card>
    );
};

export default RecipeDetails;