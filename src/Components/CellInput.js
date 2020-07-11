import React from 'react';

export default class CellInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false
    };
  }
  onMouseClick(_event) {
    this.setState({
      isActive: true
    });
  }

  renderInput() {
    const { currentValue, onValueChange } = this.props;

    return (
      <input value={currentValue} onChange={onValueChange} />
    );
  }

  render() {
    const { currentValue } = this.props;
    const { isActive } = this.state;

    return (
      <div onClick={this.onMouseClick.bind(this)}>
        { isActive ? this.renderInput() : currentValue }
      </div>
    );
  }
}