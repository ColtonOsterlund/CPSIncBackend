const escape = require('sql-template-strings');
const db = require('../connection');

module.exports = {
  readHerds: async (userId) => {
    const results = await db.query(escape`
      SELECT
        BIN_TO_UUID(id) AS id,
        herd_id AS herdId,
        location,
        milking_system AS milkingSystem,
        pin
      FROM herds
      WHERE user_id = UUID_TO_BIN(${userId})
    `);

    return results;
  },
  readHerdById: async (id, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          herd_id AS herdId,
          location,
          milking_system AS milkingSystem,
          pin
        FROM herds
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results[0] ?? {};
    } catch (error) {
      return {};
    }
  },
  createHerd: async (herd, userId) => {
    const { herdId, location, milkingSystem, pin, modifyDate } = herd;

    const result = await db.query(escape`
      INSERT
      INTO herds (
        herd_id,
        location,
        milking_system,
        pin,
        modify_date,
        user_id
      )
      VALUES (
        ${herdId},
        ${location},
        ${milkingSystem},
        ${pin},
        ${modifyDate},
        UUID_TO_BIN(${userId})
      )
    `);

    return result;
  },
  updateHerd: async (herd, id, userId) => {
    const { herdId, location, milkingSystem, pin, modifyDate } = herd;

    try {
      const result = await db.query(escape`
        UPDATE herds
        SET
          herd_id = ${herdId},
          location = ${location},
          milking_system = ${milkingSystem},
          pin = ${pin},
          modify_date = ${modifyDate}
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  deleteHerd: async (id, userId) => {
    try {
      const result = await db.query(escape`
        DELETE FROM herds
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
};
