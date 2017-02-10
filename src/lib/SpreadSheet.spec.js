import { SpreadSheet, parseCommand } from './SpreadSheet';
import { Row, Cell } from './models';

describe('SpreadSheet', () => {
  describe('eval', () => {
    const cells = [
      new Cell(0, 'A', 0),
      new Cell(1, 'A', 5),
      new Cell(2, 'A', 10)
    ];
    const rows = [
      new Row('A', cells)
    ];

    const spreadSheet = new SpreadSheet(rows);
    const command = 'A0 = A1 + A2';

    it('evals a valid AST', () => {
      const newSheet = spreadSheet.eval(command);
      expect(newSheet.rows[0].cells[0].value).toEqual(15);
    });

    it('raises exception if command is malformed', () => {
      expect(() => {
        spreadSheet.eval('gibberish');
      }).toThrow();
    });

    describe('Update Cells', () => {
      it('updates the corresponding cell', () => {
        spreadSheet.updateCell(cells[1], 2342);
        expect(spreadSheet.rows[0].cells[1].value).toEqual(2342);
      });
    });
  });
});

describe('parseCommand', () => {
  describe('simple value assignment', () => {
    context('with valid value', () => {
      const ast = parseCommand('A0 = 5');

      describe('ast', () => {
        it('has type assignment', () => {
          expect(ast.type).toEqual('assignment');
        });

        describe('expression', () => {
          it('has type "value"', () => {
            expect(ast.expression.type).toEqual('value');
          });

          it('has correct value', () => {
            expect(ast.expression.value).toEqual(5);
          });
        });
      });
    });
    it ('raises error when value is invalid', () => {
      expect(() => {
        parseCommand('A0 = BFS');
      }).toThrow();
    });
  });
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
