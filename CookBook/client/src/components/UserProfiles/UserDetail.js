import React, { useEffect, useState } from "react";
import { getUser } from "../../modules/authManager";
import { useParams } from "react-router-dom";
import { Card, CardBody, CardFooter, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Link } from "react-router-dom";

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const { userName } = useParams();

    const getUserDetails = (name) => {
        getUser(name).then((x) => setUser(x));
    };

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
                    {user.recipes.map((x) => {
                        return (
                        <li>
                            <Link to={`/recipes/${x.id}`}>{x.name}</Link>
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

export default UserDetails;