const router = require('express').Router();
const controller = require('./game');
const users = require('./lib/users');

router.get('/getField', users.restricted, (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  res.send(200, 'ok');
});

router.post('/signup', (req, res) => {
  const userId = users.signUp(req.body.login, req.body.password);
  res.send(200, userId);
});

router.post('/login', (req, res) => {
  const userId = users.logIn(req.body.login, req.body.password);
  res.send(200, userId);
});


module.exports = router;
