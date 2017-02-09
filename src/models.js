export function Cell(index, value) {
  this.index = index;
  this.value = value;
}

export function Row(index, cells) {
  this.index = index;
  this.cells = cells;
}