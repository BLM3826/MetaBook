/* eslint-disable no-plusplus */
const cookieParser = require('cookie-parser');
const express = require('express');
const httpErrors = require('http-errors');
const logger = require('morgan');
const path = require('path');

// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/blogposts');

const accounts = ['Bill,password123', 'Bob,password456', 'Joe,password789'];

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/app')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/posts', postsRouter);

app.get('/api/', (req, res) => {
  res.send('testAPI');
});

// BlogPost Routes
// app.get('/api/blogpost', (req, res) => { });
// app.get('/api/blogpost/:id', (req, res) => {});
// app.post('/api/blogpost', (req, res) => {});
// app.put('/api/blogpost/:id', (req, res) => {});
// app.delete('/api/blogpost/:id', (req, res) => {});

// User Routes
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const account = `${username},${password}`;
  const valid = account in accounts;
  if (!valid) {
    throw httpErrors(401, 'Invalid username or password');
  }
  res.cookie({ username }).sendStatus(200);
});

app.post('/api/logout', (req, res) => {
  res.cookie('logout').sendStatus(200);
});

app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  for (let i = 0; i < accounts.length; ++i) {
    if (accounts[i].includes(username)) {
      throw httpErrors(409, 'Username already exists');
    }
  }
  const account = `${username},${password}`;
  accounts.push(account);
  res.cookie({ username }).sendStatus(200);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(httpErrors(404));
});
// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
