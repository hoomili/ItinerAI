INSERT INTO USERS (id, first_name, last_name, username, email, password)
VALUES
(1, 'John', 'Doe', 'johndoe', 'john.doe@example.com', 'password');


INSERT INTO ITINERARIES (user_id, number_of_days, interests, daily_budget, accommodations, response_prompt)
VALUES
(1, 7, 'museums, local cuisine', 100, '3-star hotel', 'Your itinerary for Paris...');


INSERT INTO POINTS (itinerary_id, title, latitude, longitude, description, image_url, rating)
VALUES
(1, 'The Louvre', 48.8611473, 2.33802768704666, 'The world largest art museum.', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510', 4.7);
