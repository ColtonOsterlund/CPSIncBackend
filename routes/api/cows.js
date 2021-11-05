const express = require('express');
const {
  readCowById,
  deleteCow,
  updateCow,
} = require('../../database/cows/cows');
const { authenticateToken } = require('../../middleware/auth');
const { mySqlDateTimeNow } = require('../../utils/format_date');

const router = express.Router();

router.get('/:cowId', authenticateToken, async (req, res) => {
  const cow = await readCowById(req.params.cowId, req.user.id);
  res.status(200).json(cow);
});

router.put('/:cowId', authenticateToken, async (req, res) => {
  if (
    !req.body?.cowId ||
    !req.body?.daysInMilk ||
    !req.body?.dryOffDay ||
    !req.body?.mastitisHistory ||
    !req.body?.methodOfDryOff ||
    !req.body?.dailyMilkAverage ||
    !req.body?.parity ||
    !req.body?.reproductionStatus ||
    !req.body?.numberOfTimesBred ||
    !req.body?.farmBreedingIndex ||
    !req.body?.lactationNumber ||
    !req.body?.daysCarriedCalfIfPregnant ||
    !req.body?.projectedDueDate ||
    !req.body?.current305DayMilk ||
    !req.body?.currentSomaticCellCount ||
    !req.body?.linearScoreAtLastTest ||
    !req.body?.dateOfLastClinicalMastitis ||
    !req.body?.chainVisibleId ||
    !req.body?.animalRegistrationNoNlid ||
    !req.body?.damBreed ||
    !req.body?.culled
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const cow = {
    cowId: req.body.cowId,
    daysInMilk: req.body.daysInMilk,
    dryOffDay: req.body.dryOffDay,
    mastitisHistory: req.body.mastitisHistory,
    methodOfDryOff: req.body.methodOfDryOff,
    dailyMilkAverage: req.body.dailyMilkAverage,
    parity: req.body.parity,
    reproductionStatus: req.body.reproductionStatus,
    numberOfTimesBred: req.body.numberOfTimesBred,
    farmBreedingIndex: req.body.farmBreedingIndex,
    lactationNumber: req.body.lactationNumber,
    daysCarriedCalfIfPregnant: req.body.daysCarriedCalfIfPregnant,
    projectedDueDate: req.body.projectedDueDate,
    current305DayMilk: req.body.current305DayMilk,
    currentSomaticCellCount: req.body.currentSomaticCellCount,
    linearScoreAtLastTest: req.body.linearScoreAtLastTest,
    dateOfLastClinicalMastitis: req.body.dateOfLastClinicalMastitis,
    chainVisibleId: req.body.chainVisibleId,
    animalRegistrationNoNlid: req.body.animalRegistrationNoNlid,
    damBreed: req.body.damBreed,
    culled: req.body.culled,
    modifyDate: mySqlDateTimeNow(),
  };

  // TODO: Check if there was an error in updating
  const result = await updateCow(cow, req.params.cowId, req.user.id);

  res.status(201).json({ message: 'Successfully updated cow' });
});

router.delete('/:cowId', authenticateToken, async (req, res) => {
  // TODO: Check if there was an error in deleting
  const result = await deleteCow(req.params.cowId, req.user.id);
  res.status(201).json({ message: 'Successfully deleted cow' });
});

router.get('/:cowId/strip-tests', authenticateToken, async (req, res) => {
  // TODO: Read all strip tests of a cow from authenticated user
  // {req.params.cowId} to get cow ID
  res.status(200).json({});
});

router.post('/:cowId/strip-tests', authenticateToken, async (req, res) => {
  // TODO: Create new strip test in a cow by authenticated user
  // {req.params.cowId} to get cow ID
  res.status(201).json({});
});

module.exports = router;
