---
title: 개츠비 마크다운
path: '/posts'
date: '2020-07-12'
---
스타일이 뒤죽박죽인 것 만큼 싫은 것은 포맷이 뒤죽박죽인 것이다.

어떤 것에는 '(작은따옴표)을 쓰고 어떤 것에는 "(큰따옴표)를 쓰고

어떤 곳은 두 줄을 띄우고 어떤 곳은 탭을 하고..

특히 팀원이 여러명일 때는 각각 쓰는 규칙이 달라서 나중에 지저분한 코드를 보지 않으려면 포맷을 통일하는 작업이 꼭 필요하다.



이 때 사용하는 툴이 Prettier이다.

그리고 Prettier와 함께 자주 사용하는 것이 ESLint인데 Prettier는 포매팅 도구라면 ESLint는 문법을 교정하는 도구다.



라고 말만 듣고 한번도 사용해보지 않았지만 이번 프로젝트에는 써보려고 한다.

우선 VSCode 익스텐션으로 두개 다 설치해준다.



그리고 나머지는 구글링을 통해 찾아본 결과다.



### 1. 필요한 패키지 설치

##### ①`npm i -D prettier eslint-config-prettier eslint-plugin-prettier`

- eslint-config-prettier: ESLint에 내제된 포매팅 기능을 삭제

- eslint-plugin-prettier: ESLint에 prettier의 포매팅 기능을 추가

##### ②`npm i -D husky lint-staged pretty-quick`

ESLint 또한 Prettier처럼 포매팅을 지원하기 때문에 이 기능을 삭제해야 충돌이 일어나지 않는다.

이를 위해 `eslint-config-prettier`로 ESLint 고유의 포매팅 기능을 없애고

`eslint-plugin-prettier`로 Prettier의 포매팅 기능을 사용한다.

- husky: git hooks를 쉽게 만들어 잘못된 commit이나 push 방지
- lint-staged: staged(수정한 파일을 곧 commit할 것이라고 표시한 상태)된 파일만 lint해주는 것
- pretty-quick: 코드를 확인하는 것



### 2. Prettier 설정

ESLint 포매팅 기능을 없앴지만 VSCode 자체에도 자바스크립트 포매팅 기능이 내장되어 있는데 이것 또한 비활성화해줘야 한다.

![image-20200629214517876](C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200629214517876.png)



VSC의 setting에 들어가서 'format javascript'를 검색하면 나오는 맨 첫번째 'Format: Enable'을 체크해제한다.



이제 프로젝트에 프리티어 설정파일을 만들어보자.

VSC에서 F1을 누르면 익스텐션을 실행시킬 수 있는데 'prettier'까지만 치면 아래와 같이

'Create Configuration File'이 나온다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200629213535842.png" alt="image-20200629213535842" style="zoom:80%;" />



클릭하면 파일 저장창이 뜨는데 루트 경로에 저장한다.

그러면 다음과 같이 `.prettierrc`라는 설정파일이 생성된다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200629213859436.png" alt="image-20200629213859436" style="zoom:80%;" />

들어가보면 이렇게 최소한의 설정만 되어있다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200629213943544.png" alt="image-20200629213943544" style="zoom:80%;" />



이 설정을 이제 커스터마이징 해서 사용할거다.

