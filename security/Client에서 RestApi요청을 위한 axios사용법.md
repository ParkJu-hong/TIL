https://tuhbm.github.io/2019/03/21/axios/


<h1>GET</h1>
```js
const axios = require('axios');
function async () {
  return await axios.get(url);
  // 혹은
  return axios(url, {
    method: 'get',
    data: {
     foo: 'diary'
   }
  })
}
```
<h1>POST</h1>
```js
const axios = require('axios');
function async () {
  return await axios.post(url, {
    userId: 'bejejupark@gmail.com',
    password: '쉿'
  })

  // 혹은

  return await axios(url, {
    method: 'post',
    params: {
      userId: 'bejejupark@gmail.com',
      password: '쉿'
    }
  })
}
```


<!-- <h1>UPDATE</h1>
```js
const axios = require('axios');
function async () {
  await ax
}
```
<h1>DELETE</h1>
```js
const axios = require('axios');
function async () {
  await ax
}
``` -->



<h3>참고</h3>
axios cors에 관한 옵션에 대해
https://kosaf04pyh.tistory.com/152
