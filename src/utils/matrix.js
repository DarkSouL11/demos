import { isNullOrUndef } from "./misc";

export function createMatrix(rowSize, colSize, fill = -1) {
  return new Array(rowSize).fill(0).map(() => new Array(colSize).fill(-1));
}

export function iterateMatrix(matrix, callback) {
  const rowSize = matrix.length;
  const colSize = rowSize === 0 ? 0 : matrix[0].length;

  let rowIndex = 0,
    colIndex = 0;
  // Traditional `while` is used instead of `Array.prototype.forEach` because
  // we want to allow breaking loop by returning a non null value in callback
  // or not used `for..in` loop because we want array indices as number not
  // string
  while (rowIndex < rowSize) {
    while (colIndex < colSize) {
      const value = callback(rowIndex, colIndex, matrix);
      if (!isNullOrUndef(value)) {
        return value;
      }
      colIndex += 1;
    }

    colIndex = 0;
    rowIndex += 1;
  }
}

export function rotateMatrix(matrix) {
  const rowsLen = matrix.length;
  const colsLen = matrix[0].length;
  const rotatedMatrix = createMatrix(colsLen, rowsLen);

  iterateMatrix(matrix, (rowIndex, colIndex) => {
    rotatedMatrix[colIndex][rowsLen - 1 - rowIndex] =
      matrix[rowIndex][colIndex];
  });

  return rotatedMatrix;
}
