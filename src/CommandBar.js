import React from 'react';
import './CommandBar.css';

export default class CommandBar extends React.Component {
  render() {
    return (
      <div className="commandbar">
        <span className="input-prefix">&gt;</span>
        <span><input type="text" /></span>
      </div>
    );
  }
}