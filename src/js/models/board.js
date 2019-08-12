import Food from "./food";
import Snake from "./snake";
import { createMatrix } from "../utils/matrix";
import { randomInt } from "../utils/random";

export const fillTypes = {
  SNAKE: "snake",
  FOOD: "food"
};

class Board {
  constructor(rowSize = 20, colSize = 15, renderers) {
    this._rowSize = rowSize;
    this._colSize = colSize;
    this._matrix = createMatrix(rowSize, colSize);
    this._score = 0;
    this._renderers = renderers;
    this.started = false;
    this.ended = false;

    this._createSnake();
    this._createFood();
    this.render();
  }

  start() {
    if (this.started) return;

    this.started = true;
    this._snake.run();
  }

  allocatePosition(type) {
    const emptyPositions = this._generateEmptyPositions();
    const [rowIndex, colIndex] = emptyPositions[
      randomInt(0, emptyPositions.length - 1)
    ];
    this._matrix[rowIndex][colIndex] = type;
    return [rowIndex, colIndex];
  }

  changeDirection(direction) {
    if (!this.active) return;

    this._snake.changeDirection(direction);
  }

  deallocatePosition([rowIndex, colIndex]) {
    this._matrix[rowIndex][colIndex] = null;
  }

  reallocatePosition([rowIndex, colIndex], type) {
    this._matrix[rowIndex][colIndex] = type;
  }

  didEatFood() {
    this._score += this._food.weight;
    this._food.clear();
    this._createFood();
  }

  isValidPosition([rowIndex, colIndex]) {
    return (
      rowIndex >= 0 &&
      rowIndex < this.rowSize &&
      colIndex >= 0 &&
      colIndex < this.colSize
    );
  }

  render() {
    for (const x in this._renderers) {
      this._renderers[x](this);
    }
  }

  stop() {
    this._snake.stop();
    this._food.clear();
  }

  _createFood() {
    const position = this.allocatePosition(fillTypes.FOOD);
    this._food = new Food(1, position);
  }

  _createSnake() {
    const position = this.allocatePosition(fillTypes.SNAKE);
    this._snake = new Snake(position, this);
  }

  _generateEmptyPositions() {
    const positions = [];
    this._matrix.forEach((row, rowIndex) => {
      row.forEach((col, colIndex) => {
        if (!col) {
          positions.push([rowIndex, colIndex]);
        }
      });
    });
    return positions;
  }

  get rowSize() {
    return this._rowSize;
  }

  get colSize() {
    return this._colSize;
  }

  get matrix() {
    return this._matrix;
  }

  get active() {
    return this.started && !this.ended;
  }

  get score() {
    return this._score;
  }

  get snake() {
    return this._snake;
  }
}

export default Board;
