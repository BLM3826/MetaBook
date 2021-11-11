/* eslint-disable no-console */
const express = require('express');
const httpErrors = require('http-errors');

const router = express.Router();

const accounts = ['Bill,password123', 'Bob,password456', 'Joe,password789'];

// login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const account = `${username},${password}`;
  const valid = accounts.includes(account);
  if (!valid) {
    res.status(401).send(`${account} is not ${accounts[0]}`);
    // throw httpErrors(401, `${account} is not ${accounts[0]}`);
  } else {
    res.cookie({ username }).sendStatus(200);
  }
});

// logout route
router.post('/logout', (req, res) => {
  res.cookie('logout').sendStatus(200);
});

// register route
router.post('/register', (req, res) => {
  const { username, password } = req.body;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].includes(username)) {
      console.log(`${username} already exists`);
      res.status(401).send(`${username} already exists`);
      throw httpErrors(401, `${username} already exists`);
    }
  }
  const account = `${username},${password}`;
  accounts.push(account);
  console.log(accounts);
  res.cookie({ username }).sendStatus(200);
});

module.exports = router;
