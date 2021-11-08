/* eslint-disable linebreak-style */
const { Router } = require('express');

const router = Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a blogpost');
});

// router.get('/', (req, res, next) => {
//   res.send('you are in post1');
// });

module.exports = Router;
