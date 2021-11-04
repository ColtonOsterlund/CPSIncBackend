const express = require('express');
const bcrypt = require('bcryptjs');
const {
  createUser,
  getUser,
  userExistsByEmail,
} = require('../../database/users/users');

const router = express.Router();

router.get('/', async (req, res) => {
  // TODO: Obtain email from authenticated user
  const tempEmail = '';
  const user = await getUser(tempEmail);
  res.status(200).json(user);
});

router.post('/', async (req, res) => {
  if (
    !req.body?.email ||
    !req.body?.password ||
    !req.body?.firstName ||
    !req.body?.lastName ||
    !req.body?.mainAddress ||
    !req.body?.secondaryAddress === undefined ||
    !req.body?.city ||
    !req.body?.province ||
    !req.body?.country ||
    !req.body?.zipCode ||
    !req.body?.phone
  ) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  // TODO: Validation

  const emailExists = await userExistsByEmail(req.body.email);
  if (emailExists) {
    return res.status(409).json({ message: 'The email is already in use' });
  }

  const saltRounds = 13;
  bcrypt.hash(req.body.password, saltRounds, async (error, hash) => {
    if (error) throw error;

    const user = {
      email: req.body.email,
      hash: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mainAddress: req.body.mainAddress,
      secondaryAddress: req.body.secondaryAddress,
      city: req.body.city,
      province: req.body.province,
      country: req.body.country,
      zipCode: req.body.zipCode,
      phone: req.body.phone,
    };

    const result = await createUser(user);
    // TODO: Respond with error message if cannot create user in DB
  });

  res.status(201).json({ message: 'Successfully created user' });
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
