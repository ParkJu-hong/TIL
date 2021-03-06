리액트 리덕스, 웹서버 (node.js) 이용해서 게시판 CRUD 만들 기 (TOY Project)

1. 당장 리액트 리덕스를 사용해서 개발할 수는 있겠으나, 생활코딩 리액트 리덕스를 마저 보고 하려한다.
<Provider>를 <App> 컴포넌트에 랩핑해주지 않으면 일일이 리덕스를 사용하기 위해 Presentation component와 Container Component 를 일일히 구현하고 설정해줘야하기 때문에 그런 불편을 느끼기위해 react hook을 사용하지 않고 순수 리덕스로 개발을 해왔지만 불편한 감이 없지 않아있다


2. 어떤 불편한 점이 있는 가 ?

2.1. 랩핑을 해주지 않은 상태에서의 리액트에서 리덕스를 쓰는 개발 환경

```jsx
// App.js
import React from 'react';
import { store } from './store.js';
import Post from './post.js';


export default App extends React.Component {

  store.subscribe(Post) // 이렇게 쓰면 안된다. 왜냐면 subscribe안에 들어가는 인자들은 함수여야 한다
                        // 리액트에서는 어련히 state값이 바뀌면 그 state를 쓰는 컴포넌트들은 재렌더링할 것임..!
  render(){
    return <Post />
  }
}
```

```jsx
// store.js
import {createStore} from 'redux';

const initialValue = {
    contents: [
      { id: 1,
        text: 'first'
      },
      { id: 2,
        text: 'second'
      },
      { id: 3,
        text: 'third'
      }
    ]
  }

const reducer = (state, action) => {
  if(state !== undefined) return initialValue;
  else if(action.type === 'CREATE'){

  }else if(action.type === 'READ'){
    return // immutable한 객체, 즉 그 전의 state와 데이터주소가 다른 값을 리턴할 것
  }else if(action.type === 'UPDATE'){
    return // immutable한 객체, 즉 그 전의 state와 데이터주소가 다른 값을 리턴할 것
  }else if(action.type === 'DELETE'){
    return // immutable한 객체, 즉 그 전의 state와 데이터주소가 다른 값을 리턴할 것
  }
}

const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );

 export default store;
```
```jsx
// post.jsx

import React, {Component} from 'react';
import { store } from ./store.js
// import 할때 중괄호를 쓰는 경우와 안쓰는 경우를 공부해서 구별해서 사용할 것

class Post extends Component{
  // componentDidUpdate()   // class Component에서 useEffect의 기능을 사용할 때 쓰는 것
  state = {...store.getState()};
  constructor(props){
    super(props),
    /*
    이건 리덕스없이 리액트에서 ES5문법으로 state를 사용하는 방식이다.
    this.state({
        contents: [
          { id: 1,
            text: 'first'
          },
          { id: 2,
            text: 'second'
          },
          { id: 3,
            text: 'third'
          }
        ]
      })
      */
      /*
      생활코딩은 다음 주석처리한 것과 같이 this.state()인자안에 바로 store.getState()를 박지 않았다.
      this.state(
        store.getState()
      )
      */

      store.subscribe(()=>{
        this.setState(state)
      }.bind(this))
  }

  let inputValue;

  render(){
    return (
        {state.contents.map((el) => <div key={el.id}>{el.text}</div>)}
        <input type='text' onChange={(e)=>{
            inputValue = e.target.value;
        }}></input>
        <button onClick={()=>{
            store.dispatch({
                type: 'CREATE',
                text: 'inputValue'  
            })
        }}></button>
      )
  }
}
```

2.2. 리액트에서 리덕스를 사용하며, 컴포넌트들을 랩핑해주기 위해, 즉 Presentation Component(wrapped component라고도 불림)와 Container Component(또한 Root Component라고도 불림)를 구분하기 위해 랩핑하는 작업

** 따로 Presentation 디렉토리와 Container 디렉토리를 생성하여 각자 디렉토리에 .jsx파일을 위치시켜 주도록 한다.

** 다음과 같이 코드를 작성하게 되면, Presentation Component인 /components/post.jsx를 함수형 프로그래밍의 철학(?)처럼 컴포넌트를 부품으로 사용할 수 있다. 랩핑하여 구분하지 않았을 때는 컴포넌트가 store에 종속이 되어있었기 때문에, store를 항상 고려하여 컴포넌트를 사용하여야했기 때문에 부품처럼 쉽게 사용하는 것이 어려운 감이 있었다. 하지만 store와 분리를 시켜서 컴포넌트에 props만 전달해주면 store를 고려하지않아도 렌더링할 수 있는 부품과 같은 컴포넌트가 되었다.

