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

    describe('assignment', () => {
      it('evals an addition formula', () => {
        spreadSheet.eval('A0 = A1 + A2');
        expect(spreadSheet.rows[0].cells[0].value).toEqual(15);
      });

      it('evals a value assignment', () => {
        spreadSheet.eval('A0 = 2342');
        expect(spreadSheet.rows[0].cells[0].value).toEqual(2342);
      });
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

