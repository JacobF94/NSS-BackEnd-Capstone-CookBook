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
        private readonly ITagRepository _tagRepo;

        public RecipeController(IRecipeRepository recipeRepository, ITagRepository tagRepository)
        {
            _recipeRepo = recipeRepository;
            _tagRepo = tagRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Recipe> recipes = _recipeRepo.GetAllRecipes();
            return Ok(recipes);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Recipe recipe = _recipeRepo.GetRecipe(id);
            List<Tag> tags = _tagRepo.GetTagsByRecipe(id);
            recipe.Tags = tags;
            return Ok(recipe);
        }

        [HttpGet("Homepage")]
        public IActionResult GetHopepageRecipes()
        {
            List<Recipe> recipes = _recipeRepo.HomepageRecipes();
            return Ok(recipes);
        }
    }
}
