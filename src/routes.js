const router = require('express').Router();
const controller = require('./game');

router.get('/getField', (req, res) => {
  res.send(200, controller.getField());
});

router.post('/move', (req, res) => {
  controller.makeMove(req.body.x, req.body.y);
  controller.checkForWinner();
  controller.checkForDraw();
  controller.switchCurrentPlayer();
  res.send(200, 'ok');
});


module.exports = router;
