const router = require('express').Router();
// const controller = require('./game');
const users = require('./lib/users');

router.post('/signup', (req, res) => {
  const data = users.signUp(req.body.login, req.body.password);
  res.status(data.status).send(data.message);
});

router.post('/login', (req, res) => {
  const data = users.logIn(req.body.login, req.body.password);
  res.status(data.status).send(data.message);
});

router.post('/createGame', users.restricted, (req, res) => {
  const data = users.createNewGame(req.headers.authorization);
  res.status(data.status).send(data.message);
});

router.get('/getActiveGames', users.restricted, (req, res) => {
  const data = users.getActiveGames(req.headers.authorization);
  res.status(data.status).send(data.message);
});

router.post('/connectToGame', users.restricted, (req, res) => {
  const data = users.connectToGame(req.body.gameId, req.headers.authorization);
  res.status(data.status).send(data.message);
});

// router.get('/getField', (req, res) => {
//   res.send(200, controller.getField());
// });

// router.post('/move', (req, res) => {
//   controller.makeMove(req.body.x, req.body.y);
//   res.send(200, 'ok');
// });


module.exports = router;
