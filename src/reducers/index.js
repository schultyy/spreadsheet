import { combineReducers} from 'redux';
import spreadsheet from './spreadsheet';


// Use ES6 object literal shorthand syntax to define the object shape
const rootReducer = combineReducers({
  spreadsheet
});

export default rootReducer;
