SELECT reservations.*, properties.*, avg(property_reviews.rating) as average_rating
FROM reservations 
JOIN properties ON reservations.property_id = properties.id 
JOIN property_reviews ON property_reviews.property_id = properties.id 
JOIN users ON property_reviews.guest_id = users.id 
WHERE property_reviews.guest_id = 1
AND reservations.end_date < now()::date
GROUP BY reservations.id, properties.id 
ORDER BY reservations.start_date
LIMIT 10;
