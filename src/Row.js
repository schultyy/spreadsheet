import React from 'react';
import './Row.css';

export default class Row extends React.Component {
  render() {
    const { cells } = this.props;
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