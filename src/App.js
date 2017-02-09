import React, { Component } from 'react';
import Cell from './Cell';
import Row from './Row';
import './App.css';

const MATRIX_SIZE = 5;

function nextChar(c, offset) {
  return String.fromCharCode(c.charCodeAt(0) + offset);
}

class App extends Component {
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
    var rows = [];
    rows.push(this.renderHeaderRow());
    var rowIndex = "A";

    for(let j = 0; j < MATRIX_SIZE; j++) {
      let cells = [];
      for(let i = 0; i < MATRIX_SIZE; i++) {
        cells.push((<Cell key={i}></Cell>));
      }
      rows.push(<Row rowIndex={nextChar(rowIndex, j)} key={`row+${j}`} cells={cells}></Row>);
    }
    return (
      <div className="App">
        {rows}
      </div>
    );
  }
}

export default App;
