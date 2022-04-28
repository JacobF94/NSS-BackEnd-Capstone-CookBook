USE [CookBook];
GO

SET identity_insert [UserProfile] ON;
INSERT INTO [UserProfile] ([Id], [FirebaseUserId], [Name], [Email], [Bio], [CreateTime], [ProfilePicUrl])
VALUES (1, '92J8lNpkQ2baJ6KmrJ9QBI1t0xb2', 'Jacob', 'jacob@mail.com', 'Hi, I am a food lover looking for my next favorite meal!', '2022-04-28', null),
		(2, '4p8N6sLLWtY71iKAqTUYKK3QSqi2', 'Matthew', 'matthew@mail.com', null, '2022-04-29', null);
SET identity_insert [UserProfile] OFF;

SET identity_insert [Recipe] on;
INSERT INTO [Recipe] ([Id], [Name], [Description], [PrepTime], [CreateTime], [UserId], [PictureUrl])
VALUES (1, 'Chili', 'A big ol pot of beans and ground turkey!', 360, '2022-04-28', 1, null),
		(2, 'Tacos', 'Best served with a cold Corona', 20, '2022-04-29', 2, null);
SET identity_insert [Recipe] off;

SET identity_insert [Tag] on;
INSERT INTO [Tag] ([Id], [Name])
VALUES (1, 'Latin'),
		(2, 'Comfort food'),
		(3, 'Italian'),
		(4, 'Dessert');
SET identity_insert [Tag] off;

SET identity_insert [RecipeTag] on;
INSERT INTO [RecipeTag] ([Id], [RecipeId], [TagId])
VALUES (1, 1, 2),
		(2, 2, 1),
		(3, 2, 2);
SET identity_insert [RecipeTag] off;

SET identity_insert [UserLikedTags] on;
INSERT INTO [UserLikedTags] ([Id], [UserId], [TagId])
VALUES (1, 1, 1),
		(2, 1, 4),
		(3, 2, 2);
SET identity_insert [UserLikedTags] off;