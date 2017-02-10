import React from 'react';
import './ContextMenu.css';

export default class ContextMenu extends React.Component {
  constructor() {
    super();

    this.state = {
      expanded: false
    };
  }

  renderMenuEntries() {
    return (
      <ul>
        <li onClick={this.onMenuEntryClick.bind(this)}>Add Formula</li>
      </ul>
    );
  }

  onMenuEntryClick() {
    const { onAddFormula } = this.props;
    this.setState({
      expanded: false
    });
    onAddFormula();
  }

  onMenuClick() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

  render() {
    const { expanded } = this.state;

    return (
      <div className="context-menu">
        <span className="menu-text" onClick={this.onMenuClick.bind(this)}>+</span>
        { expanded ? this.renderMenuEntries() : null }
      </div>
    );
  }
}