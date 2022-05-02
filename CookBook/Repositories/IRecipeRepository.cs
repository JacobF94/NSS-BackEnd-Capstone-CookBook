using CookBook.Models;
using System.Collections.Generic;

namespace CookBook.Repositories
{
    public interface IRecipeRepository
    {
        List<Recipe> GetAllRecipes();
        Recipe GetRecipe(int id);
    }
}