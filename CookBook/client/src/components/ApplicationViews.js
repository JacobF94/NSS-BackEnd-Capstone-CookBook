import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Homepage from "./Homepage";
import RecipeList from "./Recipes/RecipeList";

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