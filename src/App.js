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
    const rows = new Array(MATRIX_SIZE);
    let rowIndex = "A";

    for(let j = 0; j < MATRIX_SIZE; j++) {
      let cells = new Array(MATRIX_SIZE);
      for(let i = 0; i < MATRIX_SIZE; i++) {
        cells.push(new CellModel(i, 0));
      }
      rows.push(new RowModel(nextChar(rowIndex, j), cells));
    }
    return rows;
  }

  renderHeaderRow() {
    let cells = new Array(MATRIX_SIZE);
    for(let i = 0; i < MATRIX_SIZE; i++) {
      cells[i] = (
        <Cell
          key={`header-${i}`}
          isReadOnly={true}
          caption={i.toString()}
        >
        </Cell>
      );
    }
    return (
      <Row key={`header-row`} disableCaption={true} cells={cells}></Row>
    );
  }

  render() {
    let rowModels = this.state.rows;
    let rows = [this.renderHeaderRow()].concat(rowModels.map(function(row, rowIndex) {
      let cells = row.cells.map(function(cell, cellIndex) {
        return (<Cell key={cellIndex}></Cell>);
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
