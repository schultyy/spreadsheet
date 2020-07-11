import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  renderReadOnlyCaption() {
    let caption = this.props.caption || "";
    return (
      <span className="readonly">{caption}</span>
    );
  }

  render() {
    const { isReadOnly } = this.props;

    return (
      <div className="cell">
        {isReadOnly ? this.renderReadOnlyCaption() : 0}
      </div>
    );
  }
}
