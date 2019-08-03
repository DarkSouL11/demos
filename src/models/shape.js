import { decorate, observable, action } from "mobx";
import { createMatrix } from "../utils/matrix";
import { randomInt } from "../utils/random";

class Shape {
  static maxRow = 2;
  static maxCol = 4;

  // Generates a random shape
  static generate(id, grid) {
    const matrix = createMatrix(Shape.maxRow, Shape.maxCol);
    let rowIndex = 0,
      colIndex = 0;
    matrix[rowIndex][colIndex] = id;
    colIndex += 1;

    while (rowIndex < Shape.maxRow) {
      while (colIndex < Shape.maxCol) {
        let canFill = false;
        if (rowIndex - 1 >= 0 || colIndex - 1 >= 0) {
          if (rowIndex - 1 >= 0) {
            canFill = matrix[rowIndex - 1][colIndex] > -1;
          }

          if (!canFill && colIndex - 1 >= 0) {
            canFill = matrix[rowIndex][colIndex - 1] > -1;
          }
        } else {
          canFill = true;
        }

        const shouldFill = randomInt(0, 1);
        if (canFill && shouldFill) {
          matrix[rowIndex][colIndex] = id;
        }
        colIndex += 1;
      }

      colIndex = 0;
      rowIndex += 1;
    }

    console.log(matrix);

    return new Shape(id, matrix, grid);
  }

  matrix = null;
  position = null;

  constructor(id, matrix, grid) {
    this.id = id;
    this.matrix = matrix;
    this.grid = grid;

    this._init();
  }

  _init() {
    this._advanceInterval = setInterval(() => {
      this.advance();
    }, this.grid.speed);
  }

  _canAdvance(position) {
    const [gridRowIndex, gridColIndex] = position;
    let rowIndex = 0,
      colIndex = 0;

    while (rowIndex < this.matrix.length) {
      if (gridRowIndex + rowIndex >= this.grid.rowSize) {
        return false;
      }

      const row = this.matrix[rowIndex];
      while (colIndex < row.length) {
        const isFilledInShape = row[colIndex] > -1;
        const isFilledInGrid =
          this.grid.matrix[gridRowIndex + rowIndex][gridColIndex + colIndex] >
          -1;

        if (isFilledInShape && isFilledInGrid) {
          return false;
        }

        colIndex += 1;
      }

      colIndex = 0;
      rowIndex += 1;
    }

    return true;
  }

  advance = () => {
    let nextPosition;

    if (!this.position) {
      nextPosition = [0, parseInt(this.grid.colSize / 2, 10)];
    } else {
      const [rowIndex, colIndex] = this.position;
      nextPosition = [rowIndex + 1, colIndex];
    }

    if (this._canAdvance(nextPosition)) {
      this.position = nextPosition;
    } else {
      clearInterval(this._advanceInterval);
      this.grid.placeAndEvaluate(this);
    }
  };

  move = step => {
    if (this.position) {
      const [rowIndex, colIndex] = this.position;
      const newColIndex = colIndex + step;
      if (newColIndex > 0 && newColIndex < this.grid.colSize) {
        this.position = [rowIndex, newColIndex];
      }
    }
  };

  stop = () => {
    clearTimeout(this._advanceInterval);
  };
}

decorate(Shape, {
  matrix: observable,
  position: observable,
  advance: action,
  move: action
});

export default Shape;
