
<h1>유클리드 호제법 (최대공약수 구하는 법)</h1>


```jsx
function gcd(num1, num2){
    if(num1 < num2){
        let temp = num1;
        num1 = num2;
        num2 = temp;   
    }
    if(num1 % num2 === 0)return num2;

    return gcd(num2, num1 % num2);
}
```

유클리드 호제법은 mod연산을 반복하면 된다.

(mod연산은 두 값을 나눈 나머지를 구하는 연산)

마지막 계산에서 나누는 수로 사용된 것이 최대 공약수가 된다.

```jsx

// 내가 쓴 답

function gcd(num1, num2){
    if(num1 < num2){
        let temp = num1;
        num1 = num2;
        num2 = temp;   
    }
    if(num1 % num2 === 0)return num2;

    return gcd(num2, num1 % num2);
  }

function divideChocolateStick(M, N) {
  /*
  M : 아몬드 빼빼로, N : 누드 빼빼로

  output은 다음과 같아야함
  ==>> [빼빼로를 받게 되는 직원의 수, 나누어 주는 아몬드 빼빼로의 수, 나누어 주는 누드 빼빼로의 수]

  최대공약수를 구하고 최대공약수의 약수들을 구한다 그 약수들이 '빼빼로를 받게 되는 직원의 수'가 될 것
  그리고 그 약수들에 따라서 아몬드, 누드빼빼로 수가 달라질 것

  */

}
```

```jsx
// 정답

// 최대 공약수(유클리드 호제법: Euclidean algorithm)
function gcd(m, n) {
  if (m % n === 0) return n;
  return gcd(n, m % n);
}

function divideChocolateStick(M, N) {
  const result = [];
  // 최대공약수를 구한다.
  // M, N의 순서는 상관없다.
  const GCD = gcd(M, N);
  let temp = 0; //

  // 약수는 대칭적이므로 제곱근까지만 반복해도 된다.
  // 예) 36의 약수는 1, 2, 3, 4, 6, 9, 12, 18, 36이다.
  // 제곱근을 기준으로 양쪽의 값 하나씩 곱했을 때 36이 되기 때문에
  // 제곱근 보다 큰 약수는 제곱근보다 작은 약수에서 구할 수 있다.
  const sqrt = Math.floor(Math.sqrt(GCD));
  for (let left = 1; left <= sqrt; left++) {
    if (GCD % left === 0) {
      // 최대공약수의 약수인 경우 중 제곱근 보다 작은 약수의 경우
      result.push([left, M / left, N / left]);
      if (left * left < GCD) {
        // 제곱근이 아닌 경우(제곱근 보다 작은)
        right = GCD / left; // 최대 공약수를 제곱근이 아닌 수로 나누면 제곱근 보다 큰 약수를 구할 수 있다.
        result.push([right, M / right, N / right]);
      }
    }
  }

  // '빼빼로를 받게 되는 직원의 수'를 기준으로 오름차순으로 정렬
  result.sort((op1, op2) => op1[0] - op2[0]);

  return result;
}
```
