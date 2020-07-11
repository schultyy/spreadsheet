import React from 'react';
import CellInput from './CellInput';
import './Cell.css';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentValue: 0
    };
  }

  onCellValueChange(event) {
    const { onValueChange } = this.props;

    this.setState({
      currentValue: event.target.value
    });

    onValueChange(event.target.value);
  }

  renderReadOnlyCaption() {
    let caption = this.props.caption || "";
    return (
      <span className="readonly">{caption}</span>
    );
  }

  render() {
    const { isReadOnly } = this.props;
    const { currentValue } = this.state;

    return (
      <div className="cell">
        { isReadOnly ? this.renderReadOnlyCaption() : <CellInput currentValue={currentValue} onValueChange={this.onCellValueChange.bind(this)} /> }
      </div>
    );
  }
}
