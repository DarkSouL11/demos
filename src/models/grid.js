import { action, computed, observable, decorate, runInAction } from "mobx";
import cloneDeep from "lodash/cloneDeep";
import remove from "lodash/remove";

import { createMatrix } from "../utils/matrix";
import Shape from "./shape";

class Grid {
  static defaultOptions = {
    rowSize: 7,
    colSize: 7,
    // Interval in which shapes will be generated
    interval: 3000,
    // Speed with which shape will move
    speed: 1000
  };

  matrix = null;
  score = 0;
  isEnded = false;
  queue = [];
  _numShapes = 0;

  constructor(options = {}) {
    this._options = Object.assign({}, Grid.defaultOptions, options);
    this.matrix = createMatrix(this.rowSize, this.colSize);
    this._init();
  }

  _init = () => {
    this.queue.push(Shape.generate(this._numShapes++, this));
    this._shapeGenerationInterval = setInterval(() => {
      runInAction(() =>
        this.queue.push(Shape.generate(this._numShapes++, this))
      );
    }, this.interval);
  };

  _evaluate = () => {
    const removedRows = remove(this.matrix, o => o.every(v => v > -1));
    this.score += removedRows.length * this.colSize;
  };

  _place = shape => {
    if (!shape.position) {
      return false;
    } else {
      const [gridRowIndex, gridColIndex] = shape.position;
      this.queue.shift();
      let rowIndex = 0,
        colIndex = 0;

      while (rowIndex < shape.matrix.length) {
        const row = shape.matrix[rowIndex];
        while (colIndex < row.length) {
          if (row[colIndex] !== -1) {
            this.matrix[rowIndex + gridRowIndex][colIndex + gridColIndex] =
              shape.id;
          }
          colIndex += 1;
        }

        colIndex = 0;
        rowIndex += 1;
      }
      return true;
    }
  };

  move = step => {
    const shape = this.queue[0];
    if (shape) {
      shape.move(step);
    }
  };

  placeAndEvaluate = shape => {
    const couldPlace = this._place(shape);
    if (couldPlace) {
      this._evaluate();
    } else {
      clearInterval(this._shapeGenerationInterval);
      this.queue.forEach(shape => shape.stop());
      this.isEnded = true;
    }
  };

  get colSize() {
    return this._options.colSize;
  }

  get rowSize() {
    return this._options.rowSize;
  }

  get interval() {
    return this._options.interval;
  }

  get speed() {
    return this._options.speed;
  }

  get matrixWithShapes() {
    const matrix = cloneDeep(this.matrix);
    this.queue.forEach(shape => {
      if (!shape.position) return;

      const [gridRowIndex, gridColIndex] = shape.position;
      let rowIndex = 0,
        colIndex = 0;

      const shapeMatrix = shape.matrix;
      while (rowIndex < shapeMatrix.length) {
        const row = shapeMatrix[rowIndex];
        while (colIndex < row.length) {
          if (row[colIndex] !== -1) {
            if (
              gridRowIndex + rowIndex < this.rowSize &&
              gridColIndex + colIndex < this.colSize
            ) {
              matrix[gridRowIndex + rowIndex][gridColIndex + colIndex] =
                row[rowIndex];
            }
          }
          colIndex += 1;
        }

        colIndex = 0;
        rowIndex += 1;
      }
    });
    return matrix;
  }
}

decorate(Grid, {
  matrix: observable,
  queue: observable,
  isEnded: observable,
  score: observable,
  _evaluate: action,
  _place: action,
  // move: action,
  placeAndEvaluate: action,
  matrixWithShapes: computed
});

export default Grid;
