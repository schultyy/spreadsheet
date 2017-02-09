export function Cell(index, rowIndex, value) {
  this.index = index;
  this.rowIndex = rowIndex;
  this.value = value;
}

Cell.prototype.clone = function() {
  return new Cell(this.index, this.rowIndex, this.value);
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

export function SpreadSheet(rows) {
  this.rows = rows;
}

SpreadSheet.prototype.clone = function() {
  return new SpreadSheet(this.rows.map(r => r.clone()));
};

SpreadSheet.prototype.updateCell = function(changedCell, newValue) {
  const row = this.rows.find(r => r.index === changedCell.rowIndex);
  const cell = row.findCell(changedCell.index);
  cell.value = parseInt(newValue, 10) || 0;
};