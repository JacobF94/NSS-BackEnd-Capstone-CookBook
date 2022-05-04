using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CookBook.Models;
using CookBook.Utils;

namespace CookBook.Repositories
{

    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetUser(string userName)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                       SELECT u.Id, u.Name, u.Bio, u.CreateTime, r.Name as 'recipeName', r.Id AS 'recipeId'
                                       FROM UserProfile u
                                       JOIN Recipe r ON r.UserId = u.Id
                                       WHERE u.Name = @userName";

                    DbUtils.AddParameter(cmd, "@userName", userName);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile user = null;
                        while (reader.Read())
                        {
                            if (user == null)
                            {
                                user = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Bio = DbUtils.GetString(reader, "Bio"),
                                    CreateTime = DbUtils.GetDateTime(reader, "CreateTime"),
                                    Recipes = new List<Recipe>()
                                };
                            }

                            user.Recipes.Add(new Recipe()
                            {
                                Id = DbUtils.GetInt(reader, "recipeId"),
                                Name = DbUtils.GetString(reader, "recipeName")
                            });
                        }

                        return user;
                    }
                }
            }
        }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                       SELECT u.Id, u.Name, u.Bio, u.CreateTime, r.Name as 'recipeName', r.Id AS 'recipeId'
                                       FROM UserProfile u
                                       JOIN Recipe r ON r.UserId = u.Id
                                       WHERE u.FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        UserProfile user = null;
                        while (reader.Read())
                        {
                            if (user == null)
                            {
                                user = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "Id"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    Bio = DbUtils.GetString(reader, "Bio"),
                                    CreateTime = DbUtils.GetDateTime(reader, "CreateTime"),
                                    Recipes = new List<Recipe>()
                                };
                            }

                            user.Recipes.Add(new Recipe()
                            {
                                Id = DbUtils.GetInt(reader, "recipeId"),
                                Name = DbUtils.GetString(reader, "recipeName")
                            });
                        }

                        return user;
                    }
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirebaseUserId, Name, Bio, Email, CreateTime)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Email, @ImageUrl, @DateCreated)";

                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateTime", userProfile.CreateTime);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE UserProfile
                           SET Name = @Name,
                               Bio = @Bio,
                               Email = @Email,
                               CreateTime = @CreateTime
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", userProfile.Name);
                    DbUtils.AddParameter(cmd, "@Bio", userProfile.Bio);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@CreateTime", userProfile.CreateTime);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM UserProfile WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}