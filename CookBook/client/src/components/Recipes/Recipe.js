import React from "react";
import { Card, CardBody, CardTitle, CardText } from "reactstrap";

const Recipe = ({ recipe }) => {
    return (
        <Card>
            <CardBody>
                <CardTitle tag="h1">
                    {recipe.name}
                </CardTitle>
                <CardText>
                    {recipe.description}
                </CardText>
            </CardBody>
        </Card>
    );
};

export default Recipe;