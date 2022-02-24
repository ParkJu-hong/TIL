passport 모듈 사용하는 법
https://www.youtube.com/watch?v=Qn48RgkUuaA

1. 인증
- 서비스내 직접 인증 기능 작성 (Local Auth)
- OAuth 2.0


passport, everyauth

npm install passport

passport 다루기 절차
### 1) 모듈 로딩과 초기화
```js
var passport = require('passport'); // 모듈 로딩
app.use(passport.initialize()); 		// 초기화
```
### 2) Strategy 설정
kakao, facebook, local strategy 등등이 있고 그 strategy중 무엇을 사용할지를
설정하면 된다.
```js
var Strategy = require('passport-strategy').Strategy;
passport.use(new Strategy((username, password, done)=>{
  // 사용자의 아이디와 패스워드를 가지고 인증을 해주는 기능을 구현해줘야하는 콜백함수
}))
```
### 3) 인증
passport와 Strategy을 이용해서 사용자 인증이 준비 됬다면..
authenticate라는 함수를 사용해서 인증에 대한 기능이 동작이 되도록 만들고,
결과를 어떻게 할 것인가 고민해야함
```js
app.post('/login', passport.authenticate("local"));
```
#### 인증성공시
성공메세지와 코드
성공페이지 이동(웹)

#### 인증실패시
실패 메세지와 코드
로그인 페이지(웹)


### 4) 세션 기록과 읽기 ** 인증정보 유지하기위해서 authorization
인증에 성공하면 세션을 통해서 사용자의 정보를 저장하고 읽어오는 그런 함수를 제공

```js
passport.serializeUser(function(user, done){}); // 로그인 성공했을때 호출됌
passport.deserializeUser(function(id, done){}); // 모든요청마다 호출됌
```

passport.authenticate 이후 세션기록 (serializeUser) // 로그인 성공했을때 호출됌
일반 요청마다 세션에서 읽기 (deserializeUser)

#### 세션에서 읽어온 데이터 => req.user
passport를 사용했을때만 req.user를 사용할 수 있다.



### 5) 사용자 정보





## Local auth

### 설치

 => npm install passport-local


### 모듈 로딩과 Strategy 로딩

 =>
  ```js
var Strategy = require('passport-local').Strategy;
```

### 인증

```js
var strategy = new LocalStrategy(OPTION, function(username, password, done){
  // 인증성공시
  done(null, USER_INFO);
  // 인증실패시

})
var strategy = new LocalStrategy(OPTION, 로컬인증을 위한 함수)
```
#### 옵션 =>
passReqCallback: 요청 객체(req)를 파라미터로 전달
usernameField, passwordField : 사용자 ID, PW에 해당하는 필드이름




### 사용자 인증 정보
```js
app.post('/login',
passport.authenticate('local', {
    //성공시, 메인페이지 이동
    //실패시 로그인 페이지 이동
    successRedirect: '/',
    failureRedirect: '/login'
}));
```
#### 폼
```js
<form method="post" action="/login">
ID : <input type="text" name="username"/>
PW : <input type="password" name="password"/>
</form>
```



## 인증기능 전체 코드

```js
var LocalStrategy = require('passport-local').Strategy;
var strategy = new LocalStrategy(function(username, password, done){
  if( username === 'username' && password === '1234'){
    // 인증성공시
    var userInfo = {name: 'user', email: 'use@mail.com'};
    return done(null, userInfo);
  }else{
    // 인증실패시
    done(null, false, { message: "Incorrect ID/PW"})
  }
});

// 패스포트에 사용하기
passport.use(strategy);
```
```js
app.post('/login',
passport.authenticate('local', {
    //성공시, 메인페이지 이동
    //실패시 로그인 페이지 이동
    successRedirect: '/',
    failureRedirect: '/login'
}, (err, user, info) => {
  // 여기서 이제 new LocalStrategy에 콜백함수로 들어간 인자 중 done의 인자가  passport.authenticate의
  // 세번째 인자인 콜백함수로 들어가게 됨
}));
```

```js
passport.serializeUser(function(user, done){
  done(null, user);
}); // 로그인 성공했을때 호출됌
passport.deserializeUser(function(id, done){
  done(null, user); // 여기 유저는 serializeUser에서 done으로 넘겨준 user임
}); // 모든요청마다 호출됌

passport.deserializeUser(function(id, done){
  var user = findUser(id); // DB에서 사용자 정보 찾기
  done(null, user); // 여기 유저는 serializeUser에서 done으로 넘겨준 user임
  // 이렇게 넘겨주면 deserializeUser에서 done으로 넘겨준 user을 req.user로 사용할 수 있다.
}); // 모든요청마다 호출됌
```


세션설정 해줘야함
```js
app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
app.use(passport.session());
```

ㅇㅁㄹ
















ㅇㄴㅇㅈㅇ
