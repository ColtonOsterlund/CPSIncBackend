const escape = require('sql-template-strings');
const db = require('../connection');

module.exports = {
  readUserByEmail: async (email) => {
    const results = await db.query(escape`
      SELECT
        BIN_TO_UUID(id) AS id,
        email,
        password,
        first_name AS firstName,
        last_name AS lastName,
        main_address AS mainAddress,
        secondary_address AS secondaryAddress,
        city,
        province,
        country,
        zip_code AS zipCode,
        phone
      FROM users
      WHERE email = ${email}
    `);

    return { ...(results[0] ?? {}) };
  },
  createUser: async (user) => {
    const {
      email,
      hash,
      firstName,
      lastName,
      mainAddress,
      secondaryAddress,
      city,
      province,
      country,
      zipCode,
      phone,
    } = user;

    const result = db.query(escape`
      INSERT
      INTO users (
        email,
        password,
        first_name,
        last_name,
        main_address,
        secondary_address,
        city,
        province,
        country,
        zip_code,
        phone
      )
      VALUES (
        ${email},
        ${hash},
        ${firstName},
        ${lastName},
        ${mainAddress},
        ${secondaryAddress},
        ${city},
        ${province},
        ${country},
        ${zipCode},
        ${phone}
      )
    `);

    return result;
  },
  userExistsByEmail: async (email) => {
    const result = await db.query(escape`
      SELECT email
      FROM users
      WHERE email = ${email}
    `);

    return result.length > 0;
  },
};
