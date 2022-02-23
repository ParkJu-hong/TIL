콜백을 쓰지않고 어떻게 비동기코드를 깔끔하게 Promise로 처리할 수 있는지
비동기함수를 쓰는 것 자체가 콜백함수를 쓰겠다는 말이다. 왜냐하면...
어떤 함수든 간에 함수는 로직을 가지고있기 때문이다. 이제 무조건 비동기는 promise로 생각하자

비동기적인 작업을 수행하기 위해 콜백함수를 익명함수로 전달하는 과정에서 생기는 콜백 지옥을 Promise, Generator, async/await등을 사용해서 방지할 수 있다.

```js
axios
.get(url)
.then()

axios는 비동기처리가 되어있다치자

return new Promise((resolve, reject) => {
  비동기함수((error, result) => {
      if(error) reject(error);
      else resolve(result);
  });
})

이렇게 안써도 되지만 비동기코드 예를 들자면 이렇게 사용해도 된다.
return new Promise((resolve, reject) => {
    axios
    .get(url)
    .then(data)
    .catch((error) => {
      reject(error)
    })
})

```
