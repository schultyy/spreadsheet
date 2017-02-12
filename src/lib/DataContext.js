import PouchDB from 'pouchdb';

export default function DataContext(spreadsheet) {
  this.spreadsheet = spreadsheet;
  this.pouch = new PouchDB(this.spreadsheet.filename);
}