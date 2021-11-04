require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const hostname = process.env.HOST;
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users/', require('./routes/api/users'));
app.use('/api/herds/', require('./routes/api/herds'));
app.use('/api/cows/', require('./routes/api/cows'));
app.use('/api/strip-tests/', require('./routes/api/strip_tests'));

app.listen(port, () => console.log(`Server started on ${hostname}:${port}`));
