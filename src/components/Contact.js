/* eslint-disable react/prop-types */
import React, {Component} from 'react';

class ContactInfo extends Component {
  render() {
    return (
      <li>
        {this.props.contact.name} {this.props.contact.phone}
      </li>
    );
  }
}

class Contact extends Component {
  constructor(props) {
    super(props); //수퍼를 먼저 해줘야 접근 가능
    this.state = {
      contactData: [
        {name: 'Yuri', phone: '010-3541-4958'},
        {name: 'Sori', phone: '010-1111-4958'},
        {name: 'Youngmin', phone: '010-2222-4958'},
        {name: 'Sehyoen', phone: '010-3333-4958'},
      ],
    };
  }
  render() {
    const mapToComponent = (data) => {
      return data.map((contact, i) => {
        return <ContactInfo contact={contact} key={i} />;
      });
    };
    return <ul>{mapToComponent(this.state.contactData)}</ul>;
  }
}

export default Contact;
