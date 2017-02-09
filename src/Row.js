import React from 'react';
import './Row.css';
import Cell from './Cell';

export default class Row extends React.Component {
  descriptionCell(caption) {
    return (
      <Cell
        key={`description-A1`}
        isReadOnly={true}
        caption={caption}
      >
      </Cell>
    );
  }

  emptyCell() {
    return (<Cell isReadOnly={true} key={`empty-0`}></Cell>);
  }

  render() {
    const valueCells = this.props.cells;
    const { disableCaption, rowIndex } = this.props;

    let cells = [];

    if (disableCaption) {
      cells = [this.emptyCell()].concat(valueCells);
    } else {
      cells = [this.descriptionCell(rowIndex)].concat(valueCells);
    }

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