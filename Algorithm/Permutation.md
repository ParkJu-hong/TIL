Permutation

1. input ==>> 'jjump'
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
