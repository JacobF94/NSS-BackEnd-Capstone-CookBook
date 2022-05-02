USE [master]

IF db_id('CookBook') IS NULl
  CREATE DATABASE [CookBook]
GO

USE [CookBook]
GO

ALTER TABLE [Recipe] DROP CONSTRAINT IF EXISTS [FK_Recipe_User];
ALTER TABLE [UserLikedTags] DROP CONSTRAINT IF EXISTS [FK_Liked_User];
ALTER TABLE [UserLikedTags] DROP CONSTRAINT IF EXISTS [FK_Liked_Tag];
ALTER TABLE [UserTriedRecipe] DROP CONSTRAINT IF EXISTS [FK_Tried_User];
ALTER TABLE [UserTriedRecipe] DROP CONSTRAINT IF EXISTS [FK_Tried_Recipe];
ALTER TABLE [RecipeTag] DROP CONSTRAINT IF EXISTS [FK_Tag_To_Recipe];
ALTER TABLE [RecipeTag] DROP CONSTRAINT IF EXISTS [FK_Recipe_Tag];

DROP TABLE IF EXISTS [UserProfile];
DROP TABLE IF EXISTS [Friend];
DROP TABLE IF EXISTS [Recipe];
DROP TABLE IF EXISTS [Tag];
DROP TABLE IF EXISTS [RecipeTag];
DROP TABLE IF EXISTS [UserTriedRecipe];
DROP TABLE IF EXISTS [UserLikedTags];
GO

CREATE TABLE [UserProfile] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirebaseUserId] NVARCHAR(28) NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Bio] nvarchar(255),
  [ProfilePicUrl] nvarchar(255),
  [CreateTime] Datetime NOT NULL,
  [Email] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Friend] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserIdOne] int NOT NULL,
  [UserIdTwo] int NOT NULL
)
GO

CREATE TABLE [Recipe] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255) NOT NULL,
  [Instructions] nvarchar(255) NOT NULL,
  [PrepTime] int,
  [CreateTime] Datetime NOT NULL,
  [PictureUrl] nvarchar(255),
  [UserId] int NOT NULL
)
GO

CREATE TABLE [Tag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [RecipeTag] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RecipeId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

CREATE TABLE [UserTriedRecipe] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [RecipeId] int NOT NULL,
  [UserId] int NOT NULL,
  [Rating] int,
  [Comment] nvarchar(255),
  [Timestamp] datetime NOT NULL
)
GO

CREATE TABLE [UserLikedTags] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [UserId] int NOT NULL,
  [TagId] int NOT NULL
)
GO

ALTER TABLE [Recipe] ADD CONSTRAINT [FK_Recipe_User] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id])
GO

ALTER TABLE [UserLikedTags] ADD CONSTRAINT [FK_Liked_User] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserLikedTags] ADD CONSTRAINT [FK_Liked_Tag] FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserTriedRecipe] ADD CONSTRAINT [FK_Tried_User] FOREIGN KEY ([UserId]) REFERENCES [UserProfile] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [UserTriedRecipe] ADD CONSTRAINT [FK_Tried_Recipe] FOREIGN KEY ([RecipeId]) REFERENCES [Recipe] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [RecipeTag] ADD CONSTRAINT [FK_Tag_To_Recipe] FOREIGN KEY ([TagId]) REFERENCES [Tag] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [RecipeTag] ADD CONSTRAINT [FK_Recipe_Tag] FOREIGN KEY ([RecipeId]) REFERENCES [Recipe] ([Id]) ON DELETE CASCADE
GO