[프리티어 공식문서-옵션설정](https://prettier.io/docs/en/options.html)에 들어가면 자세한 설명이 나와있다.



<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200629220127730.png" alt="image-20200629220127730" style="zoom: 67%;" />

당황하지 말고 구글 번역을 해보자.

각 제목은 속성이고 Override는 임포트 유형별 형태를 써놓은 것인데

'.prettierrc'에서 사용한다면 API Override의 형식을 따라주면 된다.



#### 주요 속성들 몇개만 정리하자면

| 키                 | 속성                                                         | type           | default |
| ------------------ | ------------------------------------------------------------ | -------------- | ------- |
| tabWidth           | 들여쓰기 크기                                                | int            | 2       |
| useTabs            | 탭 대신 스페이스바를 사용                                    | bool           | false   |
| printWidth         | 한 줄이 몇 자를 넘지 않게 할 것인지                          | int            | 80      |
| Semicolons         | true: 모든 문장 뒤에 세미콜론(;)을 붙임<br />false: 첫 문장에만 세미콜론(;)을 붙임 | bool           | true    |
| singleQuote        | true: 작은따옴표('')를 사용<br />false: 큰따옴표("")를 사용  | bool           | false   |
| jsxSingleQuote     | 위와 같으나 JSX전용(리액트)                                  | bool           | false   |
| trailingComma      | es5: objects, arrays같은 es5에서 유효한 후행쉼표 사용<br />all: 함수를 포함한 모든 곳에 후행쉼표 사용<br />none: 후행쉼표 사용 안함<br />*후행쉼표는 맨 뒤에 오는 쉼표 (,) | es5\|all\|none | es5     |
| bracketSpacing     | 브라켓 안에서 띄어쓰기 방식<br />true: `{ foo: bar }`<br />false: `{foo: bar}` | bool           | true    |
| jsxBracketSameLine | JSX에서 브라켓 띄어쓰기 방식(리액트)<br />true:<br />![image-20200630205100063](C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630205100063.png)<br />\<br />false:<br />![image-20200630205118865](C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630205118865.png)<br /> | bool           | false   |
| arrowParens        | 화살표함수 괄호 표시 여부<br />always: (x) => x<br />avoid: x => x | always\|avoid  | always  |



이외에도 insertPragma, proseWrap, htmlWhitespaceSensitivity 등이 있지만

자주 사용할 것 같지 않아서 패스했고 필요하면 찾아보면 될 것이다.



나는 이렇게 설정했다.



```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 80,
  "jsxBracketSameLine": false,
  "bracketSpacing": false,
}
```



#### 프리티어가 제대로 실행이 될까?

전혀 포매팅되어있지 않은 파일을 터미널창에 prettier로 실행시켜보자.

`npx prettier {파일명}`을 하면 내가 설정한 프리티어로 해당 파일이 리턴된다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630211249129.png" alt="image-20200630211249129" style="zoom:67%;" />

` "trailingComma": all`이 적용된 모습이다.

그리고 해당 파일에 바로 적용하고 싶으면 `npx prettier --write src/App.js`를 해주면 된다.



#### Prettier 예외 지정하기

알아서 포매팅을 해주는 것은 좋지만 `node_modules/`의 파일이나 `package-lock.json`같은 파일을 포매팅할 필요는 없다.

이 때 `.prettierignore` 설정 파일을 생성하고 예외 파일이나 디렉토리를 지정해줄 수 있다.

문법은 `.gitignore`와 동일하다.



[프리티어 공식문서-ignore](https://prettier.io/docs/en/ignore.html)에는 주석을 통해 javascript, JSX, HTML, CSS 등 파일에 이그노어를 지정하는 방법들도 나와있다.



나는 이렇게 설정하였다.

```
dist/
/node_modules
.cache/
coverage/
/tests/**/*.*
!/tests/**/jsfmt.spec.js
/tests_integration/cli/
/tests_integration/plugins/
/tests_integration/custom-parsers/
/website/build/
/website/static/lib/
/website/static/playground.js
*.json
```



#### VSC 저장할 때 마다 실행시키고 싶으면

`.vscode > settings.json`에서 다음과 같이 설정해준다.

```json
{
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true,
        "editor.formatOnPaste": true
    }
}
```

기본 포매터를 프리티어로 지정하고 formatOnSave(저장할 때 마다 실행할 것인지), formatOnPaste(붙여넣기 할 때마다 실행할 것인지)에 true로 해준다.



잘 되는지 보자.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630213439746.png" alt="image-20200630213439746" style="zoom:67%;" />

형식이 뒤죽박죽인 jsx를 만들어주고 저장을 해본다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630214422275.png" alt="image-20200630214422275" style="zoom:67%;" />

아주 잘 실행되었다.



### 3. ESLint 설정

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630215328190.png" alt="image-20200630215328190" style="zoom:80%;" />

Prettier와 마찬가지로 ESLint 설정파일을 만들어준다.



bash에서 실행하려니 안먹어서 Powershell에서 실행시키니 이런 요상한 질문이 나왔다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630215623237.png" alt="image-20200630215623237" style="zoom:80%;" />

다 대충 답해주고 넘어가니 마지막에 ESLint를 설치하겠냐는 질문이 나와서 설치한다고 해줬다.

(이 부분은 이미 설치했는데 왜 이렇게 나온지 모르겠다.)



이렇게 하고 나니 루트 경로에 `.eslintrc.json`파일이 생겼다.

처음에는 다음과 같이 세팅되어 있다.

```json
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
```

여기에서 extends설정 부분을 `prettier`로 바꾼다.

<img src="C:\Users\jlory\AppData\Roaming\Typora\typora-user-images\image-20200630221117826.png" alt="image-20200630221117826" style="zoom:80%;" />

각각의 설정이 의미하는 것은 [공식문서](https://eslint.org/docs/user-guide/configuring)를 참고하자.

rules안에는 포매팅 형식을 지정할 수 있는데 이미 Prettier에서 설정해줬으므로 빈 채로 둔다.



#### VSC 설정 변경

다시 `.vscode > settings.json`로 돌아가 다음과 같이 추가해준다.

```json
{
	"javascript.format.enable": false,
    "prettier.eslintIntegration": true
}
```



#### ESLint 예외처리하기

Prettier와 마찬가지로 `.eslintignore`파일 생성 후 제외할 파일이나 디렉토리를 지정해준다.

나는 위에 썼던 `.prettierigfnore`파일과 동일하게 만들어주었다.



#### 잘 되는지 테스트해보기

`npm install -g eslint eslint-config-airbnb-base eslint-plugin-import`로 터미널에도 ESLint를 설치해준다.

제로초 블로그에서처럼 엉망인 코드를 작성해본다.

`/test.js`

```javascript
function add(a, b) {
  if (b) {
    b = 5;
  }
  return a + b;
}
```

그리고 터미널창에 `eslint {경로|파일명}`를 해주면 되는데

나같은 경우는 npx로 설정을 하였기 때문에 환경설정이 꼬여서 그런지 `eslint`명령어를 치니

`bash: eslint: command not found`오류가 떴다.

그래서 `npx eslint test.js`로 해줬더니 바로 실행이 됐다.

<img src="C:\Users\jlory\OneDrive\바탕 화면\블로그 자료\capture_eslint_test.png" style="zoom:80%;" />



#### ESLint 적용

①터미널 명령어로 적용하기:

`eslint {경로|파일명} --fix`

기본 확장자는 js이므로 확장자가 달라지면 `eslint {경로|파일명} --ext .jsx,.html`로 옵션을 붙여야 한다.

다른 확장자를 검사하기 전에는 해당 플러그인 설치 후 .eslintrc에 넣어주어야 한다.

②VSC로 실시간 적용하기

VSC를 재시작하고 오류가 있는 파일을 보면 해당 코드에 빨간 밑줄이 그어져 있고 커서가 있을 때 전구 아이콘이 옆에 나온다.

<img src="C:\Users\jlory\OneDrive\바탕 화면\블로그 자료\capture_eslint_test2.png" style="zoom:80%;" />

​	

그리고 마우스를 올리면 어떤 오류인지 구체적으로 나온다.

<img src="C:\Users\jlory\OneDrive\바탕 화면\블로그 자료\capture_eslint_test3.png" style="zoom:80%;" />

단축키 `ctrl .`를 사용하면 픽스되거나 해당 줄에 취해야할 행동이 주석으로 추가된다.



### 출처

- [prettier와 eslint설정]([https://medium.com/@simsimjae/prettier%EC%99%80-eslint%EC%84%A4%EC%A0%95%ED%95%98%EA%B8%B0-%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%84%A4%EC%A0%95-110dc8ab94b6](https://medium.com/@simsimjae/prettier와-eslint설정하기-타입스크립트-설정-110dc8ab94b6))
- [prettier와 eslint설정2]([https://velog.io/@jch9537/Project-achieve-Eslint-prettier-%EC%84%A4%EC%A0%95](https://velog.io/@jch9537/Project-achieve-Eslint-prettier-설정))
- [리액트 프로젝트에 ESLint와 Prettier 끼얹기](https://velog.io/@velopert/eslint-and-prettier-in-react)
- [프리티어 공식문서 옵션 설정](https://prettier.io/docs/en/options.html)
- [프리티어 ignore example](https://github.com/prettier/prettier/blob/master/.prettierignore)
- [prettier로 코딩스타일 통일하기](https://www.daleseo.com/js-prettier/)

- [제로초블로그 ESLint](https://www.zerocho.com/category/JavaScript/post/583231719a87ec001834a0f2)
- [ESLint 공식 문서 configuration](