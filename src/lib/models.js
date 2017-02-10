export function Cell(index, rowIndex, value) {
  this.index = index;
  this.rowIndex = rowIndex;
  this.value = value;
}

Cell.prototype.id = function() {
  return `${this.rowIndex}${this.index}`;
};

Cell.prototype.clone = function() {
  return new Cell(this.index, this.rowIndex, this.value);
};

export function ComputedCell(index, rowIndex, formula) {
  this.index = index;
  this.rowIndex = rowIndex;
  this.value = 0;
  this.formula = formula;
}

ComputedCell.prototype.clone = function() {
  return new ComputedCell(this.index, this.rowIndex, this.formula);
};

export function Row(index, cells) {
  this.index = index;
  this.cells = cells;
}

Row.prototype.clone = function() {
  return new Row(this.index, this.cells.map(c => c.clone()));
};

Row.prototype.findCell = function(cellIndex) {
  return this.cells.find(cell => cell.index === cellIndex);
};