import React, { Component } from 'react';
import Cell from './Cell';
import Row from './Row';
import CommandBar from './CommandBar';
import { Row as RowModel,
  Cell as CellModel
} from '../lib/models';
import { SpreadSheet } from '../lib/SpreadSheet';
import './App.css';

const MATRIX_SIZE = 5;

function nextChar(c, offset) {
  return String.fromCharCode(c.charCodeAt(0) + offset);
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      spreadsheet: this.initializeModel(),
      commandError: null
    };
  }

  initializeModel() {
    const rows = [];
    let rowIndex = "A";

    for(let j = 0; j < MATRIX_SIZE; j++) {
      let cells = [];
      const currentRowIndex = nextChar(rowIndex, j);

      for(let i = 0; i < MATRIX_SIZE; i++) {
        cells.push(new CellModel(i, currentRowIndex, 0));
      }
      rows.push(new RowModel(currentRowIndex, cells));
    }
    return new SpreadSheet(rows);
  }

  renderHeaderRow() {
    let cells = [];
    for(let i = 0; i < MATRIX_SIZE; i++) {
      cells.push((
        <Cell
          key={`header-${i}`}
          isReadOnly={true}
          caption={i.toString()}
        >
        </Cell>
      ));
    }
    return (
      <Row key={`header-row`} disableCaption={true} cells={cells}></Row>
    );
  }

  onCellValueChange(changedCell, eventArgs) {
    let newSpreadSheet = this.state.spreadsheet.clone();
    newSpreadSheet.updateCell(changedCell, eventArgs.target.value);
    this.setState({spreadsheet: newSpreadSheet});
  }

  onCommandChange(newCommand) {
    try {
      const { spreadsheet } = this.state;
      const newSheet = spreadsheet.clone();

      newSheet.eval(newCommand);
      this.setState({
        spreadsheet: newSheet,
        commandError: null
      });
    }
    catch(e) {
      this.setState({commandError: e.message});
    }
  }

  render() {
    const { spreadsheet, commandError } = this.state;
    const self = this;

    let rows = [this.renderHeaderRow()].concat(spreadsheet.rows.map(function(row, rowIndex) {
      let cells = row.cells.map(function(cell, cellIndex) {
        return (<Cell onValueChange={self.onCellValueChange.bind(self, cell)} value={cell.value} key={cellIndex}></Cell>);
      });
      return (<Row rowIndex={row.index} key={`row+${rowIndex}`} cells={cells}></Row>);
    }));

    return (
      <div className="App">
        <CommandBar
          onCommandChange={this.onCommandChange.bind(this)}
          commandError={commandError}
        />
        <div className="spreadsheet">
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
