<h1>jsonwebtoken</h1>

auth-token sprint를 하면서 jsonwebtoken moduel을 npm 에서 다운받아서 사용해야함을 알았다.

참고 :

⇒ [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

이거 꼭 참고 (차근차근 보면 될 듯)

⇒ [https://medium.com/sjk5766/jwt-json-web-token-소개-49e211c65b45](https://medium.com/sjk5766/jwt-json-web-token-%EC%86%8C%EA%B0%9C-49e211c65b45)

jsonwebtoken

# jsonwebtoken 모듈 사용법

1 npm install jsonwebtoken

2 jsonwebtoken을 사용할 tokenfunctions 디렉토리를 만들고 그 안에 index.js를 만들어서 이 index.js에
1. 엑세스토큰, 리프레쉬토큰생성
2. 엑세스토큰, 리프레쉬토큰 보내는
3.

sign() verity() 가 어떤 리턴값을 리턴하는 지 알아볼 것.


<h1>TokenFunctions해석</h1>

토큰을 generate함수로 받고, send함수로 보내는 구나..
