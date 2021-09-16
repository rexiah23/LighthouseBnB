const { query } = require('express');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

/// Users
const properties = require('./json/properties.json');
const users = require('./json/users.json');


const getAllProperties = function (options, limit = 10) {
  console.log('options: ', options)
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  console.log('queryString Before : ', queryString);

  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `WHERE city LIKE $${queryParams.length} `;
  }
 
  if (options.owner_id) {
    queryParams.push(`${options.owner_id}`)
    queryString += `AND owner_id = $${queryParams.length} `;
  }

  if (options.minimum_price_per_night && options.maximum_price_per_night) {
    console.log('min nights hit')
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `AND cost_per_night >= $${queryParams.length} `;
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `AND cost_per_night <= $${queryParams.length} `;
  }

  // 4
  queryString += `
  GROUP BY properties.id `
  
  if (options.minimum_rating) {
    queryParams.push(`${options.minimum_rating}`);
    queryString += `HAVING avg(property_reviews.rating) >= $${queryParams.length} `;
  }

  queryParams.push(limit);
  queryString += `
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  
  console.log('queryParams :', queryParams, 'queryString :', queryString);

  // 6
  return pool
  .query(queryString, queryParams)
  .then((res) => {
    return res.rows
  });
};

exports.getAllProperties = getAllProperties;

// const getAllProperties = function(options, limit = 10) {
//   const limitedProperties = {};
//   for (let i = 1; i <= limit; i++) {
//     limitedProperties[i] = properties[i];
//   }
//   return Promise.resolve(limitedProperties);
// }
// exports.getAllProperties = getAllProperties;

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
  .query(`
    SELECT * 
    FROM users 
    WHERE email = $1;
  `, [email])
  .then((result) => {
    if (!result.rows[0]) {
      return null;
    }
    if (result.rows.length !== 1) {
      return null;
    }
    return result.rows[0];
  })
  .catch(err => console.log('err', err));
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.
  query(`
    SELECT * 
    FROM users 
    WHERE users.id = $1; 
  `, [id])
  .then((result) => {
    if (!result.rows[0]) {
      return null;
    }
    return result.rows[0];
  })
  .catch(err => null); 
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const { name, email, password } = user; 
  const values = [name, email, password];
  return pool.
  query(`
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    RETURNING *;
  `, values)
  .then((result) => result.rows[0])
  .catch(err => console.log('err:', err.message));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
  .query(`
    SELECT * 
    FROM reservations
    WHERE guest_id = $1
    LIMIT $2;
  `, [guest_id, limit])
  // When I put LIMIT $2, it does not work
  .then(result => result.rows);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 //  */
 
 // const getAllProperties = function(options, limit = 10) {
   //   const limitedProperties = {};
   //   for (let i = 1; i <= limit; i++) {
     //     limitedProperties[i] = properties[i];
     //   }
     //   return Promise.resolve(limitedProperties);
     // }


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  console.log(property)
  const { owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, 
    number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code} = property; 
  const values = [owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, 
    number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, true];
  return pool. 
    query(`
      INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, 
        number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        RETURNING *;
    `, values)
    .then(result => result.rows)
  // const propertyId = Object.keys(properties).length + 1;
  // property.id = propertyId;
  // properties[propertyId] = property;
  // return Promise.resolve(property);
}
exports.addProperty = addProperty;
