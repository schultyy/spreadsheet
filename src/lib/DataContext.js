import PouchDB from 'pouchdb';

export default function DataContext(spreadsheet) {
  this.spreadsheet = spreadsheet;
  this.pouch = new PouchDB(DataContext.DBNAME);
}

DataContext.DBNAME = 'Spreadsheets';

DataContext.prototype.eval = function(args) {
  this.spreadsheet.eval(args);
};

DataContext.prototype.addFormulaToCell = function(args) {
  this.spreadsheet.addFormulaToCell(args);
};