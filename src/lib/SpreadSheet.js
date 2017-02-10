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

SpreadSheet.prototype.eval = function(command) {
  const ast = parseCommand(command);
  this.walkAST(ast);
  return this;
};

SpreadSheet.prototype.walkAST = function(ast) {
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

export function parseCommand(commandString) {
  //A0 = A1 + A2
  const assignmentAST = commandString.trim().split('=');

  if(assignmentAST.length !== 2) {
    throw new Error(`Invalid syntax. Expected: A0 = A1 + A2, Got: ${commandString}`);
  }

  const targetCellName = assignmentAST[0].trim();

  const operatorIndex = getOperatorIndex(assignmentAST[1]);
  if (operatorIndex === -1) {
    throw new Error(`Couldn't find operator in ${assignmentAST[1]}`);
  }
  const operator = assignmentAST[1][operatorIndex].trim();
  const left = assignmentAST[1].substring(0, operatorIndex).trim();
  const right = assignmentAST[1].substring(operatorIndex + 1).trim();


  assertRequiredValue(operator, ['-', '+', '*', '/']);
  assertRequiredNotNull(left, 'Left Operand');
  assertRequiredNotNull(right, 'Right Operand');

  return {
    type: 'assignment',
    target: targetCellName,
    expression: {
      operation: operator,
      left: left,
      right: right
    }
  };
};

function assertRequiredValue(stringToTest, expected) {
  if (expected.constructor === Array) {
    if(!expected.some(e => stringToTest === e)) {
      throw new Error(`Expected one of ${expected}, got ${stringToTest}`);
    }
  } else {
    if(expected === stringToTest) {
      return;
    }
    throw new Error(`Expected ${expected}, got ${stringToTest}`);
  }
}

function assertRequiredNotNull(stringToTest, expectation) {
  if (typeof stringToTest === 'undefined' || stringToTest === null) {
    throw new Error(`Expected ${expectation} to not be null or undefined`);
  }
}

function getOperatorIndex(expressionStr) {
  const operators = ['+', '-', '/', '*'];

  const operatorMapping = operators.map((op) => {
    return { operator: op, index: expressionStr.indexOf(op) };
  })
  .filter((op) => op.index !== -1);

  if (operatorMapping.length > 0) {
    return operatorMapping[0].index;
  }
  else {
    return -1;
  }
}