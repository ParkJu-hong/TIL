## 질문
import { 비동기함수 } from '비동기함수 쓰게해주는 모듈'


### Promise를 쓰기 전 고이사님이 해주신 코드
```js
function 함수1(callback){
  비동기함수(err, result){
    callback(err, result);
  }
}

function 함수2(callback){
  함수1(err, result)=>{
    if(err){
      callback(err);
    }else{
      callback(null, result);
    }
  }
}

function 메인함수(){
  함수2((error, result) => {
    if(error){
      console.error(error);
    }else{
      console.log(result);
      result
    }
  });
}
```
그니까 'Promise를 쓰기 전 고이사님이 해주신 코드'와 '내가 짠 코드'를 비교했을때
함수2에서 parameter를 콜백함수로 하나더 써줘서 콜백함수 argument(인자)에 변수를 하나
더 할당해준다.


### Promise를 쓰는 고이사님이 해주신 코드
```js
function 함수1(callback){
  비동기함수(err, result){
    callback(err, result);
  }
}
function 함수2(){
  return new Promise((resolve, reject)=>{
    함수1((err, result) => {
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  })
}
function 메인함수(){
  함수2()
  .then((data)=>console.log(data))
  .catch((error)=>console.error(error));
}
```

### 내가 전에 한 코드 1 (틀린코드)
```js
function 함수1(callback){
  비동기함수(err, result){
    callback(err, result);
  }
}
function 함수2(){
  let result;
  함수1((err, _result)=>{
    result = _result;
  });
  return result;
}
function 메인함수(){
  return 함수2();
}
```

### 내가 전에 한 코드 2 (틀린코드)
```js
function 함수1(callback){
  return 비동기함수(err, result){
    return callback(err, result);
  }
}
function 함수2(){
  let result;
  return 함수1((err, _result)=>{
    result = _result;
    return result;
  });
}
function 메인함수(){
  return 함수2();
}

이거는 리턴 값이 있을 것 같지만 없을 것이다.
리턴이 값이 있이 될 것 같지만 되지 않는다.

1. 메인함수에서 함수 2를 호출한다
2. 함수2에서 함수 1을 콜백함수를 인자로 넣고 호출한다.

저렇게 되면 함수 1에서는 비동기함수를 리턴하는 것임.

그니깐 저 함수들 안에 어디서든 return을 해도 거의 다 콜백이기 때문에
또한 비동기함수도 리턴을 했지만 비동기함수는 함수들을 가지고있는 모듈이기 때문에..
어디든 리턴을 해도 안된다.
```

그래서 간단한 방법
Promise를 사용하면 된다..! Promise는 리턴을 딜레이시켜주는 용도다.






```js
// Promise를 안 쓸 경우
function test(callback){
  비동기함수((error, result) => {
    callback(error, result)
  });
}

test((error, result)=>{
  if(error)console.error(error)
  else console.log(result);
});
```

```js
// Promise를 쓸 경우
function test(){
  return new Promise((resolve, reject) => {
    비동기함수((error, result) => {
      if(error) resolve(error);
      else reject(null, result)
    });
  });
};

test().
then(console.log).
catch(console.error)

```




ㅇㅈㅈㅇㅈ
