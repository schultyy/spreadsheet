import { connect } from 'react-redux';
import App from '../Components/App';
import { spreadsheetCellChange } from '../Actions';

const mapStateToProps = state => ({
  spreadsheet: state.spreadsheet.spreadsheet
});

const mapDispatchToProps = dispatch => ({
  valueChange: (spreadsheet, changedCell, newValue) => dispatch(spreadsheetCellChange(spreadsheet, changedCell, newValue))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);