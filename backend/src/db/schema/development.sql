INSERT INTO USERS (first_name, last_name, username, email, password)
VALUES
('John', 'Doe', 'johndoe', 'john.doe@example.com', '$2b$10$wIvsSL7/eIt1HDyCsNeJoeESkly2dA7iWcP9bQWXrSWDETu159u/i');


INSERT INTO ITINERARIES (user_id, accommodations, response_prompt, city, country, image_url)
VALUES
(1,'3-star hotel', 'Your itinerary for Paris...', 'Paris', 'France', 'AZose0nS9E663kYlY8Iv_ZQ6yAp9ina0A1t2tg2OuEmAvH4YDW-FJM8DnSzu_rT7SI54aKzT1KJm_6tTPLFXKVE5JuaFBRVA3yTKNBflTHPvqho-gDsCgCoecIgsXIH7qXGif7BWGOsteW84ud2hfqIRuKo-cYC7sdwI06KbRdJQ0ONmM_3Y');


INSERT INTO POINTS (itinerary_id, title, latitude, longitude, description, image_url, rating)
VALUES
(1, 'The Louvre', 48.8611473, 2.33802768704666, 'The world largest art museum.', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510', 4.7);
