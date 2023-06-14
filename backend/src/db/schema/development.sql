INSERT INTO USERS (first_name, last_name, username, email, password)
VALUES
('John', 'Doe', 'johndoe', 'john.doe@example.com', 'password');


INSERT INTO ITINERARIES (user_id, accommodations, response_prompt, city, country, image_url)
VALUES
(1,'3-star hotel', 'Your itinerary for Paris...', 'Paris', 'France', 'https://images.unsplash.com/photo-1559511260-66a654ae982a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmFuY291dmVyfGVufDB8fDB8fHww&w=1000&q=80');


INSERT INTO POINTS (itinerary_id, title, latitude, longitude, description, image_url, rating)
VALUES
(1, 'The Louvre', 48.8611473, 2.33802768704666, 'The world largest art museum.', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510', 4.7);
