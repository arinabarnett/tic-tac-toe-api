const { Given, Then } = require('cucumber');
const request = require('supertest');
const assert = require('assert');
const controller = require('../src/game.js');
const app = require('../src/server');

let lastResult = {};

Given('пустое поле', () => {
  controller.resetField();
});

Given('ходит игрок {int}', (i) => {
  controller.setCurrentPlayer(i);
});

Given('игрок ходит в клетку {int}, {int}', (x, y) => request(app)
  .post('/move')
  .send({ x, y })
  .then((res) => {
    lastResult = res;
  }));

Then('поле становится {string}', (string) => {
  const fieldString = controller.getField().toString().replace(/,/g, '');
  assert.equal(string.replace(/\|/g, ''), fieldString);
});

Given('поле {string}', (string) => {
  controller.presetField(string.replace(/\|/g, ''));
});

Then('возвращается ошибка', () => Error('Ход в данную клетку невозможен'));

Then('победил игрок {int}', (int) => {
  controller.checkForWinner();
});

Then('происходит ничья', () => {
  controller.checkForDraw();
});
