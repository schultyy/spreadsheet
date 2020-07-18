import React, { Component } from 'react';
import Cell from './Cell';
import Row from './Row';
import CommandBar from './CommandBar';
import Options from './Options';
import { SpreadSheet } from '../lib/SpreadSheet';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      commandError: null
    };
  }

  renderHeaderRow() {
    let cells = [];
    for(let i = 0; i < SpreadSheet.matrix_size; i++) {
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

  onCellValueChange(changedCell, newValue) {
    const { spreadsheet, valueChange } = this.props;
    console.log("CELL VALUE CHANGE", newValue);
    valueChange(spreadsheet, changedCell, newValue);
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

  onSpreadSheetNameChange(newName) {
    const spreadSheet = this.state.spreadsheet.clone();
    spreadSheet.setFilename(newName);
    this.setState({ spreadsheet: spreadSheet });
  }

  render() {
    const { commandError } = this.state;
    const { spreadsheet } = this.props;
    const self = this;

    let rows = [this.renderHeaderRow()].concat(spreadsheet.rows.map(function(row, rowIndex) {
      let cells = row.cells.map(function(cell, cellIndex) {
        return (
          <Cell onValueChange={self.onCellValueChange.bind(self, cell)}
                value={cell.value}
                key={cellIndex}>
          </Cell>
        );
      });
      return (<Row rowIndex={row.index} key={`row+${rowIndex}`} cells={cells}></Row>);
    }));

    return (
      <div className="App">
        <div className="header">
          <h1>Spreadsheets</h1>
          <Options filename={spreadsheet.filename} onFilenameChange={this.onSpreadSheetNameChange.bind(this)} />
          <CommandBar
            onCommandChange={this.onCommandChange.bind(this)}
            commandError={commandError}
            modal={false}
          />
        </div>
        <div className="spreadsheet">
          {rows}
        </div>
      </div>
    );
  }
}

export default App;
