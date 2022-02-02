1. initialState를 설정한다
2. reducer를 작성한다.
3. store를 만들고 Provider로 App을 containning한다
4. useSelector로 state를 가져와쓰고, useDispatch로 액션을 인자로 리듀서를 호출시킨다.
(auto subscribe됌!)

npx create-react-app [프로젝트 이름] --template typescript
// 리덕스 쓰기위함
$ npm install redux react-redux @types/react-redux

## 1. 리덕스 모듈 작성 src/modules/_______.ts
  이 모듈에는 다음과 같은 내용들이 들어간다

  ```ts
  // 액션 타입을 선언합니다
  // 뒤에 as const 를 붙여줌으로써 나중에 액션 객체를 만들게 action.type 의 값을 추론하는 과정에서
  // action.type 이 string 으로 추론되지 않고 'counter/INCREASE' 와 같이 실제 문자열 값으로 추론 되도록 해줍니다.
  const INCREASE = 'counter/INCREASE' as const;
  const DECREASE = 'counter/DECREASE' as const;
  const INCREASE_BY = 'counter/INCREASE_BY' as const;

  // 액션 생성함수를 선언합니다
  export const increase = () => ({
    type: INCREASE
  });

  export const decrease = () => ({
    type: DECREASE
  });

  export const increaseBy = (diff: number) => ({
    type: INCREASE_BY,
    // 액션에 부가적으로 필요한 값을 payload 라는 이름으로 통일합니다
    // 이는 FSA (https://github.com/redux-utilities/flux-standard-action) 라는 규칙인데
    // 이 규칙을 적용하면 액션들이 모두 비슷한 구조로 이루어져있게 되어 추후 다룰 때도 편하고
    // 읽기 쉽고, 액션 구조를 일반화함으로써 액션에 관련돤 라이브러리를 사용 할 수 있게 해줍니다.
    // 다만, 무조건 꼭 따를 필요는 없습니다.
    payload: diff
  });

  // 모든 액션 겍체들에 대한 타입을 준비해줍니다.
  // ReturnType<typeof _____> 는 특정 함수의 반환값을 추론해줍니다
  // 상단부에서 액션타입을 선언 할 떄 as const 를 하지 않으면 이 부분이 제대로 작동하지 않습니다.
  type CounterAction =
    | ReturnType<typeof increase>
    | ReturnType<typeof decrease>
    | ReturnType<typeof increaseBy>;

  // 이 리덕스 모듈에서 관리 할 상태의 타입을 선언합니다
  type CounterState = {
    count: number;
  };

  // 초기상태를 선언합니다.
  const initialState: CounterState = {
    count: 0
  };

  // 리듀서를 작성합니다.
  // 리듀서에서는 state 와 함수의 반환값이 일치하도록 작성하세요.
  // 액션에서는 우리가 방금 만든 CounterAction 을 타입으로 설정합니다.
  function counter(
    state: CounterState = initialState,
    action: CounterAction
  ): CounterState {
    switch (action.type) {
      case INCREASE: // case 라고 입력하고 Ctrl + Space 를 누르면 어떤 종류의 action.type들이 있는지 확인 할 수 있습니다.
        return { count: state.count + 1 };
      case DECREASE:
        return { count: state.count - 1 };
      case INCREASE_BY:
        return { count: state.count + action.payload };
      default:
        return state;
    }
  }

  export default counter;
  ```
## 2. 프로젝트에 리덕스 적용하기 src/modules/index.ts
```ts
import { combineReducers } from 'redux';
import counter from './counter';

const rootReducer = combineReducers({
  counter
});

// 루트 리듀서를 내보내주세요.
export default rootReducer;

// 루트 리듀서의 반환값를 유추해줍니다
// 추후 이 타입을 컨테이너 컴포넌트에서 불러와서 사용해야 하므로 내보내줍니다.
export type RootState = ReturnType<typeof rootReducer>;
```

## 3. src/index.ts에 리덕스 store등 적용하기
```ts
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

## 4. 프리젠테이셔널 컴포넌트 만들기 src/components 에 만들 것
```ts
import React from 'react';

type CounterProps {
  count: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onIncreaseBy: (diff: number) => void;
}

function Counter({
  count,
  onIncrease,
  onDecrease,
  onIncreaseBy
}: CounterProps) {
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
      <button onClick={() => onIncreaseBy(5)}>+5</button>
    </div>
  );
}

export default Counter;
```

## 5. 컨테이너 컴포넌트 만들기 src/containers/_______.tsx
```ts
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../modules';
import { increase, decrease, increaseBy } from '../modules/counter';
import Counter from '../components/Counter';

function CounterContainer () => {
  // 상태를 조회합니다. 상태를 조회 할 때에는 state 의 타입을 RootState 로 지정해야합니다.
  const count = useSelector((state: RootState) => state.counter.count);
  const dispatch = useDispatch(); // 디스패치 함수를 가져옵니다

  // 각 액션들을 디스패치하는 함수들을 만들어줍니다
  const onIncrease = () => {
    dispatch(increase());
  };

  const onDecrease = () => {
    dispatch(decrease());
  };

  const onIncreaseBy = (diff: number) => {
    dispatch(increaseBy(diff));
  };

  return (
    <Counter
      count={count}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onIncreaseBy={onIncreaseBy}
    />
  );
};

export default CounterContainer;
```
