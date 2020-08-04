import React, {Component} from 'react';
import TodoItem from './TodoItem';

export default class TodoListItem extends Component {
  render() {
    const {todos, onToggle, onRemove} = this.props;

    //객체를 컴포넌트 배열로 변환하기
    const todoList = todos.map(({id, text, checked}) => (
      <TodoItem
        id={id}
        text={text}
        checked={checked}
        onToggle={onToggle}
        onRemove={onRemove}
        key={id}
      />
    ));

    return <div>{todoList}</div>;
  }
}
