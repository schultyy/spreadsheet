import { SpreadSheet, parseCommand } from './SpreadSheet';
import { Row, Cell } from './models';

describe('SpreadSheet', () => {
  const cells = [
    new Cell(0, 'A', 0),
    new Cell(1, 'A', 5),
    new Cell(2, 'A', 10)
  ];
  const rows = [
    new Row('A', cells)
  ];

  const spreadSheet = new SpreadSheet(rows);
  describe('eval', () => {
    const command = 'A0 = A1 + A2';

    it('evals a valid AST', () => {
      const newSheet = spreadSheet.eval(command);
      expect(newSheet.rows[0].cells[0].value).toEqual(15);
    });

    it('does not modify the original spreadsheet', () => {
      spreadSheet.eval(command);
      expect(spreadSheet.rows[0].cells[0].value).toEqual(0);
    });
  });
});

describe('parseCommand', () => {
  describe('with whitespace separated', () => {
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
  describe('without separating whitespace', () => {
    const ast = parseCommand('A0=A1+A2');

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
});
