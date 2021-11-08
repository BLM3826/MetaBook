const { Router } = require('express');

const router = Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/user1', (req, res, next) => {
  res.send('you are in user1');
});

// handleSubmit = async (e) => {
//   e.preventDefault();

//   const api = this.state.isLogin ? 'login' : 'register';

//   fetch(`/api/${api}`, {})
// }

module.exports = Router;
