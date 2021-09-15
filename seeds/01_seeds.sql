-- Insert into users table
INSERT INTO users (name, email, password) VALUES ('Lewis', 'lewis4bmco@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Chris', 'chris42@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Andrew', 'andy25@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

-- Insert into properties table 
INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,
number_of_bedrooms, country, street, city, province, post_code, active)
VALUES (1, 'Beach Front Getaway', 'Beautiful beach front mansion for rent', 
'https://www.google.ca/url?sa=i&url=https%3A%2F%2Fwww.loveproperty.com%2Fgallerylist%2F62471%2F10-breathtaking-beach-homes-you-wont-believe&psig=AOvVaw1UFf5gyHUAbg0jI4ZPc8NI&ust=1631812728878000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLC8xqK-gfMCFQAAAAAdAAAAABAD',
'https://www.google.ca/url?sa=i&url=https%3A%2F%2Fwww.loveproperty.com%2Fgallerylist%2F62471%2F10-breathtaking-beach-homes-you-wont-believe&psig=AOvVaw1UFf5gyHUAbg0jI4ZPc8NI&ust=1631812728878000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCLC8xqK-gfMCFQAAAAAdAAAAABAI',
5000, 
5,
5,
5,
'Canada',
'Fake Street',
'Fake City',
'Ontario',
'A1B 2C3',
true 
),
(2, 'title2', 'description', 'thumbnail_url', 'cover_photo_url', 30, 2, 4, 5, 'fake', 'fake', 'fake', 'fake', 'G4H 5H3', true),
(3, 'title3', 'description', 'thumbnail_url', 'cover_photo_url', 30, 10, 4, 5, 'fake', 'fake', 'fake', 'fake', 'M4T 8H4', true);

-- Insert into reservations table
INSERT INTO reservations (start_date, end_date, property_id, guest_id) VALUES ('2018-09-11', '2018-09-25',1, 1), 
('2019-01-23', '2019-02-05',2, 2), 
('2020-01-24', '2020-01-28',3, 3); 

-- Insert into property_reviews table 
INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) VALUES (1, 1, 1, 3, 'messages'),
(3, 2, 3, 5, 'messages'),
(2, 3, 2, 10, 'messages');