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
      keyword: '',
      categoryData: [
        {title: 'Javascript'},
        {title: 'ReactJS'},
        {title: 'Python'},
        {title: 'Nginx'},
      ],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      keyword: e.target.value,
    });
  }

  render() {
    const categoryToComponent = (data) => {
      data.sort();
      data = data.filter((data) => {
        return data.title.toLowerCase().indexOf(this.state.keyword) > -1;
      });
      return data.map((category, i) => {
        return <CategoryCont cont={category} key={i} />;
      });
    };
    return (
      <ul id="category" className="category">
        <input
          name="keyword"
          placeholder="Search"
          value={this.state.keyword}
          onChange={this.handleChange}
        />
        {categoryToComponent(this.state.categoryData)}
      </ul>
    );
  }
}

export default Category;
