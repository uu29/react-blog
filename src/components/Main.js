import React from 'react';
import ReactMarkdownExample from './ReactMarkdownExample.js';
import Category from './Category.js';
import '../scss/main.scss';

class Main extends React.Component {
  render() {
    return (
      <main id="main">
        <Category className="category"></Category>
        <ReactMarkdownExample></ReactMarkdownExample>
      </main>
    );
  }
}

export default Main;
