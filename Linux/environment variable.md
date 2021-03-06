<h3>환경변수란?</h3>

자바스크립트나 여느 프로그래밍언어에서는 전역변수와 지역변수같은 개념이 있어서 sideEffect를 방지할
수 도 혹은 그 개념들을 이용하여 조금 더 편리하게 개발을 할 수 있게됐다.

이렇듯 OS 시스템자체에 저장하는 변수를 환경변수라고 한다.

<h2>왜 환경변수를 사용할까?</h2>
: 개발자가 개발을 하면서 개인이 API key를 가져와서 개발할때 사용했다고 치자, 이때 배포할때 그대로 개인 API key를 써버리게 되면 프로그래밍이 제대로 동작하지 않을 것이다. 개인 API key는 서버요청이 대부분 한정되어 있기 때문이다.

이때 환경변수에 자신 개인의 API key를 저장해놓고 개발할때는 프로그래밍코드에서 쓰고, 배포할때는 기업용 API key를 쓰는 경우도 있다.

그럼 왜 굳이 환경변수에 저장해놓는가? 바로 fecth와 같은 경우 인자값으로 API key를 할당해줘도 될 텐데..
이는 API key를 프로그래밍 코드에 그대로 노출될 수 있기 때문이다. 그래서 환경변수에 저장해놓고 사용하는 방법이 있다. 결국 보안문제인 것 이다.

<h3>환경변수 조회 및 저장방법</h3>
: 터미널에 "export" 라고 치면 다음과 같은 결과가 나온다.
<h4>환경변수 조회</h4>

![export](./screens/export.png)

<br>
<h4>환경변수 저장</h4>
<strong>``export 변수이름=할당할 값``</strong>

![export](./screens/isGood.png)



<br>
<strong>.env파일에 저장하는 방법</strong>
1) .env 파일을 만든다.
2) 스코프(let, var, const)를 사용하지 않고 변수(환경변수)에 할당하고 싶은 값을 할당한다.
``변수이름 = 할당할 값``


<br>
<h3>dotenv 환경변수 사용방법</h3>
1) 환경변수를 사용할 폴더에 npm init으로 npm 을 사용할 수 있도록 하고, npm install을 한다.
2) ``console.log(process.env)``를 입력하면 node.js로 실행시 환경변수를 객체로 받아볼 수있다.
3) 모듈 dotenv를 이용하면 .env 파일에 저장한 환경변수를 사용할 수 있다.

```js
const dotenv = require("dotenv");
dotenv.config();
console.log(process.env.env파일에서 저장한 변수이름);
```


<h4>process.env란?</h4>
Node.js에서 환경변수에 접근할 때는 <strong>process.env</strong>라는 내장 자바스크립트 객체를 사용함.
process는 전역 객체이기 때문에 별도의 import가 필요없음. 


터미널에서의 env명령어
env ==>> 환경변수 조희
env NAME=VALUE ==>> 환경변수의 생성
env -u NAME ==>> 환경변수의 삭제
env NODE_EMV=production 또는 development
