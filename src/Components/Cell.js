import React from 'react';
import './Cell.css';
import ContextMenu from './ContextMenu';

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
      isActive: false,
      hasFocus: false
    };
  }

  onMouseDoubleClick(event) {
    this.setState({ isActive: true });
  }

  onInputKeyDown(event) {
    if(event.keyCode === 13) {
      this.setState({ isActive: false, hasFocus: false });
    }
  }

  onInputBlur(event) {
    this.setState({ isActive: false, hasFocus: false });
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

  onGainFocus() {
    this.setState({
      hasFocus: true
    });
  }

  render() {
    const { value } = this.props;
    const { isActive, hasFocus } = this.state;

    return (
      <div onClick={this.onGainFocus.bind(this)} onDoubleClick={this.onMouseDoubleClick.bind(this)}>
        { isActive ?
          this.renderInputField(value) :
          value }
        { hasFocus ? <ContextMenu></ContextMenu> : null }
      </div>
    );
  }
}