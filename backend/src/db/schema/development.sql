INSERT INTO USERS (first_name, last_name, username, email, password)
VALUES
('John', 'Doe', 'johndoe', 'john.doe@example.com', 'password');


INSERT INTO ITINERARIES (user_id, search_prompt, number_of_days, interests, daily_budget, accommodations, response_prompt)
VALUES
(1, 'I want to visit Paris for 7 days with interest in museums and local cuisine, my daily budget is 100 dollars.', 7, 'museums, local cuisine', 100, '3-star hotel', 'Your itinerary for Paris...');



INSERT INTO MAPS (itinerary_id, name, city, country, image_url)
VALUES
(1, 'Paris Itinerary', 'Paris', 'France', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510');


INSERT INTO POINTS (map_id, title, latitude, longitude, description, image_url, rating)
VALUES
(1, 'The Louvre', 48.8611473, 2.33802768704666, "The world\'s largest art museum.", 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510', 4.7);
