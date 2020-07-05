import { parseCommand } from './commandParser';
import {
  Row,
  Cell,
  ComputedCell
} from '../lib/models';

export class SpreadSheet {
  constructor (rows) {
    this.filename = 'new Spreadsheet';
    if(rows) {
      this.rows = rows;
    } else {
      this.rows = [];
      let rowIndex = "A";

      for(let j = 0; j < SpreadSheet.matrix_size; j++) {
        let cells = [];
        const currentRowIndex = nextChar(rowIndex, j);

        for(let i = 0; i < SpreadSheet.matrix_size; i++) {
          cells.push(new Cell(i, currentRowIndex, 0));
        }
        this.rows.push(new Row(currentRowIndex, cells));
      }
    }
  }

  static get matrix_size() {
    return 10;
  }

  clone() {
    const newSheet = new SpreadSheet(this.rows.map(r => r.clone()));
    newSheet.filename = this.filename;
    return newSheet;
  }

  setFilename(newFilename) {
    if (typeof newFilename === 'undefined' || newFilename === null) {
      throw new Error('Spreadsheet filename cannot be null or undefined');
    }
    this.filename = newFilename;
  }

  findRow(rowIndex) {
    return this.rows.find(r => r.index === rowIndex);
  }

  updateCell(changedCell, newValue) {
    const row = this.findRow(changedCell.rowIndex);
    const cell = row.findCell(changedCell.index);
    cell.value = newValue;
  }

  findCell(cellName) {
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
  }

  getCellValue(cellName) {
    const cell = this.findCell(cellName);
    if(typeof cell === 'undefined' || cell === null) {
      throw new Error(`Invalid Cell Identifier ${cellName}`);
    }
    return cell.value;
  }

  updatedComputedCells() {
    this.rows.forEach((row) => {
      row.cells.forEach((cell) => {
        if(!cell.formula) {
          return;
        }

        const ast = parseCommand(cell.formula);
        this.walkAST(ast);
      });
    });
  }

  eval(command) {
    const ast = parseCommand(command);
    this.walkAST(ast);
    this.updatedComputedCells();
    return this;
  }

  walkAST(ast) {
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
  }

  walkEquation(ast) {
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
  }

  addFormulaToCell(formula) {
    const ast = parseCommand(formula);
    const { rowIndex, cellIndex } = parseCellName(ast.target);
    const row = this.findRow(rowIndex);
    row.replaceCell(cellIndex, new ComputedCell(cellIndex, rowIndex, formula));
    this.updatedComputedCells();
  }
}


function nextChar(c, offset) {
  return String.fromCharCode(c.charCodeAt(0) + offset);
}


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
