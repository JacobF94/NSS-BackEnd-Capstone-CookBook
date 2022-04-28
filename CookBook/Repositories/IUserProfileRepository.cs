using CookBook.Models;
using System.Collections.Generic;

namespace CookBook.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        UserProfile GetUser(int id);
        void Update(UserProfile userProfile);
    }
}