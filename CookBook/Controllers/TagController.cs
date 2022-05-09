using Microsoft.AspNetCore.Http;
using System;
using Microsoft.AspNetCore.Mvc;
using CookBook.Repositories;
using CookBook.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace CookBook.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TagController : ControllerBase
    {
        private readonly ITagRepository _tagRepo;

        public TagController(ITagRepository tagRepository)
        {
            _tagRepo = tagRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<Tag> tags = _tagRepo.GetAllTags();
            return Ok(tags);
        }
    }
}