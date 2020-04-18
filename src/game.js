/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-continue */
/* eslint-disable no-use-before-define */

class Game {
  constructor() {
    this.parentUserId = '';
    this.secondPlayerId = '';
    this.field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; // Initial field state
    this.currentPlayer = 1;
    this.roundWon = false;
    this.canMakeMove = false;
    this.winningCases = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
      [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  }

  setParentPlayer(playerId) {
    this.parentUserId = playerId;
  }

  setSecondPlayer(playerId) {
    this.secondPlayerId = playerId;
  }

  getField() {
    return this.field;
  }

  resetField() {
    this.field = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  }

  presetField(newField) {
    this.field = newField;
  }

  setCurrentPlayer(id) {
    this.currentPlayer = id;
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  switchCurrentPlayer() {
    if (this.currentPlayer === 1) {
      this.setCurrentPlayer(2);
    } else {
      this.setCurrentPlayer(1);
    }
  }

  handleResult(cells) {
    for (let i = 0; i <= 7; i++) {
      const winCondition = this.winningCases[i];
      const a = cells[winCondition[0]];
      const b = cells[winCondition[1]];
      const c = cells[winCondition[2]];
      if (a === 0 || b === 0 || c === 0) {
        continue;
      }
      if (a === b && b === c) {
        this.roundWon = true;
        break;
      }
    }
  }


  makeMove(x, y) {
    x -= 1;
    y -= 1;
    if (this.field[y][x] === 0) {
      this.field[y][x] = this.getCurrentPlayer();
    } else {
      throw new Error('Вы не можете сходить в данную клетку');
    }
    const value = [...this.field[0], ...this.field[1], ...this.field[2]];
    this.handleResult(value);
    this.checkForWinner();
    this.checkForDraw();
    this.switchCurrentPlayer();
  }

  checkForWinner() {
    if (this.roundWon) {
      this.resetField();
      this.roundWon = !this.roundWon;
      this.setCurrentPlayer(2);
    }
  }

  checkForDraw() {
    const fieldArray = [...this.field[0], ...this.field[1], ...this.field[2]];
    const roundDraw = !fieldArray.includes(0);
    if (roundDraw) {
      this.resetField();
      this.switchCurrentPlayer();
    }
  }
}

module.exports = {
  Game,
};
