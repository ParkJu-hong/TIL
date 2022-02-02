참고
https://www.kenrhee.com/blog/getting-started-with-typescript-with-react

https://react.vlpt.us/using-typescript/

공식문서 https://create-react-app.dev/docs/adding-typescript/

# 시작
npx create-react-app {프로젝트 이름} --template typescript


// 기존 react프로젝트에 typescript를 추가할 경우
1. npm install --save typescript @types/node @types/react @types/react-dom @types/jest

2. 다음으로 모든 파일의 이름을 TypeScript 파일로 변경하고(예: ) 개발 서버를 다시 시작src/index.js 하십시오 !src/index.tsx



```ts
type Person = {
  name: string;
  age?: number; // 물음표가 들어갔다는 것은, 설정을 해도 되고 안해도 되는 값이라는 것을 의미합니다.
};

// & 는 Intersection 으로서 두개 이상의 타입들을 합쳐줍니다.
// 참고: https://www.typescriptlang.org/docs/handbook/advanced-types.html#intersection-types
type Developer = Person & {
  skills: string[];
};

const person: Person = {
  name: '김사람'
};

const expert: Developer = {
  name: '김개발',
  skills: ['javascript', 'react']
};

type People = Person[]; // Person[] 를 이제 앞으로 People 이라는 타입으로 사용 할 수 있습니다.
const people: People = [person, expert];

type Color = 'red' | 'orange' | 'yellow';
const color: Color = 'red';
const colors: Color[] = ['red', 'orange'];

```

Generics
어떤 값이 들어올지 타입유추를 할 수 없을때 사용한다.
```ts
function merge<A, B>(a: A, b: B): A & B {
  return {
    ...a,
    ...b
  };
}

const merged = merge({ foo: 1 }, { bar: 1 });
```

```ts
function wrap<T>(param: T) {
  return {
    param
  }
}

const wrapped = wrap(10);
```

```ts
type Items<T> = {
  list: T[];
};

const items: Items<string> = {
  list: ['a', 'b', 'c']
};
```
```ts
class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
queue.enqueue(4);
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
console.log(queue.dequeue());
```

# 다시 리액트 타입스크립트

React.FC를 사용할때의컴포넌트 선언과 props 선언(지양)
```ts
import React from 'react';

type GreetingsProps = {
  name: string;
};

const Greetings: React.FC<GreetingsProps> = ({ name }) => (
  <div>Hello, {name}</div>
);

export default Greetings;
```

(지향)
```ts
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
};

const Greetings = ({ name, mark }: GreetingsProps) => (
  <div>
    Hello, {name} {mark}
  </div>
);
/*
    function Greetings({ name, mark }: GreetingsProps) {
  return (
    <div>
      Hello, {name} {mark}
    </div>
  );
}
*/

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```

## 함수를 type으로 지정하는 예제

```ts
import React from 'react';

type GreetingsProps = {
  name: string;
  mark: string;
  optional?: string;
  onClick: (name: string) => void; // 아무것도 리턴하지 않는다는 함수를 의미합니다.
};

function Greetings({ name, mark, optional, onClick }: GreetingsProps) {
  const handleClick = () => onClick(name);
  return (
    <div>
      Hello, {name} {mark}
      {optional && <p>{optional}</p>}
      <div>
        <button onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
}

Greetings.defaultProps = {
  mark: '!'
};

export default Greetings;
```
