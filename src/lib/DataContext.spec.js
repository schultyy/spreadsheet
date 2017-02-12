import PouchDB from 'pouchdb';
import DataContext from './DataContext';
import fs from 'fs-extra';
import { SpreadSheet } from './SpreadSheet';

const DBName = 'testsheet';

afterAll(() => {
  //Clean up PouchDB test database
  fs.removeSync(DBName);
});

describe('DataContext', () => {
  const spreadsheet = new SpreadSheet();
  spreadsheet.setFilename(DBName);

  const context = new DataContext(spreadsheet);
  describe('.new', () => {
    it('initializes a new PouchDB instance', () =>{
      expect(context.pouch.constructor).toEqual(PouchDB);
    });

    it('assigns spreadsheet', () => {
      expect(context.spreadsheet).toEqual(spreadsheet);
    });

    it("creates a database with the spreadsheet's name", () => {
      expect(context.pouch.name).toEqual(DBName);
    });
  });

  describe('.eval', () => {
    it("delegates to spreadsheet's eval", () => {
      context.eval('A0 = 5');
      expect(spreadsheet.rows[0].cells[0].value).toEqual(5);
    });
  });

  describe('.addFormulaToCell', () => {
    it("delegates to spreadsheet's eval", () => {
      const formula = 'A0 = A1 + A2';
      context.addFormulaToCell(formula);
      expect(spreadsheet.rows[0].cells[0].formula).toEqual(formula);
    });
  });
});