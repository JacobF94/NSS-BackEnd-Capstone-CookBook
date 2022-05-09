using CookBook.Models;
using System.Collections.Generic;

namespace CookBook.Repositories
{
    public interface ITagRepository
    {
        List<Tag> GetTagsByRecipe(int id);
        List<Tag> GetTagsByUser(int id);
        List<Tag> GetAllTags();
    }
}