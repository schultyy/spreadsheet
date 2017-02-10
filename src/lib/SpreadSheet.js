export function SpreadSheet(rows) {
  this.rows = rows;
}

SpreadSheet.prototype.clone = function() {
  return new SpreadSheet(this.rows.map(r => r.clone()));
};

SpreadSheet.prototype.findRow = function(rowIndex) {
  return this.rows.find(r => r.index === rowIndex);
};

SpreadSheet.prototype.updateCell = function(changedCell, newValue) {
  const row = this.findRow(changedCell.rowIndex);
  const cell = row.findCell(changedCell.index);
  cell.value = parseInt(newValue, 10) || 0;
};

SpreadSheet.prototype.findCell = function(cellName) {
  const rowIndex = cellName[0];
  const cellIndex = parseInt(cellName[1], 10);
  const row = this.findRow(rowIndex);
  if(typeof row === 'undefined' || row === null) {
    throw new Error(`Could not find Row ${rowIndex}`);
  }
  const cell = row.findCell(cellIndex);
  if(typeof cell === 'undefined' || cell === null) {
    throw new Error(`Could not find Cell ${cellName}`);
  }
  return cell;
};

SpreadSheet.prototype.getCellValue = function(cellName) {
  const cell = this.findCell(cellName);
  if(typeof cell === 'undefined' || cell === null) {
    throw new Error(`Invalid Cell Identifier ${cellName}`);
  }
  return cell.value;
};

SpreadSheet.prototype.eval = function(ast) {
  if (ast.type === 'assignment') {
    const targetCellName = ast.target;
    const leftCellName = ast.expression.left;
    const rightCellName = ast.expression.right;

    const leftValue = this.getCellValue(leftCellName);
    const rightValue = this.getCellValue(rightCellName);

    const targetCell = this.findCell(targetCellName);
    let newValue;
    switch(ast.expression.operation) {
      case '+':
        newValue = leftValue + rightValue;
        break;
      case '-':
        newValue = leftValue - rightValue;
        break;
      case '/':
        newValue = leftValue / rightValue;
        break;
      case '*':
        newValue = leftValue * rightValue;
        break;
      default:
        throw new Error(`Unknown operation ${ast.expression.operation}`);
    }
    this.updateCell(targetCell, newValue);
  } else {
    throw new Error(`Unknown AST type ${ast.type}`);
  }
};
