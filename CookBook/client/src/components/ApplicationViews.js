import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import RecipeList from "./Recipes/RecipeList";
import RecipeDetails from "./Recipes/RecipeDetail";
import UserDetails from "./UserProfiles/UserDetail";
import MyProfile from "./UserProfiles/MyProfile";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Switch>

        <Route path="/" exact>
          {isLoggedIn ? <Homepage /> : <Redirect to="/login" />}
        </Route>

        <Route path="/recipes" exact>
        {isLoggedIn ? <RecipeList /> : <Redirect to="/login" />}
        </Route>

        <Route path="/recipes/:recipeId(\d+)">
        {isLoggedIn ? <RecipeDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/profile/:userName">
        {isLoggedIn ? <UserDetails /> : <Redirect to="/login" />}
        </Route>

        <Route path="/myProfile" exact>
        {isLoggedIn ? <MyProfile /> : <Redirect to="/login" />}
        </Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </main>
  );
}