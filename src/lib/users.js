const uuid = require('uuid');

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

const sessions = {};

function signUp(username, password) {
  const user = users.find((el) => el.username === username);
  if (user) {
    return 'A user with this username already exist. Please choose another username.';
  }
  const id = users.length + 1;
  users.push({ id, username, password });
  return "You're sucessfuly signed up!";
}

function logIn(username, password) {
  const user = users.find(
    (el) => el.username === username && el.password === password,
  );
  if (user) {
    const sessionID = uuid.v4();
    sessions[sessionID] = {
      id: user.id,
    };
    return sessionID;
  }
  return -1;
}

function checkSession(sessionID) {
  return sessions[sessionID];
}

// Middlewares

function authMiddleware(req, res, next) {
  const userData = checkSession(req.headers.authorization);
  req.userCredentials = userData;
  next();
}

function restricted(req, res, next) {
  if (!req.userCredentials) {
    res.send(401, "You're not authorized for viewing this page");
  } else {
    next();
  }
}

module.exports = {
  signUp,
  logIn,
  checkSession,
  authMiddleware,
  restricted,
};
