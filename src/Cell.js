import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  renderReadOnlyCaption() {
    let caption = this.props.caption || "";
    return (
      <span className="readonly">{caption}</span>
    );
  }

  renderInputField(onValueChange, value) {
    return (<CellContent onValueChange={onValueChange} value={value}></CellContent>);
  }

  render() {
    const { isReadOnly, onValueChange, value } = this.props;

    const cellClasses = isReadOnly ? "cell" : "cell";

    return (
      <div className={cellClasses}>
        {isReadOnly ? this.renderReadOnlyCaption() : this.renderInputField(onValueChange, value)}
      </div>
    );
  }
}

class CellContent extends React.Component {
  constructor() {
    super();

    this.state = {
      isActive: false
    };
  }

  onMouseDoubleClick(event) {
    this.setState({ isActive: true });
  }

  onInputKeyDown(event) {
    if(event.keyCode === 13) {
      this.setState({ isActive: false });
    }
  }

  renderInputField(value) {
    const { onValueChange } = this.props;

    return (<input value={value} onKeyDown={this.onInputKeyDown.bind(this)} onChange={onValueChange} />);
  }

  render() {
    const { value } = this.props;
    const { isActive } = this.state;

    return (
      <div onDoubleClick={this.onMouseDoubleClick.bind(this)}>
        { isActive ?
          this.renderInputField(value) :
          value }
      </div>
    );
  }
}