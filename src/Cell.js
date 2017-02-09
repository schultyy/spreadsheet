import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  renderReadOnlyCaption() {
    return (
      <span className="readonly">{this.props.caption}</span>
    );
  }

  renderInputField() {
    return (<input />);
  }

  render() {
    const { isReadOnly } = this.props;

    const cellClasses = isReadOnly ? "cell" : "cell";

    return (
      <div className={cellClasses}>
        {isReadOnly ? this.renderReadOnlyCaption() : this.renderInputField()}
      </div>
    );
  }
}