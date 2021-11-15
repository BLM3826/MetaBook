/* eslint-disable no-console */
/* eslint-disable no-plusplus */
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const usersRouter = require('./routes/users');
// const postsRouter = require('./routes/blogposts');
// const router = require('./routes/router');

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
// app.use('/api/blogpost', postsRouter);

/*
// // catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(httpErrors(404));
// });
// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.json(err);
// });
 */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
