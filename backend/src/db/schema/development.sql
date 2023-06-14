INSERT INTO USERS (first_name, last_name, username, email, password)
VALUES
('John', 'Doe', 'johndoe', 'john.doe@example.com', '$2b$10$wIvsSL7/eIt1HDyCsNeJoeESkly2dA7iWcP9bQWXrSWDETu159u/i');


INSERT INTO ITINERARIES (user_id, accommodations, response_prompt, city, country, image_url)
VALUES
(1, '3-star hotel', 'Your itinerary for Positano...', 'Positano', 'Italy', 'https://a.cdn-hotels.com/gdcs/production144/d547/b9cfd8e5-212f-4945-8010-b76f326ccd18.jpg');

INSERT INTO ITINERARIES (user_id, accommodations, response_prompt, city, country, image_url)
VALUES
(1, '3-star hotel', 'Your itinerary for Paris...', 'Paris', 'France', 'https://www.travelandleisure.com/thmb/SPUPzO88ZXq6P4Sm4mC5Xuinoik=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/eiffel-tower-paris-france-EIFFEL0217-6ccc3553e98946f18c893018d5b42bde.jpg');

INSERT INTO MAPS (id, itinerary_id, name, city, country, image_url)
VALUES
(1, 1, 'Paris Itinerary', 'Paris', 'France', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510');


INSERT INTO POINTS (id, map_id, title, latitude, longitude, description, image_url, rating)
VALUES
(1, 1, 'The Louvre', 48.8611473, 2.33802768704666, 'The world largest art museum.', 'https://lh3.googleusercontent.com/p/AF1QipOnJHzIOu1VUvkTX0GKjmqK-NdgXWJEUa8m2YPd=s680-w680-h510', 4.7);
