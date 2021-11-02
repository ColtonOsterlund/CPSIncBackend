const express = require('express');

const router = express.Router();

// TODO: Add middleware for authentication

router.get('/:stripTestId', async (req, res) => {
  // TODO: Read specific strip test from authenticated user
  // {req.params.stripTestId} to get strip test ID
  res.status(200).json({});
});

router.put('/:stripTestId', async (req, res) => {
  // TODO: Update specific strip test by authenticated user
  // {req.params.stripTestId} to get strip test ID
  res.status(201).json({});
});

router.delete('/:stripTestId', async (req, res) => {
  // TODO: Delete specific strip test by authenticated user
  // {req.params.stripTestId} to get strip test ID
  res.status(201).json({});
});

module.exports = router;
