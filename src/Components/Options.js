import React from 'react';
import './Options.css';

export default class Options extends React.Component {

  constructor() {
    super();

    this.state = {
      filename: ''
    };
  }

  componentDidMount() {
    this.setState({ filename: this.props.filename });
  }

  onKeyDown(event) {
    const { onFilenameChange } = this.props;

    //return
    if(event.keyCode === 13) {
      onFilenameChange(this.refs.spreadSheetNameInput.value);
    }
  }

  onBlur() {
    const { onFilenameChange } = this.props;
    onFilenameChange(this.refs.spreadSheetNameInput.value);
  }

  onTextChange(event) {
    this.setState({ filename: event.target.value });
  }

  render() {
    const { filename } = this.state;

    return (
      <div className="spreadsheet-options">
        <input
              ref='spreadSheetNameInput'
              type="text"
              onBlur={this.onBlur.bind(this)}
              onKeyDown={this.onKeyDown.bind(this)}
              placeholder="Spreadsheet name"
              onChange={this.onTextChange.bind(this)}
              value={filename}
        />
      </div>
    );
  }
}