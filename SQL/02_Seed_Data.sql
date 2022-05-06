USE [CookBook];
GO

SET identity_insert [UserProfile] ON;
INSERT INTO [UserProfile] ([Id], [FirebaseUserId], [Name], [Email], [Bio], [CreateTime], [ProfilePicUrl])
VALUES (1, '92J8lNpkQ2baJ6KmrJ9QBI1t0xb2', 'Jacob', 'jacob@mail.com', 'Hi, I am a food lover looking for my next favorite meal!', '2022-04-28', null),
		(2, '4p8N6sLLWtY71iKAqTUYKK3QSqi2', 'Matthew', 'matthew@mail.com', null, '2022-04-29', null),
		(3, 'DXQVU39XYMNYhJz3qCgcelPpuPy2', 'Cory', 'cory@mail.com', null, '2022-03-20', null);
SET identity_insert [UserProfile] OFF;

SET identity_insert [Recipe] on;
INSERT INTO [Recipe] ([Id], [Name], [Description], [Instructions], [PrepTime], [CreateTime], [UserId], [PictureUrl])
VALUES (1, 'Chili', 'A big ol pot of beans and ground turkey!', 'Step by step instructions on how to make this dish', 360, '2022-04-28', 1, null),
		(2, 'Tacos', 'Best served with a cold Corona', 'Step by step instructions on how to make this dish', 20, '2022-04-29', 1, null),
		(3, 'Recipe Three', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-05-03', 1, null),
		(4, 'Recipe Four', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-02-01', 2, null),
		(5, 'Recipe Five', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-01-10', 2, null),
		(6, 'Recipe Six', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-03-20', 2, null),
		(7, 'Recipe Seven', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-05-02', 3, null),
		(8, 'Recipe Eight', 'Best served fresh', 'Step by step instructions on how to make this dish', 20, '2022-05-05', 3, null);
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
		(3, 3, 2),
		(4, 4, 3),
		(5, 5, 2),
		(6, 6, 2),
		(7, 7, 4),
		(8, 8, 1);
SET identity_insert [RecipeTag] off;

SET identity_insert [UserLikedTags] on;
INSERT INTO [UserLikedTags] ([Id], [UserId], [TagId])
VALUES (1, 1, 1),
		(2, 1, 4),
		(3, 2, 2),
		(4, 2, 3),
		(5, 3, 2),
		(6, 3, 3);
SET identity_insert [UserLikedTags] off;