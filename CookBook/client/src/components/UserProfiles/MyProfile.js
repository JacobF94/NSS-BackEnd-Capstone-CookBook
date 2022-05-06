import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../../modules/authManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle, Button } from "reactstrap";
import { Link } from "react-router-dom";
import { deleteRecipe } from "../../modules/recipeManager";

const MyProfile = () => {
    const [user, setUser] = useState(null);
    const { userName } = useParams();

    const getUserDetails = () => {
        getCurrentUser().then((x) => setUser(x));
    };

    const handleDelete = (id) => {
        deleteRecipe(id).then(() => {
            getUserDetails()
        })
    }

    useEffect(() => {
        getUserDetails(userName);
    }, [])

    if (user === null)
    {
        return null;
    }
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h2">{user.name}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h2">{user.bio}</CardSubtitle>
                <CardText>
                    Check out my recipes!
                    <ul>
                    {user.recipes.map((recipe) => {
                        return (
                        <li>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link><Button onClick={() => {handleDelete(recipe.id)}}>Delete</Button>
                        </li>
                        )
                    })}
                    </ul>
                </CardText>
                <CardFooter>
                    Liked tags: <ul>
                        {user.tags.map((tag) => {
                            return <li>{tag.name}</li>
                        })}
                    </ul>
                </CardFooter>
            </CardBody>
        </Card>
    );
};

export default MyProfile;