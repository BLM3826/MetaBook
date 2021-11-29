/* eslint-disable no-console */
/* eslint-disable linebreak-style */
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filepath = path.resolve(__dirname, 'blogposts.json');

const posts = JSON.parse(fs.readFileSync(filepath, 'utf8'));
console.log(filepath);
router.get('/', (req, res) => {
  res.json(posts);
});
// router.get('/api/blogpost/:id', (req, res) => {});
// router.post('/api/blogpost', (req, res) => {});
// router.put('/api/blogpost/:id', (req, res) => {});
// router.delete('/api/blogpost/:id', (req, res) => {});

module.exports = router;
