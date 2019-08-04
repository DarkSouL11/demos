import { action, computed, observable, decorate, toJS } from "mobx";
import remove from "lodash/remove";

import { createMatrix, iterateMatrix } from "../utils/matrix";
import Shape from "./shape";

class Grid {
  static defaultOptions = {
    rowSize: 15,
    colSize: 10,
    // Speed with which shape will move this can be used as difficuly setting
    speed: 500
  };

  matrix = null;
  score = 0;
  isStarted = false;
  isEnded = false;
  shape = null;
  _nextShapeId = 0;

  constructor(options = {}) {
    this._options = Object.assign({}, Grid.defaultOptions, options);
    this.matrix = createMatrix(this.rowSize, this.colSize);
  }

  _addShape = () => (this.shape = Shape.generate(this._nextShapeId++, this));

  _evaluate = () => {
    const clonedMatrix = toJS(this.matrix);
    const removedRows = remove(clonedMatrix, o => o.every(v => v > -1));
    const newRows = createMatrix(removedRows.length, this.colSize);
    // Adds new empty rows at the top to account for the removed rows
    Array.prototype.unshift.apply(clonedMatrix, newRows);

    this.score += removedRows.length * this.colSize;
    this.matrix = clonedMatrix;
  };

  _place = shape => {
    const position = shape.topLeftPosition;
    if (!position) {
      return false;
    } else {
      const [gridRowIndex, gridColIndex] = position;

      // Will return true if failed to place any element from shape in grid
      const didPlaceFail = iterateMatrix(
        shape.matrix,
        (rowIndex, colIndex, matrix) => {
          if (matrix[rowIndex][colIndex] > -1) {
            if (
              this.isValidPosition(
                gridRowIndex + rowIndex,
                gridColIndex + colIndex
              )
            ) {
              this.matrix[rowIndex + gridRowIndex][colIndex + gridColIndex] =
                shape.id;
            } else {
              return true;
            }
          }
        }
      );

      if (didPlaceFail) {
        return false;
      } else {
        // Dereference shape
        this.shape = null;
        return true;
      }
    }
  };

  isValidPosition = (rowIndex, colIndex) => {
    return (
      rowIndex >= 0 &&
      rowIndex < this.rowSize &&
      colIndex >= 0 &&
      colIndex < this.colSize
    );
  };

  move = step => {
    if (!this.isEnded && this.shape) {
      this.shape.move(step);
    }
  };

  placeAndEvaluate = shape => {
    const didPlaceSucceed = this._place(shape);
    if (didPlaceSucceed) {
      this._evaluate();
      this._addShape();
    } else {
      this.isEnded = true;
    }
  };

  quickPlace = () => {
    if (!this.isEnded && this.shape) {
      this.shape.advance(true);
    }
  };

  restart = () => {
    if (this.shape) this.shape.stop();

    this.matrix = createMatrix(this.rowSize, this.colSize);
    this.isStarted = false;
    this.isEnded = false;
    this.shape = null;
    this.score = 0;
    this._nextShapeId = 0;

    this.start();
  };

  start = () => {
    if (!this.isStarted) {
      this._addShape();
      this.isStarted = true;
    }
  };

  get colSize() {
    return this._options.colSize;
  }

  get rowSize() {
    return this._options.rowSize;
  }

  get isAction() {
    return this.isStarted && !this.isEnded;
  }

  get speed() {
    return this._options.speed;
  }

  get matrixWithShapes() {
    const matrix = toJS(this.matrix);
    if (this.shape && this.shape.position) {
      const [gridRowIndex, gridColIndex] = this.shape.topLeftPosition;

      iterateMatrix(this.shape.matrix, (rowIndex, colIndex) => {
        if (this.shape.matrix[rowIndex][colIndex] > -1) {
          if (
            this.isValidPosition(
              gridRowIndex + rowIndex,
              gridColIndex + colIndex
            )
          ) {
            matrix[gridRowIndex + rowIndex][
              gridColIndex + colIndex
            ] = this.shape.id;
          }
        }
      });
    }

    return matrix;
  }
}

decorate(Grid, {
  matrix: observable,
  shape: observable,
  isStarted: observable,
  isEnded: observable,
  score: observable,
  _addShape: action,
  _evaluate: action,
  _place: action,
  placeAndEvaluate: action,
  restart: action,
  start: action,
  matrixWithShapes: computed
});

export default Grid;
