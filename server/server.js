/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/blogposts');

const app = express();
const port = 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client')));

// api path prefix
app.use('/api', usersRouter);

// api/blogpost path prefix
app.use('/api/blogposts', postsRouter);

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});

module.exports = app;
