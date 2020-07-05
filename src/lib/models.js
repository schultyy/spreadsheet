export class Cell {
  constructor(index, rowIndex, value) {
    this.index = index;
    this.rowIndex = rowIndex;
    this.value = value;
  }

  id() {
    return `${this.rowIndex}${this.index}`;
  }

  clone() {
    return new Cell(this.index, this.rowIndex, this.value);
  }
}

export class ComputedCell {
  constructor(index, rowIndex, formula) {
    this.index = index;
    this.rowIndex = rowIndex;
    this.value = 0;
    this.formula = formula;
  }

  clone() {
    return new ComputedCell(this.index, this.rowIndex, this.formula);
  }
}

export class Row {
  constructor(index, cells) {
    this.index = index;
    this.cells = cells;
  }

  clone() {
    return new Row(this.index, this.cells.map(c => c.clone()));
  }

  findCell(cellIndex) {
    return this.cells.find(cell => cell.index === cellIndex);
  }

  replaceCell(cellIndex, newCell) {
    for(let i = 0; i < this.cells.length; i++) {
      if(this.cells[i].index === cellIndex) {
        this.cells[i] = newCell;
        break;
      }
    }
  }
}

