const express = require('express');

const router = express.Router();

// TODO: Add middleware for authentication

router.get('/', async (req, res) => {
  // TODO: Read all herds from authenticated user
  res.status(200).json({});
});

router.post('/', async (req, res) => {
  // TODO: Create new herd by authenticated user
  res.status(201).json({});
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
