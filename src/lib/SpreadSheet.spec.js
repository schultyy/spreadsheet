import { SpreadSheet } from './SpreadSheet';
import { Row, Cell, ComputedCell } from './models';

describe('SpreadSheet', () => {
  describe('addFormulaToCell', () => {
    const cells = [
        new Cell(0, 'A', 0),
        new Cell(1, 'A', 5),
        new Cell(2, 'A', 10)
      ];
    const rows = [
      new Row('A', cells)
    ];
    const spreadSheet = new SpreadSheet(rows);
    const formula = 'A0 = A1 + A2';

    it('converts the specified cell to a computed cell', () => {
      spreadSheet.addFormulaToCell(formula);
      const cell = spreadSheet.rows[0].cells[0];
      expect(cell.constructor).toEqual(ComputedCell);
    });

    it('evaluates formula directly', () => {
      spreadSheet.addFormulaToCell(formula);
      const cell = spreadSheet.rows[0].cells[0];
      expect(cell.value).toEqual(15);
    });
  });
  describe('eval', () => {
    context('with computed cells', () => {
      const cells = [
        new ComputedCell(0, 'A', 'A0 = A1 + A2'),
        new Cell(1, 'A', 5),
        new Cell(2, 'A', 10)
      ];
      const rows = [
        new Row('A', cells)
      ];
      const spreadSheet = new SpreadSheet(rows);

      it('updates computed cell as soon as a dependent cell changes', () => {
        spreadSheet.eval('A1 = 10');
        expect(spreadSheet.rows[0].cells[0].value).toEqual(20);
      });
    });

    context('with regular cells', () => {
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

    context('with cells containing strings', () => {
      const cells = [
        new Cell(0, 'A', 54),
        new Cell(1, 'A', "This is not a number"),
        new Cell(2, 'A', 10)
      ];
      const rows = [
        new Row('A', cells)
      ];
      const spreadSheet = new SpreadSheet(rows);

      describe('in an equation', () => {
        spreadSheet.eval('A0 = A1 + A2');
        it('the target cell has value 0', () => {
          expect(spreadSheet.rows[0].cells[0].value).toEqual(10);
        });
      });

      describe('a simple value assignment', () => {
        it('assigns the value to the target cell', () => {
          spreadSheet.eval('A0 = Also not a number');

          expect(spreadSheet.rows[0].cells[0].value).toEqual('Also not a number');
        });
      });
    });
  });
});