만약 store에 컴포넌트가 종속되어도 상관없는 경우, 즉 컴포넌트가 다른 곳에 쓰이지 않는 경우 굳이 랩핑을 안해줘도 상관없다. 뭐가 좋고 나쁘다의 개념이 아닌, 쓰임에 따라 다르게 센스있게 로직을 구현할 수 있어야한다.


```jsx
// App.js
import React from 'react';
import store from './store.js';
import Post from './containers/post';


export default App extends React.Component {

  store.subscribe(Post) // 이렇게 쓰면 안된다. 왜냐면 subscribe안에 들어가는 인자들은 함수여야 한다
                        // 리액트에서는 어련히 state값이 바뀌면 그 state를 쓰는 컴포넌트들은 재렌더링할 것임..!
  render(){
    return <Post />
  }
}
```

```jsx
// ./components/post.jsx

import React, {Component} from 'react';


class Post extends Component{
  componentDidUpdate()  // class Component에서 useEffect의 기능을 사용할 때 쓰는 것

  constructor(props){
    super(props)
  }

  let inputValue;

  render(){
    return (
        {this.props.contents.map((el) => <div key={el.id}>{el.text}</div>)}
        <input type='text' onChange={(e)=>{
            inputValue = e.target.value;
        }}></input>
        <button onClick={()=>{
          this.props.onClick(inputValue);
            store.dispatch({
                type: 'CREATE',
                text: 'inputValue'  
            })
        }}></button>
      )
  }
}
```
```jsx
// ./containers/post.jsx
import React, { Component } from 'react';
import store from '../store';
import Post from '../components/post';

export default class extends Component {
  state = {...store.getState()}
  // super()는 상속의 개념이다.
  constructor(props){
    super(props),
    store.subscribe(function(){
      this.setState(state)
    }.bind(this))
  }

  render(){
    return <Post onClick={(value)=>{
        store.dispatch({
          type: 'CREATE',
          text: value
        })
      }
    } contents={state}/>
  }
}
```

2.3. 최종적으로 불편한 점
: redux를 사용하여 컴포넌트를 구현할때마다 일일이 랩핑해주는 것이 불편한 점이다.





3. 리액트 리덕스
이러한 Wrapping을 도와주는 connect와 동시에 react가 redux를 위해 지원하는 useDispatch와 useSelector와 같은 hooks가 있는 반면, connect parameter를 통해 mapStateToProps, mapDispatchToProps 등의 메소드를 이용하는 방법이 있다.

1))) connect와 mapStateToProps, mapDispatchToProps
: 함수이름은 생활코딩에서 좀 더 직관적으로 재작명해준대로 적어봤다.

```jsx
import { connect } from 'react-redux';
connect(mapReduxStateToReactProps, mapReduxDispatchToReactProps)(Presentation Component)

function mapStateToProps(state){
  // 리턴값으로 객체를 리턴하는 데, 이때의 property name을 컴포넌트에 넣어줄 props 이름을 넣어
  // 주면 된다. 예를 들어 props의 이름이 text라면 다음과 같다.
  // 그렇게 된다면, Presentation Component에서 props를 사용할 수 있다.  
  // 강조하지만 이는 connect()를 쓰고 Wrapping을 할때 state값이나 어떠한 데이터든 컴포넌트의
  // props로 할당을 해서 사용하기 위함이다.
  return {
    text: 'Hello, world',
    value: state.value;
  }
}

function mapDispatchToProps(dispatch){
  // 이 함수는 props로 이벤트 함수를 전달해주기 위함이다. mapStateToProps와 동일하게 객체를
  // 리턴하고 그 객체의 property name은 props의 이름이다.

  // 대부분 리액트에서든 html과 같이
  // 사용하는 자바스크립트에서는 이벤트가 발생했을 경우 어떠한 데이터를 CRUD하게 되는데, 이때
  // 리덕스를 사용하는 경우 이벤트가 발생했을때 데이터를 CRUD할때 dispatch라는 함수에서 action
  // 을 만들어 어떤 조치를 취하여 state값을 바꿀 것인가 하는 것을 reducer에서 구현한다.

  // 그래서 이 함수는 그러한 이벤트를 위해 props에 함수를 전달해주는 역활을 한다.
  // 예를들어 onClick이란 props에 함수를 줄경우는 다음과 같다.

  return {
    onClick : function(liftedState){
      // liftedState은 stateLifting(state끌어올리기) 즉, 자식컴포넌트에서 부모컴포넌트에
      // 어떠한 값을 전달하고 싶을때 이벤트가 발생했을 경우 자식컴포넌트의 props에 부모컴포넌트에서
      // 함수를 전달하고 그 함수주소에 전달하고싶은 데이터를 인자로 넣어주게되면, 부모컴포넌트에서
      // props로 전달한 함수를 사용할때 매개변수로 자식컴포넌트에서 넘겨준 데이터를 사용할 수
      // 있게된다.

      dispatch({
          type: 'ThisIsActionType',
          payload: {
            value: liftedState
          }
      })
    }
  }
}
```


