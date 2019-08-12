export function createMatrix(rowSize, colSize) {
  return new Array(rowSize).fill(0).map(() => new Array(colSize).fill(null));
}
