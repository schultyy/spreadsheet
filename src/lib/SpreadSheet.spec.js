import { SpreadSheet } from './SpreadSheet';
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

