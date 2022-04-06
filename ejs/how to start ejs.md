주소참고
=>
https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application




1. ejs사용할 프로젝트 폴더생성
2. npm init -y
3. npm install express@4.17.1
4. npm install ejs@3.1.6

5. server.ejs

```js
var express = require('express');
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});

// about page
app.get('/about', function(req, res) {
  res.render('pages/about');
});

app.listen(8080);
console.log('Server is listening on port 8080');
```

6. 서버는 다음과 같이 node.js 문법대로 짜면되고, ejs도 리액트와 마찬가지로 컴포넌트 디자인패턴을 사용하는 데,
digitalocean.com 에서는 views/partials 이라는 폴더, 경로를 만들어서 partials에 부분적으로 컴포넌트화 시킨 후
다음과 같은 방식으로 합친다.

```ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <%- include('../partials/head'); %>
</head>
<body class="container">

<header>
  <%- include('../partials/header'); %>
</header>

<main>
  <div class="jumbotron">
    <h1>This is great</h1>
    <p>Welcome to templating using EJS</p>
  </div>
</main>

<footer>
  <%- include('../partials/footer'); %>
</footer>

</body>
</html>
```
