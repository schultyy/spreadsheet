export function Cell(index, rowIndex, value) {
  this.index = index;
  this.rowIndex = rowIndex;
  this.value = value;
}

export function Row(index, cells) {
  this.index = index;
  this.cells = cells;
}