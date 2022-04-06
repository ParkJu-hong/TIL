```js
app.use(express.static(path.join(__dirname, 'html')));
```

express.static은 정적파일들이 있는 위치를 지정하는 부분이다.
정적파일을 제공하기위해 코드를 넣었다고 일단 이해할 것
정적파일 => 이미지, 동영상, html, css, js, 파일 etc..

node.js 환경에서 디렉토리 주소다룰 때는 path모듈을 사용할 것
=> 맥(\와 /는 맥, 리눅스, 윈도우 OS에 따라 다릅니다)
.. 가 있을 경우 상위폴더도 알아서 계산해서 해당주소를 표시해줌
```js
const path = require('path');
path.join('example', 'children', 'file1.js'); // 'example/children/file1.js'
path.join('example', 'children', '..', 'file2.js'); // 'example/file2.js'
path.join('example', 'children', 'grandson', '..', '..', 'file3.js'); // 'example/file3.js'
```


## 에러발생시
```js
const express = require('express');
const app = express();

app.use((req, res, next)=>{
    console.log("Hello world");
    next();
    // 만약 에러발생할 경우 next함수에 error객체를 인자로 할당해줄 것
    next(error)
})
```

## REST API 사용법

### req.params 사용법
HTTP GET '/user/Zero'
```js
router.get('/user/:name', (req, res) => {
  res.json({ name: req.params.name });
});
```

### method-override
put, patch, delete 메소드를 사용하려면 method-override 패키지를 사용해야한다.

```js
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
// ...
app.use(methodOverride()); // PUT, DELETE를 지원 안 하는 클라이언트를 위해
app.use(bodyParser.json()); // body의 데이터를 json형식으로 받음
app.use(bodyParser.urlencoded({ extended: true })); // qs모듈로 쿼리스트링 파싱
```

#### update

```js
// HTTP PATCH '/change/Zero/name/Nero'
router.patch('/change/:name/name/:new', (req, res) => {
  User.update({
    name: req.params.name,
  }, {
    name: req.params.new,
  }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});
```

#### delete

```js
// HTTP DELETE '/user/Nero'
router.delete('/user/:name', (req, res) => {
  User.remove({ name: req.params.name }, (err, result) => {
    if (err) {
      return next(err);
    }
    res.json(result);
  });
});
```
















ㄴ
