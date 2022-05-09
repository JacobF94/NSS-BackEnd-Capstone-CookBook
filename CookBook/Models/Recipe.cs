using System;
using System.Collections.Generic;

namespace CookBook.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Instructions { get; set; }
        public int PrepTime { get; set; }
        public DateTime CreateTime { get; set; }
        public int UserId { get; set; }
        public UserProfile Profile { get; set; }
        public List<Tag> Tags { get; set; }
        public List<int> SelectedTagIds { get; set; }
    }
}
