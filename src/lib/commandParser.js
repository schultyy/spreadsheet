
export function parseCommand(commandString) {
  //A0 = A1 + A2
  //assignmentAST[0] -> target cell
  //assignmentAST[1] -> expression
  const assignmentAST = commandString.trim().split('=');

  if(assignmentAST.length !== 2) {
    throw new Error(`Invalid syntax. Expected: A0 = A1 + A2, Got: ${commandString}`);
  }
  const targetCellName = assignmentAST[0].trim();
  const expression = assignmentAST[1].trim();
  const operatorIndex = getOperatorIndex(expression);
  var expressionAST = null;

  if (operatorIndex !== -1 && !isValue(expression)) {
    //Looks like we encountered an equation
    expressionAST = equation(operatorIndex, expression);
  } else if (operatorIndex === -1 && isValue(expression)) {
    //Looks like we encountered a simple value
    expressionAST = {
      type: 'value',
      value: castValue(expression)
    };
  }
  else {
    throw new Error(`Expected a number or expression, got: ${expression}`);
  }

  return {
    type: 'assignment',
    target: targetCellName,
    expression: expressionAST
  };
};

function equation(operatorIndex, expression) {
  const operator = expression[operatorIndex].trim();
  const left = expression.substring(0, operatorIndex).trim();
  const right = expression.substring(operatorIndex + 1).trim();

  assertRequiredValue(operator, ['-', '+', '*', '/']);
  assertRequiredNotNull(left, 'Left Operand');
  assertRequiredNotNull(right, 'Right Operand');

  return {
    type: 'equation',
    operation: operator,
    left: left,
    right: right
  };
}

function castValue(value) {
  if(isNumber(value)) {
    return parseInt(value, 10);
  }
  return value.toString();
}

function isValue(potentialValue) {
  return getOperatorIndex(potentialValue) === -1;
}

function isNumber(potentialNumber) {
  return !isNaN(potentialNumber);
}

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