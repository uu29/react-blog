/* eslint-disable react/prop-types */
import React, {Component} from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update'; //배열을 복사해서 추가/수정/삭제하기 편하게 도와주는 패키지.
//immutable helper는 문법이 독특함(참고: https://hjh5488.tistory.com/23)
import ContactCreate from './ContactCreate';

export default class Contact extends Component {
  constructor(props) {
    super(props); //수퍼를 먼저 해줘야 접근 가능
    this.state = {
      selectedKey: -1,
      keyword: '',
      contactData: [
        {name: 'Yuri', phone: '010-3541-4958'},
        {name: 'Sori', phone: '010-1111-4958'},
        {name: 'Youngmin', phone: '010-2222-4958'},
        {name: 'Sehyoen', phone: '010-3333-4958'},
      ],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentWillMount() {
    //DOM생성 전에 실행
    const contactData = localStorage.contactData;
    if (contactData) {
      this.setState({
        contactData: JSON.parse(contactData),
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    //Component update시 실행
    if (
      JSON.stringify(prevProps.contactData) !=
      JSON.stringify(this.state.contactData)
    ) {
      localStorage.contactData = JSON.stringify(this.state.contactData);
    }
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  handleClick(key) {
    this.setState({
      selectedKey: key,
    });
  }

  handleCreate(contact) {
    this.setState({
      contactData: update(this.state.contactData, {
        $push: [contact],
      }),
    });
  }

  handleRemove() {
    if (this.state.selectedKey < 0) {
      return;
    }
    this.setState({
      contactData: update(this.state.contactData, {
        $splice: [[this.state.selectedKey, 1]], //selectedKey부터 1개번째 데이터를 삭제할 것임
      }),
      selectedKey: -1,
    });
  }

  handleEdit(name, phone) {
    this.setState({
      contactData: update(this.state.contactData, {
        [this.state.selectedKey]: {
          name: {$set: name},
          phone: {$set: phone},
        },
      }),
    });
  }

  render() {
    const mapToComponent = (data) => {
      data.sort((a, b) => {
        return a.name > b.name;
      }); //오름차순으로 정렬
      data = data.filter((contact) => {
        return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      return data.map((contact, i) => {
        //data.map은 배열에 모두 적용시키기 위해(forEach와 비슷하다고 생각)
        return (
          <ContactInfo
            contact={contact}
            key={i}
            onClick={() => {
              this.handleClick(i);
            }}
          />
        );
      });
    };
    return (
      <div>
        <h1>Contacts</h1>
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        {/* 이벤트는 컴포넌트에는 적용이 안되고 네이티브 돔에만 적용됨 */}
        <ul>{mapToComponent(this.state.contactData)}</ul>
        <ContactDetails
          isSelected={this.state.selectedKey != -1}
          contact={this.state.contactData[this.state.selectedKey]}
          onRemove={this.handleRemove}
          onEdit={this.handleEdit}
        />
        <ContactCreate onCreate={this.handleCreate} />
      </div>
    );
  }
}
