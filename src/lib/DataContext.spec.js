import PouchDB from 'pouchdb';
import DataContext from './DataContext';
import fs from 'fs-extra';

const DBName = 'testsheet';

afterAll(() => {
  //Clean up PouchDB test database
  fs.removeSync(DBName);
})

describe('DataContext', () => {
  describe('.new', () => {
    const spreadSheetMock = {
      filename: DBName
    };
    const context = new DataContext(spreadSheetMock);

    it('initializes a new PouchDB instance', () =>{
      expect(context.pouch.constructor).toEqual(PouchDB);
    });

    it('assigns spreadsheet', () => {
      expect(context.spreadsheet).toEqual(spreadSheetMock);
    });

    it("creates a database with the spreadsheet's name", () => {
      expect(context.pouch.name).toEqual(spreadSheetMock.filename);
    });
  });
});