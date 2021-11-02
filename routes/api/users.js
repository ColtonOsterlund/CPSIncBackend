const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  // TODO: Read authenticated user
  res.status(200).json({});
});

router.post('/', async (req, res) => {
  // TODO: Create new user
  res.status(201).json({});
});

router.post('/login', async (req, res) => {
  // TODO: Login user
  res.status(201).json({});
});

router.get('/logout', async (req, res) => {
  // TODO: Logout user
  res.status(200).json({});
});

module.exports = router;
