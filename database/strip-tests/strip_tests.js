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
          follow_up_num,
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
};
