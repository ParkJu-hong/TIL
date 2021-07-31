> 👨‍💻 오늘 공부한 것

오늘은 인접리스트를 인접행렬로 바꾸는 로직을 작성했다.

인접리스트를 인접행렬로 바꾸는 과정에서 
```js
function addVertex(){
    for(let i = 0; i < matrix.length; i++){
      matrix.push(0);
    }
    matrix.push(new Array(matrix.length + 1).fill(0));
  }
```
처음에 로직을 이렇게 구현해서 에러가 났었다.

for문안에 matrix로해서 push를 할 경우 다음 matrix가 

```js
0: 0
1: 0
2: 0
3: [0, 0, 0]
```

이렇게 된다. 각 property 마다 즉 vertex 마다 [0, 0, 0] 와 같이 인접행렬을 가져야하기 때문에 [i]를 붙여줘야한다.





```js
function 인접리스트를 인접행렬로 바꾸는 함수(insertEdges, removeEdges) {
  // 1. insertEdegs대로 최대버텍스의 수를 구하고 최대 버텍스 수만큼 adjacency List를 구하고
  // insertEdegse대로 adjacency List를 구성한다.
  // 2. removeEdges대로 위와 마찬가지로 adjacency List를 구성한다.
  // 3. insertEdegs로 만든 adjacency List와 removeEdges로 만든 adjacency List를 비교
  // 하여 만약 중복이 안되는 경우 새로운 adjacency List을 만들어 구성한다.
  // 4. 중복되는 vertex는 제외한 insertAdList를 만든다.
  let maxVertex = insertEdges.reduce((a, c) => {
    const bigger = Math.max(...c);
    if (bigger > a) return bigger;
    return a;
  }, 0);
  let insertAdList = {};
  let removeAdList = {};

  for (let i = 0; i <= maxVertex; i++) {
    insertAdList[i] = [];
    removeAdList[i] = [];
  }

  for (let i = 0; i < insertEdges.length; i++) {
    insertAdList[insertEdges[i][0]].push(insertEdges[i][1]);
    insertAdList[insertEdges[i][1]].push(insertEdges[i][0]);
  }

  for (let i = 0; i < removeEdges.length; i++) {
    removeAdList[removeEdges[i][0]].push(removeEdges[i][1]);
    removeAdList[removeEdges[i][1]].push(removeEdges[i][0]);
  }

  for (let i = 0; i < Object.keys(insertAdList).length; i++) {
    for (let vertex = 0; vertex < removeAdList[i].length; vertex++) {
      if (insertAdList[i].includes(removeAdList[i][vertex])) {
        insertAdList[i] = insertAdList[i].filter((el) => el !== removeAdList[i][vertex]);
      }
    }
  }


// 5. adjacency matrix를 만들 것임.
let matrix = [];
function addVertex(){
    for(let i = 0; i < matrix.length; i++){
      matrix[i].push(0);
    }
    matrix.push(new Array(matrix.length + 1).fill(0));
  }
for(let i = 0; i <= maxVertex; i++){
    addVertex();
}


for(let vertex = 0; vertex <= maxVertex; vertex++){
    for(let i = 0; i < insertAdList[vertex].length; i++){
        matrix[vertex][insertAdList[vertex][i]] = 1;
    }
}

    return matrix;
}

const insertEdges = [
  [0, 2],
  [2, 4],
  [1, 3],
  [2, 1],
];
const removeEdges = [
  [0, 3],
  [2, 1],
  [1, 0],
  [4, 2]
];

let output2 = 인접리스트를 인접행렬로 바꾸는 함수(insertEdges2, removeEdges2);

console.log(output2);
/**
 * [
 *  [0, 0, 1, 0, 0],
 *  [0, 0, 0, 1, 0],
 *  [1, 0, 0, 0, 0],
 *  [0, 1, 0, 0, 0],
 *  [0, 0, 0, 0, 0],
 * ]
 */
```
