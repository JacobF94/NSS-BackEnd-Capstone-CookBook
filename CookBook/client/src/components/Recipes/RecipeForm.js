import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { addRecipe } from "";

const RecipeForm = () => {
    const history = useHistory();
    const emptyRecipe = {
        Name: "",
        Description: "",
        Instructions: "",
        PrepTime: 0,
        CreateTime: 2000-01-01,
        UserId: 0
    };
    const [recipe, setRecipe] = useState(emptyRecipe);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
    
        const commentCopy = { ...comment };
    
        commentCopy[key] = value;
        setComment(commentCopy);
      };





}