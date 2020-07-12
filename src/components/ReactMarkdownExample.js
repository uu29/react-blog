import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

class ReactMarkdownExample extends Component {
  render() {
    const input = '## This is a Header \n\nAnd this is a paragraph';
    return <ReactMarkdown source={input} className="content" />;
  }
}

export default ReactMarkdownExample;
