using System;

namespace CookBook.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int PrepTime { get; set; }
        public DateTime CreateTime { get; set; }
        public int UserId { get; set; }
        public UserProfile Profile { get; set; }
    }
}
