<h1>Permutation</h1>

순열은 조합과 다르게 요소가 겹칠 지라도 순서가 다르면 다른 값으로 판단한다.

<h2>nPr = n! / (n - r)!</h2>

<h1>1. </h1>

input ==>> 'jjump'
output ==>> ['', 'j', 'jm', 'jmp', 'jmpu', 'jmu', 'jp', 'jpu', 'ju', 'm', 'mp', 'mpu', 'mu', 'p', 'pu', 'u']

이를 풀기위해 순열을 사용할 것이다.

첫번째로 input은 항상 문자열이니 정렬하여 배열로 만들고, 만든배열의 요소들이 중복되지 않도록 다시 filter해준다

그리고 재귀를 사용하여, 순회를 다 돌도록하는데, 이때 base case(더이상 나눠지지 않는)와 recursive case를
잘 고려하도록 한다.

base case는 더 이상 나눠지지 않는, idx가 중복제외하고 정렬한 문자열의 길이와 같을 경우 최종리턴할 배열에
push한다.


```js
const powerSet = function (str) {

  const sorted = str.split('').sort();


  const deduplicated = sorted.reduce((acc, item) => {
    if (acc[acc.length - 1] === item) {
      return acc;
    } else {
      return acc.concat(item);
    }
  });

  let subSets = [];
  const _temp = (idx, subset) => {
    // base case
    if (idx === deduplicated.length) {
      subSets.push(subset);
      return;
    }

    _temp(idx + 1, subset);

    _temp(idx + 1, subset + deduplicated[idx]);
  };

  _temp(0, '');

  return subSets.sort();
};
```

![Permutation](https://user-images.githubusercontent.com/78221368/128029239-977b476a-b89f-42ae-9151-fd08012255a1.jpeg)

이런식으로 재귀를 하나하나 곱씹어보았다. 좋은 방법인 듯하다.


<h1>2. </h1>
# 중복순열

```jsx
순열
// 순열 노가다
function getPermutation(arr, n = 3){
    let result = [];
    for(let i = 0; i < arr.length; i++){
        let temp = [];
        for(let j = 1; j < arr.length; j++){
            for(let k = 2; k < arr.length; k++){
                // 중복 배제
                if(i === j || j === k || k === i) continue;
                result.push([arr[i], arr[j], arr[k]]);
            }
        }
    }
    return result;
}

// 순열 재귀코드보고 해본 것
/*
 tempArr에 concat으로 값이 안들어감
 "해결함" 예를들어
 let temp = [];
 temp.concat(1);
 // expected output => [1]
 하지만 이걸 어디에 안넣어주고 다시 temp을 하게되면
 console.log(temp) // => []

 즉 concat은 깊은 복사를 해준다.

*/
function rockPaperScissors (rounds) {
  // 순열사용
  // nPr = n! / (n - r)!

  // 횟수가 등록이 안되있다면 rps에서 3개의 배열요소를 다 쓰는 것으로 할 것
  rounds = rounds || 3;
  // 최종결과 배열
  let result = [];
  // 가위바위보 배열
  let rps = ["rock", "paper", "scissors"];

  let tempArr = [];

  let permutate = (roundToGo, currentValue) => {
    // base case
    if(roundToGo === 0) {
      result.push(currentValue);
      return;
    }

    for(let i = 0; i < rps.length; i++){
      tempArr.concat(rps[i]);
      let temp = permutate(roundToGo - 1, tempArr);
    }
  }

  permutate(rounds, []);

  return result;

};
debugger
rockPaperScissors()

// 순열 최종
function rockPaperScissors (rounds) {
  // 순열 nPr을 사용
  // nPr = n! / (n - r)!

  rounds = rounds || 3;
  const rps = ['rock', 'paper', 'scissors'];
  let result = [];

  const permutate = function(roundsToGo, currentArr){
    if(roundsToGo === 0){
      result.push(currentArr);
      return;
    }

    for(let i = 0; i < rps.length; i++){
      permutate(roundsToGo - 1, currentArr.concat(rps[i]));
    }
  }

  permutate(rounds, []);

  return result;
};
```

# 순열

```jsx
// 첫번째 시도
// 다 되는데 테스트 통과가 안됌 레퍼런스 보고 다시공부 함

function newChickenRecipe(stuffArr, choiceNum) {
  /*
    "순열을 하는 이유는 재료의 순서에 따라 맛이 달라지기 때문에 다른 레시피로 간주한다"
    1. 비밀소스는 nPm로 순열을 했을때 경우의 수 중 단 하나이다.
    2. 0이 3개 이상인 재료는 상한재료이므로 제외함

    ==>> '비밀의 승승장구 치킨 소스'가 될 수 있는 경우의 수를 모두 반환
  */

  for(let item of stuffArr){
    let stringItem = String(item).split('');
    let checkForTrash = [false, false, false];
    for(let i = 0; i < stringItem.length; i++){
      if(stringItem[i] === '0' && stringItem[i + 1] === '0' && stringItem[i + 2] === '0'){
        return [];
        }
    }
  }

  let result = [];

  let permutate = function(rounds, tempArr){
    if(rounds === 0){
      result.push(tempArr);
      return;
    }

    for(let i = 0; i < stuffArr.length; i++){
      if(!tempArr.includes(stuffArr[i]))permutate(rounds - 1, tempArr.concat(stuffArr[i]));
    }
  }

  permutate(choiceNum, []);
  return result;
}

```

```jsx
// 레퍼런스 참고하여 내가 짠 코드

function newChickenRecipe(stuffArr, choiceNum) {
  /*
    1. 0이 3개 이상인 상한 재료들을 구하는 함수
    2. 그 상한재료들을 제외하고 choiceNum이 stuffArr.length보다 많을 경우 빈배열 리턴
    3. 그 후 중복되지않는 순열함수 구현할 것
  */
  let freshArr = [];
  let result = [];

  for(let i = 0; i < stuffArr.length; i++){
    let howManyZero = String(stuffArr[i]).split('').filter((el) => el === '0');
    if(howManyZero.length <= 2) {
      freshArr.push(stuffArr[i]);
    }
  }

  if (freshArr.length === 0 || freshArr.length < choiceNum) return [];

  const permutate = function(_choiceNum, pushForResultArr){
    if(_choiceNum === 0){
      result.push(pushForResultArr);
      return;
    }

    for(let i = 0; i < freshArr.length; i++){
      if(!pushForResultArr.includes(freshArr[i])){
              permutate(_choiceNum - 1, pushForResultArr.concat(freshArr[i]));
      }
    }
  }

  permutate(choiceNum, []);

  return result;
}

```
