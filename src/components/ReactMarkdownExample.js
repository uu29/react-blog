import React, {Component} from 'react';
import ReactMarkdown from 'react-markdown';

class ReactMarkdownExample extends Component {
  render() {
    // const source = `# 제목1 \n\n ### 테이블 \n\n |제목|내용| \n\n |---|---| \n\n |리액트|마크다운| \n\n \`\`\` \n\n 코드블럭 \n\n \`\`\` \n\n **굵게** \n\n *기울이기* \n\n > 인용문 \n\n 글자 \`강조\` 하기`;
    // const markdown =
    // '\n\n## 마크다운 테스트\n\n`mkdir {PROJECTNAME}`\n\n `cd {PROJECT}`\n\n `npm init -y`  의존성 초기화, pakages.json만 남음\n\n `npm install react react-dom`  react, react-dom 설치\n\n `npm install --save-dev @babel/core @babel/preset-env @babel/preset-react webpack webpack-cli webpack-dev-server babel-loader css-loader style-loader html-webpack-plugin` 개발모드 의존성 설치(웹팩, 바벨)';
    return (
      <ReactMarkdown
        source={markdown}
        className="content"
        escapeHtml={false}
        unwrapDisallowed={false}
      />
    );
  }
}

export default ReactMarkdownExample;
