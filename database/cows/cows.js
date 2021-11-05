const escape = require('sql-template-strings');
const db = require('../connection');

module.exports = {
  readCows: async (herdId, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          cow_id AS cowId,
          days_in_milk AS daysInMilk,
          dry_off_day AS dryOffDay,
          mastitis_history AS mastitisHistory,
          method_of_dry_off AS methodOfDryOff,
          daily_milk_average AS dailyMilkAverage,
          parity,
          reproduction_status AS reproductionStatus,
          number_of_times_bred AS numberOfTimesBred,
          farm_breeding_index AS farmBreedingIndex,
          lactation_number AS lactationNumber,
          days_carried_calf_if_pregnant AS daysCarriedCalfIfPregnant,
          projected_due_date AS projectedDueDate,
          current_305_day_milk AS current305DayMilk,
          current_somatic_cell_count AS currentSomaticCellCount,
          linear_score_at_last_test AS linearScoreAtLastTest,
          date_of_last_clinical_mastitis AS dateOfLastClinicalMastitis,
          chain_visible_id AS chainVisibleId,
          animal_registration_no_nlid AS animalRegistrationNoNlid,
          dam_breed AS damBreed,
          culled,
          BIN_TO_UUID(herd_id) AS herdId
        FROM cows
        WHERE herd_id = UUID_TO_BIN(${herdId})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results;
    } catch (error) {
      // TODO: Error handling
      return [];
    }
  },
  readCowById: async (id, userId) => {
    try {
      const results = await db.query(escape`
        SELECT
          BIN_TO_UUID(id) AS id,
          cow_id AS cowId,
          days_in_milk AS daysInMilk,
          dry_off_day AS dryOffDay,
          mastitis_history AS mastitisHistory,
          method_of_dry_off AS methodOfDryOff,
          daily_milk_average AS dailyMilkAverage,
          parity,
          reproduction_status AS reproductionStatus,
          number_of_times_bred AS numberOfTimesBred,
          farm_breeding_index AS farmBreedingIndex,
          lactation_number AS lactationNumber,
          days_carried_calf_if_pregnant AS daysCarriedCalfIfPregnant,
          projected_due_date AS projectedDueDate,
          current_305_day_milk AS current305DayMilk,
          current_somatic_cell_count AS currentSomaticCellCount,
          linear_score_at_last_test AS linearScoreAtLastTest,
          date_of_last_clinical_mastitis AS dateOfLastClinicalMastitis,
          chain_visible_id AS chainVisibleId,
          animal_registration_no_nlid AS animalRegistrationNoNlid,
          dam_breed AS damBreed,
          culled,
          BIN_TO_UUID(herd_id) AS herdId
        FROM cows
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);

      return results[0] ?? {};
    } catch (error) {
      return {};
    }
  },
  createCow: async (cow, herdId, userId) => {
    try {
      const result = await db.query(escape`
        INSERT
        INTO cows (
          cow_id,
          days_in_milk,
          dry_off_day,
          mastitis_history,
          method_of_dry_off,
          daily_milk_average,
          parity,
          reproduction_status,
          number_of_times_bred,
          farm_breeding_index,
          lactation_number,
          days_carried_calf_if_pregnant,
          projected_due_date,
          current_305_day_milk,
          current_somatic_cell_count,
          linear_score_at_last_test,
          date_of_last_clinical_mastitis,
          chain_visible_id,
          animal_registration_no_nlid,
          dam_breed,
          culled,
          modify_date,
          herd_id,
          user_id
        )
        VALUES (
          ${cow.cowId},
          ${cow.daysInMilk},
          ${cow.dryOffDay},
          ${cow.mastitisHistory},
          ${cow.methodOfDryOff},
          ${cow.dailyMilkAverage},
          ${cow.parity},
          ${cow.reproductionStatus},
          ${cow.numberOfTimesBred},
          ${cow.farmBreedingIndex},
          ${cow.lactationNumber},
          ${cow.daysCarriedCalfIfPregnant},
          ${cow.projectedDueDate},
          ${cow.current305DayMilk},
          ${cow.currentSomaticCellCount},
          ${cow.linearScoreAtLastTest},
          ${cow.dateOfLastClinicalMastitis},
          ${cow.chainVisibleId},
          ${cow.animalRegistrationNoNlid},
          ${cow.damBreed},
          ${cow.culled},
          ${cow.modifyDate},
          UUID_TO_BIN(${herdId}),
          UUID_TO_BIN(${userId})
        )
      `);

      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  updateCow: async (cow, id, userId) => {
    try {
      const result = await db.query(escape`
        UPDATE cows
        SET
          cow_id = ${cow.cowId},
          days_in_milk = ${cow.daysInMilk},
          dry_off_day = ${cow.dryOffDay},
          mastitis_history = ${cow.mastitisHistory},
          method_of_dry_off = ${cow.methodOfDryOff},
          daily_milk_average = ${cow.dailyMilkAverage},
          parity = ${cow.parity},
          reproduction_status = ${cow.reproductionStatus},
          number_of_times_bred = ${cow.numberOfTimesBred},
          farm_breeding_index = ${cow.farmBreedingIndex},
          lactation_number = ${cow.lactationNumber},
          days_carried_calf_if_pregnant = ${cow.daysCarriedCalfIfPregnant},
          projected_due_date = ${cow.projectedDueDate},
          current_305_day_milk = ${cow.current305DayMilk},
          current_somatic_cell_count = ${cow.currentSomaticCellCount},
          linear_score_at_last_test = ${cow.linearScoreAtLastTest},
          date_of_last_clinical_mastitis = ${cow.dateOfLastClinicalMastitis},
          chain_visible_id = ${cow.chainVisibleId},
          animal_registration_no_nlid = ${cow.animalRegistrationNoNlid},
          dam_breed = ${cow.damBreed},
          culled = ${cow.culled},
          modify_date = ${cow.modifyDate}
        WHERE id = UUID_TO_BIN(${id})
        AND user_id = UUID_TO_BIN(${userId})
      `);
      return result;
    } catch (error) {
      // TODO: Error handling
      return;
    }
  },
  deleteCow: async (id, userId) => {
    try {
      const result = await db.query(escape`
        DELETE FROM cows
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
