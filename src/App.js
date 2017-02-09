import React, { Component } from 'react';
import Cell from './Cell';
import Row from './Row';
import { Row as RowModel, Cell as CellModel } from './models';
import './App.css';

const MATRIX_SIZE = 5;

function nextChar(c, offset) {
  return String.fromCharCode(c.charCodeAt(0) + offset);
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      rows: this.initializeModel()
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
    return rows;
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

  onValueChange(changedCell, eventArgs) {
    let newState = this.state.rows.slice();
    const row = newState.find(r => r.index === changedCell.rowIndex);
    const cell = row.cells.find(cell => cell.index === changedCell.index);
    cell.value = parseInt(eventArgs.target.value, 10) || 0;
    this.setState({rows: newState});
  }

  render() {
    let rowModels = this.state.rows;
    const self = this;
    let rows = [this.renderHeaderRow()].concat(rowModels.map(function(row, rowIndex) {
      let cells = row.cells.map(function(cell, cellIndex) {
        return (<Cell onValueChange={self.onValueChange.bind(self, cell)} value={cell.value} key={cellIndex}></Cell>);
      });
      return (<Row rowIndex={row.index} key={`row+${rowIndex}`} cells={cells}></Row>);
    }));

    return (
      <div className="App">
        {rows}
      </div>
    );
  }
}

export default App;
