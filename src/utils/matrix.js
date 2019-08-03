export function createMatrix(rowSize, colSize, fill = -1) {
  return new Array(rowSize).fill(new Array(colSize).fill(fill));
}
