﻿using System.Collections.Generic;
using System.Linq;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using CookBook.Models;
using CookBook.Utils;

namespace CookBook.Repositories
{

    public class RecipeRepository : BaseRepository, IRecipeRepository
    {
        public RecipeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Recipe> GetAllRecipes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.Id, r.Name, r.Description, r.PrepTime, r.CreateTime, u.Name as 'UserName' 
                                        FROM Recipe r 
                                        LEFT JOIN UserProfile u on u.Id = r.UserId";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        List<Recipe> recipes = new List<Recipe>();
                        while (reader.Read())
                        {
                            recipes.Add(new Recipe()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                PrepTime = DbUtils.GetInt(reader, "PrepTime"),
                                CreateTime = DbUtils.GetDateTime(reader, "CreateTime"),
                                Profile = new UserProfile()
                                {
                                    Name = DbUtils.GetString(reader, "UserName"),
                                }
                            });
                        }

                        return recipes;
                    }
                }
            }
        }
        public Recipe GetRecipe(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT r.Id, r.Name, r.Description, r.Instructions, r.PrepTime, r.CreateTime, u.Name as 'UserName'
                                       FROM Recipe r 
                                       LEFT JOIN UserProfile u on u.Id = r.UserId
                                       WHERE r.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Recipe recipe = null;
                        if (reader.Read())
                        {
                            recipe = new Recipe()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Instructions = DbUtils.GetString(reader, "Instructions"),
                                PrepTime = DbUtils.GetInt(reader, "PrepTime"),
                                CreateTime = DbUtils.GetDateTime(reader, "CreateTime"),
                                Profile = new UserProfile()
                                {
                                    Name = DbUtils.GetString(reader, "UserName"),
                                }
                            };
                        }
                        return recipe;
                    }
                }
            }
        }
        public List<Recipe> HomepageRecipes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT TOP 3 Id, Name, Description 
                                        FROM Recipe
                                        ORDER BY CreateTime desc";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        List<Recipe> recipes = new List<Recipe>();
                        while (reader.Read())
                        {
                            recipes.Add(new Recipe()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description")
                            });
                        }

                        return recipes;
                    }
                }
            }
        }
    }
}
