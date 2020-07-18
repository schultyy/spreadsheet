export const SPREADSHEET_CELL_VALUE_CHANGE = 'SPREADSHEET_CELL_VALUE_CHANGE';

export function spreadsheetCellChange(spreadsheet, changedCell, newValue) {
  return dispatch => {
    dispatch({
      type: SPREADSHEET_CELL_VALUE_CHANGE,
      spreadsheet,
      changedCell,
      newValue
    });
  };
}