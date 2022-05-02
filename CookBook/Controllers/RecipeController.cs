using Microsoft.AspNetCore.Http;
using System;
using Microsoft.AspNetCore.Mvc;
using CookBook.Repositories;
using CookBook.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace CookBook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepo;

        public RecipeController(IRecipeRepository recipeRepository)
        {
            _recipeRepo = recipeRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Recipe> recipes = _recipeRepo.GetAllRecipes();
            return Ok(recipes);
        }
    }
}
