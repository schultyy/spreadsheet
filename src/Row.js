import React from 'react';
import './Row.css';
import Cell from './Cell';

export default class Row extends React.Component {
  descriptionCell() {
    return (
      <Cell
        key={`description-A1`}
        isReadOnly={true}
        caption="A1"
      >
      </Cell>
    );
  }

  render() {
    const valueCells = this.props.cells;
    const cells = [this.descriptionCell()].concat(valueCells);

    return (
      <div className="row">
        {cells}
      </div>
    );
  }
}

Row.propTypes = {
  cells: React.PropTypes.array.isRequired
};