2))) useDispatch와 useSelector을 사용하여 리액트 리덕스 사용하는 예제
```jsx
// npm으로 react-redux을 install받고 우선 useDispatch와 useSelector을 'react-redux'로
// 부터 import를 해온다.

import { useDispatch, useSelector } from 'react-redux';

```

<strong>useDispatch</strong>
store.dispatch()는 리덕스에서 action을 reducer에 전달하는 역활을 한다. 여기서도 마찬가지로 action을 보내야한다.

다음과 같이 사용한다면 <Provider>로 감싸져있는 컴포넌트내에서

```jsx
const dispatch = useDispatch();

const 이벤트함수 = (e) => {
  dispatch({
      type: 'ADD_TEXT',
      text: e.target.value
  })
}
```

이렇게 사용하여 각 컴포넌트내에서 일일이 store를 import해와서 store.dispatch()를 쓸 필요가 없어졌다.

하지만 connect와는 다르게 컴포넌트를 Wrapping하지 않으므로 컴포넌트 부품화를 하지못한다는 단점이 있다. 하지만 앞서 말했듯이 굳이 필요하지 않다면 쓰지 않아도 괜찮다. 좋고 나쁨의 문제가 아니고, 그저 쓰임새에 따라 다르게 사용하면 되는 것이다.


<strong>useSelector</strong>
useSelector store에서 state을 가져오는 역활을 한다. 코드는 다음과 같다.

```jsx
const state = useSelector((state) => state.reducer.contents);

render(){
  return {state.map((el) => <자식 컴포넌트 key={el.id} text={el.text}>)}
}
```

useSelector의 첫번째이자 마지막인자의 콜백함수의 매개변수가 state를 받아오기로 약속되어있는데, 왜 reducer를 거쳐서 state를 사용하는 것일까?

만약 combineReducers를 사용할경우 즉, reducer가 여러개인 경우 그에따른 reducer를 거쳐 state를 조회해야 할 것 이다.

** 하지만 Reducer를 하나만 사용하는 경우 useSelector(state를 조회하는 기능)의 사용방법은 다음과 같다.

```jsx

const state = useSelector(state => state);

```


<hr>
<br>

<h3>package.json</h3>
<br>
package.json의 devDependencies안에는 프로그램 실행과 관계없는 오로지 개발을 위해 필요한
dependency(의존성 모듈)의 이름들(속성 이름)과 버전(속성 값)이 명시된다.
```js
$ npm install mocha --save-dev
```
이는 자동으로 devDependencies에 추가되도록 해준다.


package.json의 dependency는 devDependencies와는 다르게, 이 프로젝트가 돌아가기 위해 반드시 필요한 모듈들이 무엇인지가 적혀 있다.

<h4>꿀팁</h4>
개발을 할때 package.json에 이러한 개발툴을 사용한다고 명시해야 협업시 원할할 수 있는 데, 이때
package.json에 자동으로 추가할 수 있는 명령어가 있다. npm install을 해서 필요한 모듈을 다운받을
때 옵션을 추가해주면 된다.
```js
npm install --save react

// 사실 생략해줘도 옵션을 생략해줘도 가능..
```

우리가 흔히하는 npm install은 package.json에 있는 dependency(의존성 모듈)를 바탕으로 설치한다.

// 근데 방금 react-redux와 redux를 npm install을 하니 devDependencies가 아닌
// dependencies에 들어갔다. 이들은 의존성모듈이라는 것 같다.
