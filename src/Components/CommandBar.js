import React from 'react';
import './CommandBar.css';

export default class CommandBar extends React.Component {
  onTextChange(eventArgs) {
    const { onCommandChange } = this.props;

    if (eventArgs.keyCode === 13) { //return
      onCommandChange(this.refs.commandText.value);
    }
  }
  render() {
    const { commandError, modal } = this.props;

    const classNames = modal ? "commandbar modal" : "commandbar inline";

    return (
      <div className={classNames}>
        <div>
          <span className="input-prefix">&gt;</span>
          <span><input ref="commandText" type="text" onKeyDown={this.onTextChange.bind(this)} /></span>
        </div>
        <div className="error-message">
          {commandError}
        </div>
      </div>
    );
  }
}