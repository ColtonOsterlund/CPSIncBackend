const escape = require('sql-template-strings');
const db = require('../connection');

module.exports = {
  readStripTests: async (cowId, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          strip_test_id AS stripTestId,
          test_type AS testType,
          units,
          millivolts,
          result,
          milk_fever AS milkFever,
          follow_up_num AS followUpNum,
          BIN_TO_UUID(cow_id) AS cowId
        FROM strip_tests
        WHERE cow_id = UUID_TO_BIN(${cowId})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results;
    } catch (error) {
      // TODO: Error handling
      return [];
    }
  },
  readStripTestById: async (id, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          strip_test_id AS stripTestId,
          test_type AS testType,
          units,
          millivolts,
          result,
          milk_fever AS milkFever,
          follow_up_num AS followUpNum,
          BIN_TO_UUID(cow_id) AS cowId
        FROM strip_tests
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results[0] ?? {};
    } catch (error) {
      return {};
    }
  },
  createStripTest: async (stripTest, cowId, userId) => {
    try {
      const result = await db.query(escape`
        INSERT
        INTO strip_tests (
          strip_test_id,
          test_type,
          units,
          millivolts,
          result,
          milk_fever,
          follow_up_num,
          cow_id,
          user_id
        )
        VALUES (
          ${stripTest.stripTestId},
          ${stripTest.testType},
          ${stripTest.units},
          ${stripTest.millivolts},
          ${stripTest.result},
          ${stripTest.milkFever},
          ${stripTest.followUpNum},
          UUID_TO_BIN(${cowId}),
          UUID_TO_BIN(${userId})
        )
      `);

      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  updateStripTest: async (stripTest, id, userId) => {
    try {
      const result = await db.query(escape`
        UPDATE strip_tests
        SET
          strip_test_id = ${stripTest.stripTestId},
          test_type = ${stripTest.testType},
          units = ${stripTest.units},
          millivolts = ${stripTest.millivolts},
          result = ${stripTest.result},
          milk_fever = ${stripTest.milkFever},
          follow_up_num = ${stripTest.followUpNum}
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  deleteStripTest: async (id, userId) => {
    try {
      const result = await db.query(escape`
        DELETE FROM strip_tests
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
