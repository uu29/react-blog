import React from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
// import ReactMarkdownExample from './components/ReactMarkdownExample.js';
// import Category from './components/Category.js';
import './scss/variables.scss';
import './scss/_default.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <Header></Header>
        <Main></Main>
      </div>
    );
  }
}

export default App;
