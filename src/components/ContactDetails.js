import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      name: '',
      phone: '',
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleToggle() {
    if (!this.state.isEdit) {
      //수정모드일 때 값을 그대로 받아오기 위해
      this.setState({
        name: this.props.contact.name,
        phone: this.props.contact.phone,
      });
    } else {
      if (this.props.isSelected) {
        this.handleEdit();
      }
    }
    this.setState({
      isEdit: !this.state.isEdit,
    });
    //console.log(this.state.isEdit);
    //이렇게 하면 처음에는 true를 반환할 것 같지만 false를 반환함.
    //왜냐하면 setState 메소드는 비동기라서 console.log와 함께 동작
    //console.log(!this.state.isEdit);
    //그래서 진짜 값을 알고 싶으면 위와 같이 하자.
  }

  handleChange(event) {
    let nextState = {}; //비어있는 객체를 만든다.
    nextState[event.target.name] = event.target.value;
    this.setState(nextState);
  }

  handleEdit() {
    this.props.onEdit(this.state.name, this.state.phone);
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      console.log('hi');
      this.handleToggle();
    }
  }

  render() {
    const details = (
      <div>
        <p>{this.props.contact.name}</p>
        <p>{this.props.contact.phone}</p>
      </div>
    );

    const edit = (
      <div>
        <p>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </p>
        <p>
          <input
            type="text"
            name="phone"
            placeholder="phone"
            value={this.state.phone}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
        </p>
      </div>
    );

    const view = this.state.isEdit ? edit : details;

    const blank = <div>Not Selected</div>;

    return (
      <div>
        <h2>Details</h2>
        {this.props.isSelected ? view : blank}
        <p>
          <button onClick={this.handleToggle}>
            {this.state.isEdit ? 'OK' : 'Edit'}
          </button>
          <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );
  }
}

ContactDetails.defaultProps = {
  contact: {
    name: '',
    phone: '',
  },
  onRemove: () => {
    console.error('onRemove not defind');
  },
  onEdit: () => {
    console.error('onEdit not defind');
  },
};

ContactDetails.propTypes = {
  contact: PropTypes.object,
  onRemove: PropTypes.func,
  onEdit: PropTypes.func,
};
