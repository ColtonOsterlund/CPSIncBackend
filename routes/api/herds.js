const express = require('express');
const { readCows, createCow } = require('../../database/cows/cows');
const {
  readHerds,
  readHerdById,
  createHerd,
  updateHerd,
  deleteHerd,
} = require('../../database/herds/herds');
const { authenticateToken } = require('../../middleware/auth');
const { mySqlDateTimeNow } = require('../../utils/format_date');

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
  const herds = await readHerds(req.user.id);
  res.status(200).json(herds);
});

router.post('/', authenticateToken, async (req, res) => {
  if (
    !req.body?.herdId ||
    !req.body?.location ||
    !req.body?.milkingSystem ||
    !req.body?.pin
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const herd = {
    herdId: req.body.herdId,
    location: req.body.location,
    milkingSystem: req.body.milkingSystem,
    pin: req.body.pin,
    modifyDate: mySqlDateTimeNow(),
  };

  // TODO: Check if there was an error in creating
  const result = await createHerd(herd, req.user.id);

  res.status(201).json({ message: 'Successfully created herd' });
});

router.get('/:herdId', authenticateToken, async (req, res) => {
  const herd = await readHerdById(req.params.herdId, req.user.id);
  res.status(200).json(herd);
});

router.put('/:herdId', authenticateToken, async (req, res) => {
  if (
    !req.body?.herdId ||
    !req.body?.location ||
    !req.body?.milkingSystem ||
    !req.body?.pin
  ) {
    return res.status(400).json({ message: 'Missing fields in request body' });
  }

  const herd = {
    herdId: req.body.herdId,
    location: req.body.location,
    milkingSystem: req.body.milkingSystem,
    pin: req.body.pin,
    modifyDate: mySqlDateTimeNow(),
  };

  // TODO: Check if there was an error in updating
  const result = await updateHerd(herd, req.params.herdId, req.user.id);

  res.status(201).json({ message: 'Successfully updated herd' });
});

router.delete('/:herdId', authenticateToken, async (req, res) => {
  // TODO: Check if there was an error in deleting
  const result = await deleteHerd(req.params.herdId, req.user.id);
  res.status(201).json({ message: 'Successfully deleted herd' });
});

router.get('/:herdId/cows', authenticateToken, async (req, res) => {
  const cows = await readCows(req.params.herdId, req.user.id);
  res.status(200).json(cows);
});

router.post('/:herdId/cows', authenticateToken, async (req, res) => {
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
  const result = await createCow(cow, req.params.herdId, req.user.id);

  res.status(201).json({ message: 'Successfully created cow' });
});

module.exports = router;
