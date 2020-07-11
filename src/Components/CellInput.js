import React from 'react';

export default class CellInput extends React.Component {
  render() {
    const { currentValue } = this.props;

    return (
      <div>
        { currentValue }
      </div>
    );
  }
}