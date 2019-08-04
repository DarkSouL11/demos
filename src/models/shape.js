import { decorate, observable, action, computed } from "mobx";
import cloneDeep from "lodash/cloneDeep";

import { randomInt } from "../utils/random";
import { iterateMatrix, rotateMatrix } from "../utils/matrix";

class Shape {
  // static fixedShapes = [[[1, 1]], [[1, 1, 1]], [[1]]];
  static fixedShapes = [
    [[1, -1, -1, -1], [1, 1, 1, 1]],
    [[-1, -1, -1, 1], [1, 1, 1, 1]],
    [[1, 1, 1]],
    [[-1, 1, -1], [1, 1, 1]]
  ];

  // Generates a random shape
  static generate(id, grid) {
    const matrix = cloneDeep(
      Shape.fixedShapes[randomInt(0, Shape.fixedShapes.length - 1)]
    );

    iterateMatrix(matrix, (rowIndex, colIndex) => {
      if (matrix[rowIndex][colIndex] !== -1) {
        matrix[rowIndex][colIndex] = id;
      }
    });
    return new Shape(id, matrix, grid);
  }

  matrix = null;
  // Represented as [x, y], denotes the position of bottom left element of the
  // shape in the grid
  position = null;

  constructor(id, matrix, grid) {
    this.id = id;
    this.matrix = matrix;
    this.grid = grid;

    this._init();
  }

  _init() {
    this.advance();
    this._advanceInterval = setInterval(() => this.advance(), this.grid.speed);
  }

  _isValidConfiguration = (position, matrix) => {
    const [gridRowIndex, gridColIndex] = this._calculateTopLeftPosition(
      matrix,
      position
    );

    // Check if shape has already reached last row of grid or edge of column
    if (
      // Check if crosses last row
      position[0] > this.grid.rowSize - 1 ||
      // Check if crosses left most column
      position[1] < 0 ||
      // Check if crosses right most column
      position[1] + matrix[0].length - 1 >= this.grid.colSize
    ) {
      return false;
    }

    // Returns true if config is not valid
    const isNotValid = iterateMatrix(matrix, (rowIndex, colIndex, matrix) => {
      const isFilledInShape = matrix[rowIndex][colIndex] > -1;
      let isFilledInGrid = false;
      if (
        this.grid.isValidPosition(
          gridRowIndex + rowIndex,
          gridColIndex + colIndex
        )
      ) {
        isFilledInGrid =
          this.grid.matrix[gridRowIndex + rowIndex][gridColIndex + colIndex] >
          -1;
      }

      if (isFilledInShape && isFilledInGrid) {
        return true;
      }
    });

    if (isNotValid) {
      return false;
    } else {
      return true;
    }
  };

  _canMove = position => {
    return this._isValidConfiguration(position, this.matrix);
  };

  _canRotate = () => {
    return this._isValidConfiguration(this.position, rotateMatrix(this.matrix));
  };

  _calculateTopLeftPosition = (matrix, bottomLeftPosition) => {
    const rowSize = matrix.length;
    const [rowIndex, colIndex] = bottomLeftPosition;
    return [rowIndex - rowSize + 1, colIndex];
  };

  // `recursive = true` will make shape advance till it cannot advance anymore
  advance = (recursive = false) => {
    if (recursive && this._advanceInterval) {
      clearInterval(this._advanceInterval);
    }

    let nextPosition;
    if (!this.position) {
      nextPosition = [0, this.initialColIndex];
    } else {
      const [rowIndex, colIndex] = this.position;
      nextPosition = [rowIndex + 1, colIndex];
    }

    if (this._canMove(nextPosition)) {
      this.position = nextPosition;
      if (recursive) {
        this.advance(recursive);
      }
    } else {
      clearInterval(this._advanceInterval);
      this.grid.placeAndEvaluate(this);
    }
  };

  move = step => {
    if (this.position) {
      const [rowIndex, colIndex] = this.position;
      const nextPosition = [rowIndex, colIndex + step];
      if (this._canMove(nextPosition)) {
        this.position = nextPosition;
      }
    }
  };

  rotate = () => {
    if (this.position && this._canRotate()) {
      this.matrix = rotateMatrix(this.matrix);
    }
  };

  stop = () => {
    clearTimeout(this._advanceInterval);
  };

  get topLeftPosition() {
    if (!this.position) return null;
    return this._calculateTopLeftPosition(this.matrix, this.position);
  }

  get initialColIndex() {
    return (
      parseInt((this.grid.colSize - 1) / 2, 10) - parseInt(this.colSize / 2, 10)
    );
  }

  get colSize() {
    // Assuming that minimum `rowSize` is 1
    return this.matrix[0].length;
  }

  get rowSize() {
    return this.matrix.length;
  }
}

decorate(Shape, {
  matrix: observable,
  position: observable,
  topLeftPosition: computed,
  advance: action,
  move: action,
  quickPlace: action
});

export default Shape;
