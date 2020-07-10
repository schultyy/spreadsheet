import React from 'react';
import './Cell.css';

export default class Cell extends React.Component {
  renderReadOnlyCaption() {
    let caption = this.props.caption || "";
    return (
      <span className="readonly">{caption}</span>
    );
  }

  renderInputField(onValueChange, hasFormula, value) {
    return (<CellContent onValueChange={onValueChange} hasFormula={hasFormula} value={value}></CellContent>);
  }

  render() {
    const { isReadOnly, onValueChange, hasFormula, value } = this.props;

    const cellClasses = isReadOnly ? "cell" : "cell";

    return (
      <div className={cellClasses}>
        {isReadOnly ? this.renderReadOnlyCaption() : this.renderInputField(onValueChange, hasFormula, value)}
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

  onMouseClick() {
    const { hasFormula } = this.props;
    if(!hasFormula) {
      this.setState({ isActive: true });
    }
  }

  onInputKeyDown(event) {
    if(event.keyCode === 13) {
      this.setState({ isActive: false });
    }
  }

  onInputBlur(event) {
    this.setState({ isActive: false });
  }

  renderInputField(value) {
    const { onValueChange } = this.props;

    return (
      <input autoFocus value={value}
             onBlur={this.onInputBlur.bind(this)}
             onKeyDown={this.onInputKeyDown.bind(this)}
             onChange={onValueChange}
      />
    );
  }

  render() {
    const { value, hasFormula } = this.props;
    const { isActive } = this.state;

    const classNames = hasFormula ? "readonly" : "";

    return (
      <div className={classNames} onClick={this.onMouseClick.bind(this)}>
        { isActive ?
          this.renderInputField(value) :
          <span className="content">{value}</span>
        }
      </div>
    );
  }
}
