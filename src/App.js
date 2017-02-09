import React, { Component } from 'react';
import Cell from './Cell';
import Row from './Row';
import './App.css';

const MATRIX_SIZE = 5;

class App extends Component {
  render() {
    var rows = [];
    for(let j = 0; j < MATRIX_SIZE; j++) {
      let cells = [];
      for(let i = 0; i < MATRIX_SIZE; i++) {
        cells.push((<Cell key={i}></Cell>));
      }
      rows.push(<Row key={`row+${j}`} cells={cells}></Row>);
    }
    return (
      <div className="App">
        {rows}
      </div>
    );
  }
}

export default App;
