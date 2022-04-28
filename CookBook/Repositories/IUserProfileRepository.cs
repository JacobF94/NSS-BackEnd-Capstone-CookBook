using CookBook.Models;
using System.Collections.Generic;

namespace CookBook.Repositories
{
    public interface IUserProfileRepository
    {
        void Add(UserProfile userProfile);
        void Delete(int id);
        UserProfile GetUser(int id);
        UserProfile GetByFirebaseUserId(string firebaseUserId);
        void Update(UserProfile userProfile);
    }
}