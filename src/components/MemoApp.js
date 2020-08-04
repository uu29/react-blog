import React from 'react';
import TodoListTemplate from './TodoListTemplate.js';
import Form from './Form.js';
import TodoListItem from './TodoListItem.js';

export default class MemoApp extends React.Component {
  constructor(props) {
    super(props);
    this.id = 3;
    this.state = {
      input: '',
      todos: [
        {id: 0, text: '리액트', checked: false},
        {id: 1, text: '안녕', checked: true},
        {id: 2, text: 'hello world', checked: false},
      ],
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value,
    });
  }

  handleCreate() {
    const {input, todos} = this.state;
    this.setState({
      input: '',
      todos: todos.concat({
        id: this.id++,
        text: input,
        checked: false,
      }),
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const {todos} = this.state;

    //id로 몇번째 아이템인지 찾기
    const index = todos.findIndex((todo) => todo.id === id);
    const selected = todos[index];
    const nextTodos = [...todos]; //배열 복사하기
    nextTodos[index] = {
      ...selected,
      checked: !selected.checked,
    };

    this.setState({
      todos: nextTodos,
    });
  };

  handleRemove = (id) => {
    const {todos} = this.state;
    this.setState({
      todos: todos.filter((todo) => todo.id !== id),
    });
  };

  render() {
    const {input, todos} = this.state;
    const {handleChange, handleCreate, handleKeyPress, handleToggle} = this;
    return (
      <TodoListTemplate
        form={
          <Form
            value={input}
            onKeyPress={handleKeyPress}
            onChange={handleChange}
            onCreate={handleCreate}
          />
        }
      >
        <TodoListItem
          todos={todos}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />
      </TodoListTemplate>
    );
  }
}
