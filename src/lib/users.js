const uuid = require('uuid');
const logger = require('./logger');
const { Game } = require('../game');

const users = [
  {
    id: 1,
    username: 'arina',
    password: 'qwerty',
  },
  {
    id: 2,
    username: 'anna',
    password: '1234',
  },
];

const sessions = [];
const games = [];

function signUp(username, password) {
  const user = users.find((el) => el.username === username);
  if (user) {
    return { status: 403, message: 'A user with this username already exist. Please choose another username.' };
  }
  const id = users.length + 1;
  users.push({ id, username, password });
  return { status: 200, message: "You're sucessfuly signed up!" };
}

function logIn(username, password) {
  const user = users.find(
    (el) => el.username === username && el.password === password,
  );
  if (user) {
    const sessionId = uuid.v4();
    sessions.push({
      id: user.id,
      uuid: sessionId,
    });
    return { status: 200, message: sessionId };
  }
  return { status: 403, message: 'Incorrect data entered' };
}

function createNewGame(sessionId) {
  const session = sessions.find((el) => el.uuid === sessionId);
  const game = new Game();
  const gameId = uuid.v4();
  games.push({ uuid: gameId, game });
  logger.log(games);
  game.setParentPlayer(session.id);
  return { status: 200, message: 'You are in' };
}

function getActiveGames() {
  return { status: 200, message: games };
}

function connectToGame(gameId, sessionId) {
  const session = sessions.find((el) => el.uuid === sessionId);
  const game = games.find((el) => el.uuid === gameId);
  if (game) {
    game.game.setSecondPlayer(session.id);
    return { status: 200, message: 'OK' };
  }
  return { status: 404, message: 'Game not found' };
}

// Middlewares

function authMiddleware(req, res, next) {
  const userData = sessions.find((el) => el.uuid === req.headers.authorization);
  req.userCredentials = userData;
  next();
}

function restricted(req, res, next) {
  if (!req.userCredentials) {
    res.send(401, "You're not authorized for making this action");
  } else {
    next();
  }
}

module.exports = {
  signUp,
  logIn,
  authMiddleware,
  restricted,
  createNewGame,
  getActiveGames,
  connectToGame,
};
