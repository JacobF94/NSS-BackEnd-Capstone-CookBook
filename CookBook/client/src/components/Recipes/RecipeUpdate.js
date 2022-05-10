import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getRecipeToEdit, updateRecipe } from "../../modules/recipeManager";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { getAllTags } from "../../modules/tagManager";

const RecipeUpdate = () => {
    const history = useHistory();
    const { recipeId } = useParams();
    const emptyRecipe = {
        Name: "",
        Description: "",
        Instructions: "",
        PrepTime: 0,
        SelectedTagIds: new Set()
    };
    const [recipe, setRecipe] = useState(emptyRecipe);
    const [tags, setTags] = useState([]);

    const getTags = () => {
        getAllTags().then((tags) => setTags(tags))
    }

    useEffect(() => {
        getTags()
    }, [])

    useEffect(() => {
        getRecipeToEdit(recipeId).then((recipe) => {
            recipe.SelectedTagIds = new Set(recipe.selectedTagIds);
            setRecipe(recipe)})
    }, recipeId)

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;
    
        const recipeCopy = { ...recipe };
    
        recipeCopy[key] = value;
        setRecipe(recipeCopy);
      };

      const handleSave = (evt) => {
        evt.preventDefault();
        const recipeCopy = { ...recipe };
        recipeCopy.SelectedTagIds = Array.from(recipeCopy.SelectedTagIds)
        updateRecipe(recipeCopy).then((newRecipe) => {
          history.push(`/recipes/${newRecipe.id}`);
        });
      };

      const handleTagCheck = (evt) => {
        const recipeCopy = {...recipe}
        const tagId = parseInt(evt.target.value)

        if (recipeCopy.SelectedTagIds.has(tagId)) {
            recipeCopy.SelectedTagIds.delete(tagId)
        } else {
            recipeCopy.SelectedTagIds.add(tagId)
        }

        setRecipe(recipeCopy)
      }

      return (
        <Form>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" placeholder="name" value={recipe.name} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="text" name="description" id="description" placeholder="description" value={recipe.description} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="Instructions">Instructions</Label>
                <Input type="text" name="instructions" id="instructions" placeholder="instructions" value={recipe.instructions} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="PrepTime">Prep Time</Label>
                <Input type="number" name="prepTime" id="prepTime" placeholder="prepTime" value={recipe.prepTime} onChange={handleInputChange}/>
            </FormGroup>
            <div>
            Please select tag(s) for your recipe:
            {tags.map((tag) => {
                return <div>
                            <input type="checkbox" checked={recipe.SelectedTagIds.has(tag.id)} value={tag.id} onChange={(evt) => handleTagCheck(evt)} />
                            <label>
                            {tag.name}
                            </label>
                </div>
            })}
            </div>
            <Button className="btn btn-primary" onClick={handleSave}>Save Changes</Button>
        </Form>
    )


}

export default RecipeUpdate;