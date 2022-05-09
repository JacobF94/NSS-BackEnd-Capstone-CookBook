import { getToken } from "./authManager";

const _apiUrl = "/api/Recipe";

export const getAllRecipes = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An error occurred retrieving recipes");
      }
    });
  });
};

export const getRecipeDetails = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An error occured retrieving recipe details");
      }
    });
  });
};

export const getHomepageRecipes = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/Homepage`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An error occured while retrieving homepage recipes");
      }
    });
  });
};

export const deleteRecipe = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  });
};

export const postRecipe = (recipe) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("An error occured posting the recipe");
      }
    })
  })
}