import React from 'react';
import Header from './components/Header.js';
import Main from './components/Main.js';
// import Counter from './components/Counter.js';
import Contact from './components/Contact.js';
// import ReactMarkdownExample from './components/ReactMarkdownExample.js';
// import Category from './components/Category.js';
import MemoApp from './components/MemoApp.js';
import './scss/variables.scss';
import './scss/_default.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <MemoApp/>
        {/* <Counter></Counter> */}
        {/* <Contact /> */}
        {/* <Header></Header>
        <Main></Main> */}
      </div>
    );
  }
}

export default App;
