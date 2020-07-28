import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component {
  constructor(props) {
    super(props); //super로 실행해주지 않으면 오류가 뜸
    this.state = {
      name: '',
      phone: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  //input에 값을 고정해놓았으므로 핸들체인지 메소드를 입히지 않으면 입력이 안됨.
  handleChange(event) {
    let nextState = {}; //비어있는 객체를 만든다.
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleClick() {
    const contact = {
      name: this.state.name,
      phone: this.state.phone,
    };
    this.props.onCreate(contact);
    this.setState({
      name: '',
      phone: '',
    });
    this.nameInput.focus();
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.handleClick();
    }
  }

  render() {
    return (
      <div>
        <h1>Create Contact</h1>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
            ref={(ref) => {
              this.nameInput = ref;
              //자기 자신을 선택하고 싶을 때
              //but ref를 사용하지 않고 할 수 있는 방법이 있는지 먼저 확인할 것
              //constructor에서는 ref에 접근할 수 없음
            }}
          />
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>
    );
  }
}

//props를 받았으니 propTypes와 default를 설정해준다. 안해줘도 되지만 습관들이면 좋음
ContactCreate.propTypes = {
  // onCreate를 Contact에서 받아왔음. 타입은 함수임
  onCreate: PropTypes.func,
};

ContactCreate.defaultProps = {
  onCreate: () => {
    console.error('onCreate not defined');
  },
};
