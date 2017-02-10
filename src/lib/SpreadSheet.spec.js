import { SpreadSheet } from './SpreadSheet';
import { Row, Cell } from './models';
import { parseCommand } from './models';

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
    const ast = parseCommand('A0 = A1 + A2');

    it('raises exception if AST Type is unknown', () => {
      const astWithUnknownType = {
        type: 'something that is unknown'
      };

      expect(() => {
        spreadSheet.eval(astWithUnknownType)
      }).toThrow();
    });

    it('evals a valid AST', () => {
      spreadSheet.eval(ast);
      expect(spreadSheet.rows[0].cells[0].value).toEqual(15);
    });
  });
});