import React, {Component} from 'react';

class CategoryCont extends Component {
  render() {
    return <li>{this.props.cont.title}</li>;
  }
}

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [
        {title: 'Javascript'},
        {title: 'ReactJS'},
        {title: 'Python'},
        {title: 'Nginx'},
      ],
    };
  }
  render() {
    const categoryToComponent = (data) => {
      return data.map((category, i) => {
        return <CategoryCont cont={category} key={i} />;
      });
    };
    return (
      <ul id="category" className="category">
        {categoryToComponent(this.state.categoryData)}
      </ul>
    );
  }
}

export default Category;
