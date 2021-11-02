const express = require('express');

const router = express.Router();

// TODO: Add middleware for authentication

router.get('/:cowId', async (req, res) => {
  // TODO: Read specific cow from authenticated user
  // {req.params.cowId} to get cow ID
  res.status(200).json({});
});

router.put('/:cowId', async (req, res) => {
  // TODO: Update specific cow by authenticated user
  // {req.params.cowId} to get cow ID
  res.status(201).json({});
});

router.delete('/:cowId', async (req, res) => {
  // TODO: Delete specific cow by authenticated user
  // {req.params.cowId} to get cow ID
  res.status(201).json({});
});

router.get('/:cowId/strip-tests', async (req, res) => {
  // TODO: Read all strip tests of a cow from authenticated user
  // {req.params.cowId} to get cow ID
  res.status(200).json({});
});

router.post('/:cowId/strip-tests', async (req, res) => {
  // TODO: Create new strip test in a cow by authenticated user
  // {req.params.cowId} to get cow ID
  res.status(201).json({});
});

module.exports = router;
