import React, {Component} from 'react';

export default class ContactInfo extends Component {
  render() {
    return <li onClick={this.props.onClick}>{this.props.contact.name}</li>;
  }
}
