/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
let field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
let currentPlayer = 1;
let roundWon = false;

const winningCases = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function getField() {
  return field;
}

function resetField() {
  field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
}

function presetField(newField) {
  field = newField;
}

function setCurrentPlayer(i) {
  currentPlayer = i;
}

function getCurrentPlayer() {
  return currentPlayer;
}

function switchCurrentPlayer() {
  if (currentPlayer === 1) {
    setCurrentPlayer(2);
  } else {
    setCurrentPlayer(1);
  }
}

function handleResult(cells) {
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningCases[i];
    const a = cells[winCondition[0]];
    const b = cells[winCondition[1]];
    const c = cells[winCondition[2]];
    if (a === 0 || b === 0 || c === 0) {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
}

function makeMove(x, y) {
  x -= 1;
  y -= 1;
  if (field[y][x] === 0) {
    field[y][x] = getCurrentPlayer();
  } else {
    throw new Error('Вы не можете сходить в данную клетку');
  }
  const value = [...field[0], ...field[1], ...field[2]];
  handleResult(value);
  checkForWinner();
  checkForDraw();
  switchCurrentPlayer();
}

function checkForWinner() {
  if (roundWon) {
    console.log(`Игрок №${currentPlayer} выиграл раунд`);
    resetField();
    roundWon = !roundWon;
    setCurrentPlayer(2);
  }
}

function checkForDraw() {
  const fieldArray = [...field[0], ...field[1], ...field[2]];
  const roundDraw = !fieldArray.includes(0);
  if (roundDraw) {
    console.log('Ничья!');
    resetField();
    switchCurrentPlayer();
  }
}


module.exports = {
  getField,
  getCurrentPlayer,
  makeMove,
  resetField,
  presetField,
  setCurrentPlayer,
  switchCurrentPlayer,
  checkForWinner,
  handleResult,
  checkForDraw,
};
