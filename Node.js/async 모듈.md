참고자료 => https://proinlab.com/archives/1811

npm i async

## async.series

```js
const async = require('async');
testController: (req, res) =>{
    // yarn workspace server add async
    let tasks = [
        function(callback){
            console.log('one', new Date());
            setTimeout(function(){
                console.log('one 완료', new Date());
                callback(new Error('테스트 오류'));
                // callback(null, 'one-1', 'one-2');
            },500);
        },
        function(callback){
            console.log('two', new Date());
            setTimeout(function(){
                console.log('two 완료', new Date());
                callback(null, 'two');
            }, 2000);
        }
    ];// 다음진행내역을 캔슬하고 빠져나올 수 도 있음.
    async.series(tasks, (err, result) => {
        if(err){
            console.error(err);
        }
        console.log(result);
    });
    res.json({result: 'OK'})
}
```

다음과 같은 코드에서 async.series가 없으면 (1)과 같이 출력될 것이다.
(1)
'one'
'two'
'one 완료'
'two 완료'
[ [ 'one-1', 'one-2' ], 'two' ]

그치만.. async.series를 사용해서 (2)와 같이 출력될 것이다.
(2)
[0] one 2022-02-23T06:17:39.037Z
[0] one 완료 2022-02-23T06:17:39.552Z
[0] two 2022-02-23T06:17:39.552Z
[0] two 완료 2022-02-23T06:17:41.555Z
[0] [ [ 'one-1', 'one-2' ], 'two' ]


async.series가 비동기함수가 다 끝날때까지 기다려주는 것이다.
series 함수는 비동기 함수들을 순차적으로 실행하도록 도와주는 함수이다.



## async.waterfall(작업리스트, 완료)
waterfall 함수는 series와 같이 비동기함수를 순차적으로 실행하지만 각 작업의 결과를 다음 작업으로 넘겨줄 수 있다.


























ㄴㅇㅇㅈ
