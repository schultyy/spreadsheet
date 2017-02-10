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