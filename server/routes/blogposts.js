/* eslint-disable linebreak-style */
const express = require('express');
const fs = require('fs');

const router = express.Router();

const posts = JSON.parse(fs.readFileSync('./server/data/blogposts.json', 'utf8'));

router.get('/api/blogpost', (req, res) => {
  res.json(posts);
});
// router.get('/api/blogpost/:id', (req, res) => {});
// router.post('/api/blogpost', (req, res) => {});
// router.put('/api/blogpost/:id', (req, res) => {});
// router.delete('/api/blogpost/:id', (req, res) => {});

module.exports = router;
