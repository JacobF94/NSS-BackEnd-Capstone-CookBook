import { tab } from "@testing-library/user-event/dist/tab";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, Input, Label, Button, Form } from "reactstrap";
import { postRecipe } from "../../modules/recipeManager";
import { getAllTags } from "../../modules/tagManager";

const RecipeForm = () => {
    const history = useHistory();
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
        postRecipe(recipeCopy).then((newRecipe) => {
          history.push(`/recipes/${newRecipe.id}`);
        });
      };

      const SubmitButton = () => {
        if (recipe.Name && recipe.Description && recipe.Instructions && recipe.PrepTime && recipe.SelectedTagIds.size > 0){
          return <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
        } else {
          return <Button className="btn btn-primary" disabled>Please enter all information</Button>
        };
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
                <Label for="Name">Name</Label>
                <Input type="text" name="Name" id="Name" placeholder="Name" value={recipe.Name} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="text" name="Description" id="Description" placeholder="Description" value={recipe.Description} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="Instructions">Instructions</Label>
                <Input type="text" name="Instructions" id="Instructions" placeholder="Instructions" value={recipe.Instructions} onChange={handleInputChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="PrepTime">Prep Time</Label>
                <Input type="number" name="PrepTime" id="PrepTime" placeholder="PrepTime" value={recipe.PrepTime} onChange={handleInputChange}/>
            </FormGroup>
            <div>
            Please select tag(s) for your recipe:
            {tags.map((tag) => {
                return <div>
                            <input type="checkbox" value={tag.id} onChange={(evt) => handleTagCheck(evt)} />
                            <label>
                            {tag.name}
                            </label>
                </div>
            })}
            </div>
            <SubmitButton />
        </Form>
    )

};

export default RecipeForm;