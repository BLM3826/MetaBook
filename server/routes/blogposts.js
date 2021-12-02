/* eslint-disable linebreak-style */
/* eslint-disable no-console */
const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const filepath = path.resolve(__dirname, 'blogposts.json');

const posts = JSON.parse(fs.readFileSync(filepath, 'utf8'));
console.log(filepath);

// GET all blogposts
router.get('/', (req, res) => {
  res.json(posts);
});

// GET all blogposts from a specific user
router.get('/user/:name', (req, res) => {
  const userPosts = posts.filter((post) => post.name === req.params.name);
  res.json(userPosts);
});

// GET a specific blogpost
router.get('/:id', (req, res) => {
  const blogpost = posts.find((post) => post.id === parseInt(req.params.id, 10));
  console.log(blogpost);
  res.json(blogpost);
});

// POST a new blogpost
router.post('/', (req, res) => {
  const newPost = {
    id: posts.length,
    name: req.body.name,
    title: req.body.title,
    content: req.body.content,
  };
  posts.push(newPost);
  fs.writeFileSync(filepath, JSON.stringify(posts));
  console.log(newPost);
  res.json(newPost);
});

// UPDATE an existing blogpost
router.put('/:id', (req, res) => {
  const blogpost = posts.find((post) => post.id === parseInt(req.params.id, 10));
  blogpost.name = req.body.name;
  blogpost.title = req.body.title;
  blogpost.content = req.body.content;
  fs.writeFileSync(filepath, JSON.stringify(posts));
  console.log(blogpost);
  res.json(blogpost);
});

// DELETE a specific blogpost
router.delete('/:id', (req, res) => {
  const blogpost = posts.find((post) => post.id === parseInt(req.params.id, 10));
  posts.splice(posts.indexOf(blogpost), 1);
  fs.writeFileSync(filepath, JSON.stringify(posts));
  console.log(blogpost);
  res.json(blogpost);
});

module.exports = router;
