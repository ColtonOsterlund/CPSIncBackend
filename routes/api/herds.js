const express = require('express');
const { readHerds, createHerd } = require('../../database/herds/herds');
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

  const result = await createHerd(herd, req.user.id);

  res.status(201).json({ message: 'Successfully created herd' });
});

router.get('/:herdId', async (req, res) => {
  // TODO: Read specific herd from authenticated user
  // {req.params.herdId} to get herd ID
  res.status(200).json({});
});

router.put('/:herdId', async (req, res) => {
  // TODO: Update specific herd by authenticated user
  // {req.params.herdId} to get herd ID
  res.status(201).json({});
});

router.delete('/:herdId', async (req, res) => {
  // TODO: Delete specific herd by authenticated user
  // {req.params.herdId} to get herd ID
  res.status(201).json({});
});

router.get('/:herdId/cows', async (req, res) => {
  // TODO: Read all cows of a herd from authenticated user
  // {req.params.herdId} to get herd ID
  res.status(200).json({});
});

router.post('/:herdId/cows', async (req, res) => {
  // TODO: Create new cow in a herd by authenticated user
  // {req.params.herdId} to get herd ID
  res.status(201).json({});
});

module.exports = router;
