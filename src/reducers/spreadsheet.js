import { SpreadSheet } from "../lib/SpreadSheet";
import {
  SPREADSHEET_CELL_VALUE_CHANGE,
  SPREADSHEET_NAME_CHANGE
} from '../Actions';

const initialState = {
  spreadsheet: new SpreadSheet()
};

export default function spreadsheetReducer(state = initialState, action) {
  switch(action.type) {
    case SPREADSHEET_CELL_VALUE_CHANGE: {
      let newSpreadSheet = state.spreadsheet.clone();
      newSpreadSheet.eval(`${action.changedCell.id()} = ${action.newValue}`);
      return { ...state, spreadsheet: newSpreadSheet };
    }
    case SPREADSHEET_NAME_CHANGE: {
      let newSpreadSheet = state.spreadsheet.clone();
      newSpreadSheet.setFilename(action.newName);
      return { ...state, spreadsheet: newSpreadSheet };
    }
    default:
      return state;
  }
}