import { parseCommand } from './commandParser';
import { ComputedCell } from './models';

export function SpreadSheet(rows) {
  this.rows = rows;
  this.filename = 'new Spreadsheet';
}

SpreadSheet.prototype.clone = function() {
  const newSheet = new SpreadSheet(this.rows.map(r => r.clone()));
  newSheet.filename = this.filename;
  return newSheet;
};

SpreadSheet.prototype.setFilename = function(newFilename) {
  if (typeof newFilename === 'undefined' || newFilename === null) {
    throw new Error('Spreadsheet filename cannot be null or undefined');
  }
  this.filename = newFilename;
};

SpreadSheet.prototype.findRow = function(rowIndex) {
  return this.rows.find(r => r.index === rowIndex);
};

SpreadSheet.prototype.updateCell = function(changedCell, newValue) {
  const row = this.findRow(changedCell.rowIndex);
  const cell = row.findCell(changedCell.index);
  cell.value = newValue;
};

SpreadSheet.prototype.findCell = function(cellName) {
  const { rowIndex, cellIndex } = parseCellName(cellName);
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

SpreadSheet.prototype.updatedComputedCells = function() {
  this.rows.forEach((row) => {
    row.cells.forEach((cell) => {
      if(!cell.formula) {
        return;
      }

      const ast = parseCommand(cell.formula);
      this.walkAST(ast);
    });
  });
};

SpreadSheet.prototype.eval = function(command) {
  const ast = parseCommand(command);
  this.walkAST(ast);
  this.updatedComputedCells();
  return this;
};

SpreadSheet.prototype.walkAST = function(ast) {
  if (ast.type === 'assignment') {
    const targetCellName = ast.target;
    const targetCell = this.findCell(targetCellName);
    let newValue = null;

    switch(ast.expression.type) {
      case 'string':
      case 'number':
        newValue = ast.expression.value;
        break;
      case 'equation':
        newValue = this.walkEquation(ast);
        break;
      default:
        throw new Error(`Invalid expression type ${ast.expression.type}`);
    }
    this.updateCell(targetCell, newValue);
  } else {
    throw new Error(`Unknown AST type ${ast.type}`);
  }
};

SpreadSheet.prototype.walkEquation = function(ast) {
  const leftCellName = ast.expression.left;
  const rightCellName = ast.expression.right;

  const leftValue = coerceCellValue(this.getCellValue(leftCellName));
  const rightValue = coerceCellValue(this.getCellValue(rightCellName));

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
  return newValue;
};

SpreadSheet.prototype.addFormulaToCell = function(formula) {
  const ast = parseCommand(formula);
  const { rowIndex, cellIndex } = parseCellName(ast.target);
  const row = this.findRow(rowIndex);
  row.replaceCell(cellIndex, new ComputedCell(cellIndex, rowIndex, formula));
  this.updatedComputedCells();
};

function parseCellName(cellName) {
  const rowIndex = cellName[0];
  const cellIndex = parseInt(cellName.substring(1), 10);
  return {
    rowIndex: rowIndex,
    cellIndex: cellIndex
  };
};

function coerceCellValue(value) {
  if (Number.isInteger(value)) {
    return value;
  }

  return 0;
}