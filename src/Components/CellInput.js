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

  onInputKeyDown(event) {
    if(event.keyCode === 13) {
      this.setState({ isActive: false });
    }
  }

  renderInput() {
    const { currentValue, onValueChange } = this.props;

    return (
      <input
        value={currentValue}
        onChange={onValueChange}
        onKeyDown={this.onInputKeyDown.bind(this)}
      />
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