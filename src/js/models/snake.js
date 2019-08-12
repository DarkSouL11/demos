import { fillTypes } from "./board";

// Paired with arrow codes on keyboard
const directions = {
  UP: 38,
  DOWN: 40,
  LEFT: 37,
  RIGHT: 39
};

const defaultOptions = {
  speed: 400 // in ms
};

const pairs = {
  [directions.UP]: directions.DOWN,
  [directions.DOWN]: directions.UP,
  [directions.LEFT]: directions.RIGHT,
  [directions.RIGHT]: directions.LEFT
};

class Snake {
  constructor(position, board, options = {}) {
    this._body = [position];
    this._length = 1;
    this._board = board;
    this._options = Object.assign({}, defaultOptions, options);
    this._score = 0;

    this._setInitialDirection(position);
    this._advance = this._advance.bind(this);
  }

  changeDirection(newDirection) {
    if (this._direction !== pairs[newDirection]) {
      this._direction = newDirection;
    }
    clearInterval(this._interval);
    this._advance();
    this.run();
  }

  isHead([rowIndex, colIndex]) {
    return this._body[0][0] === rowIndex && this._body[0][1] === colIndex;
  }

  run() {
    this._interval = setInterval(this._advance, this.speed);
  }

  stop() {
    clearInterval(this._interval);
  }

  _setInitialDirection([rowIndex, colIndex]) {
    if (this._board.colSize / 2 > colIndex) {
      this._direction = directions.RIGHT;
    } else {
      this._direction = directions.LEFT;
    }
  }

  _canAdvance() {
    const [rowIndex, colIndex] = this._getNextPosition();
    if (this._board.isValidPosition([rowIndex, colIndex])) {
      const isFilledBySnake = !!this._body.find(
        o => o[0] === rowIndex && o[1] === colIndex
      );
      return !isFilledBySnake;
    }

    return false;
  }

  _advance() {
    if (this._canAdvance()) {
      const newPosition = this._getNextPosition();
      this._body.unshift(newPosition);
      if (
        this._board.matrix[newPosition[0]][newPosition[1]] === fillTypes.FOOD
      ) {
        this._length += 1;
        this._board.didEatFood();
      } else {
        const removedPostion = this._body.pop();
        this._board.deallocatePosition(removedPostion);
      }

      this._board.reallocatePosition(newPosition, fillTypes.SNAKE);
    } else {
      clearInterval(this._interval);
      this._board.ended = true;
    }
    this._board.render();
  }

  _getNextPosition() {
    const [rowIndex, colIndex] = this._body[0];
    switch (this._direction) {
      case directions.UP:
        return [rowIndex - 1, colIndex];
      case directions.DOWN:
        return [rowIndex + 1, colIndex];
      case directions.LEFT:
        return [rowIndex, colIndex - 1];
      case directions.RIGHT:
        return [rowIndex, colIndex + 1];
      default:
        throw new Error("Invalid direction!");
    }
  }

  get speed() {
    return this._options.speed;
  }
}

export default Snake;
