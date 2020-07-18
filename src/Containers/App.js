import { connect } from 'react-redux';
import App from '../Components/App';
import {
  spreadsheetCellChange,
  spreadsheetNameChange
} from '../Actions';

const mapStateToProps = state => ({
  spreadsheet: state.spreadsheet.spreadsheet
});

const mapDispatchToProps = dispatch => ({
  valueChange: (changedCell, newValue) => dispatch(spreadsheetCellChange(changedCell, newValue)),
  changeName: (newName) => dispatch(spreadsheetNameChange(newName))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);