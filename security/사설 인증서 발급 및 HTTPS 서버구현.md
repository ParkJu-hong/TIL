<h1>목표</h1>
<h2>로컬 환경(localhost)에서 인증서를 생성하고, 인증서를 이용해 HTTPS 서버를 구현</h2>

mkcert라는 프로그램을 이용해 로컬 환경에서 신뢰할 수 있는 인증서를 만들 수 있다.
$ brew install mkcert

로컬 환경을 인증된 발급기관으로 추가하기 위한 명령어
$ mkcert -install

로컬 환경에 대한 인증서를 만들기 위한 명령어
$ mkcert -key-file key.pem -cert-file cert.pem localhost 127.0.0.1 ::1

<h3>node.js https 모듈 사용</h3>
```js
const https = require('https');
const fs = require('fs');

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    function (req, res) {
      res.write('Congrats! You made https server now :)');
      res.end();
    }
  )
  .listen(3001);
```
<h3>express.js 이용</h3>
```js
const https = require('https');
const fs = require('fs');
const express = require('express');

const app = express();

https
  .createServer(
    {
      key: fs.readFileSync(__dirname + '/key.pem', 'utf-8'),
      cert: fs.readFileSync(__dirname + '/cert.pem', 'utf-8'),
    },
    app.use('/', (req, res) => {
      res.send('Congrats! You made https server now :)');
    })
  )
  .listen(3001);
```
