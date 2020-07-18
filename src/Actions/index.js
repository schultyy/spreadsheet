export const SPREADSHEET_CELL_VALUE_CHANGE = 'SPREADSHEET_CELL_VALUE_CHANGE';

export function spreadsheetCellChange(changedCell, newValue) {
  return dispatch => {
    dispatch({
      type: SPREADSHEET_CELL_VALUE_CHANGE,
      changedCell,
      newValue
    });
  };
}

export const SPREADSHEET_NAME_CHANGE = 'SPREADSHEET_NAME_CHANGE';

export function spreadsheetNameChange(newName) {
  return dispatch => {
    dispatch({
      type: SPREADSHEET_NAME_CHANGE,
      newName
    });
    window.document.title = newName;
  };
}