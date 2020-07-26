import React, {Component} from 'react';

class Counter extends Component {
  constructor(props) {
    super(props); //수퍼를 먼저 해줘야 접근 가능
    this.state = {
      value: 0,
    };
    this.handleClick = this.handleClick.bind(this); //바인드는 컨스트럭터 안에서 해주는 것이 좋음
    this.minusClick = this.minusClick.bind(this);
  }
  handleClick() {
    this.setState({
      value: this.state.value + 1,
    });
  }
  minusClick() {
    if (this.state.value > 0) {
      this.setState({
        value: this.state.value - 1,
      });
    }
  }
  render() {
    return (
      <div>
        <h2>{this.state.value}</h2>
        <button onClick={this.handleClick}>Press Me</button>
        <button onClick={this.minusClick}>Unpress Me</button>
      </div>
    );
  }
}

export default Counter;
