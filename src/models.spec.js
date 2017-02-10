import { parseCommand, Spreadsheet } from './models';

describe('parseCommand', () => {
  const ast = parseCommand('A0 = A1 + A2');

  it('parses simple assignment', () => {
    expect(ast.type).toEqual('assignment');
  });
  it('assigns correct target cell', () => {
    expect(ast.target).toEqual('A0');
  });
  describe('expression', () => {
    let expression = ast.expression;

    it('has correct operation', () => {
      expect(expression.operation).toEqual('+');
    });

    it('has correct left child', () => {
      expect(expression.left).toEqual('A1');
    });

    it('has correct right child', () => {
      expect(expression.right).toEqual('A2');
    });
  });
});