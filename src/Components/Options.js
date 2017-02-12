import React from 'react';
import './Options.css';

export default class Options extends React.Component {
  render() {
    return (
      <div className="spreadsheet-options">
        <input type="text" placeholder="Spreadsheet name" />
      </div>
    );
  }
}