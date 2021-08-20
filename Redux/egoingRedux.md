
## 리액트 리덕스 생활코딩 강좌를 들었다.


#### 1. 수업소개

리덕스를 쓰는 이유
: 리덕스를 쓰지않으면 리액트에서는 컴포넌트들끼리 state lifting 혹은 props를 이용해 꽤나 복잡한 로직이 형성될 것이다. 하지만 리액트에서 리덕스를 사용한다면 부모컴포넌트에서 자식컴포넌트로 일일이 props를 내려보낼 필요없이 리덕스의 store에서 state를 관리하여 필요할때 꺼내쓸 수 있다.

순수 자바스크립트언어에서도 리덕스를 물론 사용가능한데, 
이도 마찬가지로 전역변수를 선언하거나, 함수안의 지역변수를 선언해서 다양한 로직에 사용하기위해 변수이름을 정하고 그럴 필요없이 리덕스를 사용하면 필요할때 전역이나 지역에서 리덕스의 store에서 state를 꺼내 쓸 수 있게되어 편할 것이다.

핫 리로드(리덕스 시간여행)




#### 3.1. redux없는 react 컴포넌트 구조 만들기

루트파일 === 리액트에서는 create-react-app 을 했을때 index.js 이다
// expect output ==>> true


div {
 border: 5px solid red;
 margin: 10px;
 padding: 10px;
}

ES5
class App extends Component {
 this.constructor(){
  this.state()
 }
 render(){
  return(
    <div>{this.props.number}</div>
  )
 }
}

ES6
functoin App(){
return(

 )
}
<br><br>



#### 3.2. redux없는 react 컴포넌트 구조 만들기

컴포넌트를 만들고 App의 자식컴포넌트로 위치시키며 렌더링을 하기위해 컴포넌트 구조를 완성했다.

이번 시간에는 이벤트와 props로직을 구현해 이벤트로인해 자식컴포넌트와 부모컴포넌트가 props를 주고받고 state 끌어올리기, State Lifting을 하면서 동적인 코드를 구현해 볼 것임.



#### 4. Redux를 도입
1. store.js를 만들고
 import {createStore} from 'redux';
 
 export default createStore(function(state, action){
    return state;
  })

그 후 리덕스의 store를 쓰고싶은 곳에 
import store from './store'; 함


redux devtools 활성화 시키기
const store = createStore(
   reducer, /* preloadedState, */
+  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
 );
 store.getState()
리액트 hooks를 쓰면 

let state = useSelector(state => state.리듀서함수)

constructor(props){
 super(props);
 store.subscribe(function(){
   this.setState({store.getState().number});
 }.bind(this))
}

*** class component를 쓸때 props랑 state를 어떻게 써야하나 ?

state = {size: 1}; // render 바깥에서

this.setState({});
this.state.size;



#### 5.1.react 컴포넌트에서 redux에 종속된 기능을 제거

이전 store를 쓰기 전에는 props를 state로 전달하기 위해선 이벤트로인한 state를 부모컴포넌트에 끌어올리는 것도 생각해야했고, 부모컴포넌트에서 자식컴포넌트로 props를 전달하기위해 컴포넌트 구조도 생각해야했다. 하지만 리덕스를 쓰고 나선 그 번거로움이 해결됐다.

하지만 리덕스를 씀으로써 컴포넌트가 부품으로써 역활을 하지 못하게됐다. 즉 리덕스를 적용시킨 컴포넌트를 다른 어플리케이션에서 불가능해졌다. 같은 store를 사용해야하기때문
reducer의 로직도 비슷해야하고 그런 문제때문


** 방법은 랩핑하는 것
프리젠테이셔널 컴포넌트, 컨테이너 컴포넌트(랩핑해주는)
Presentational Component, Container Component

컨테이너 폴더와 컴포넌트 폴더를 각각 만들어서
컨테이너에는 Container Component를 컴포넌트 폴더에는
Presentational Component를 하여 직관적으로 보기 편하게 정리해줄 것!


**컨테이너 컴포넌트)
import 프리젠테이셔널 컴포넌트 from './프리젠테이셔널 컴포넌트';
import React, {Component} from 'react';
import store from '../store.js'
export default class extends Component{
 render(){
    return <프리젠테이셔널 컴포넌트 onClick={()=>{
     store.dispatch({type: '블라블라', size: '내키는 173'})
    }.bind(this)}></프리젠테이셔널 컴포넌트>
  }
}

// 이건 Anonymous 컴포넌트라고도 불림(이름이 없어서)

그후에 프리젠테이셔널 컴포넌트에 이벤트가 발생되면 store를 호출하는 코드들을 없앤다. 즉 이 강의챕터 제목과 같이 react 컴포넌트에서 redux에 종속된 기능을 제거한다.

그래서 props로 콜백함수를 전달하고 그 콜백함수가 프리젠테이셔널 컴포넌트에서 이벤트가 발생될때 실행되도록한다면 더이상 프리젠테이셔널 컴포넌트에서는 store가 필요없게되고 그 프리젠테이셔널 컴포넌트는 redux에 종속되지 않으므로 부품으로써의 역활을 할 수 있는 것이다.

그렇다면 이제 store와 관련된 작업들은 컨테이너 컴포넌트에서 하면 된다.


#### 5.2. 컴포넌트의 재사용성을 높이기 위해서 container 컴포넌트 도입

redux에 종속된다고 나쁜 것이 아니고, 만약 Component가 다른 곳에 쓰일 컴포넌트가 아니라고 생각한다면 그냥 편하게 리덕스에 종속되게 코드를 구현하면 된다.




** 사실 이렇게 매번쓰면 귀찮고 복잡해진다. 그래서 React Hooks에서는 <Provider> 이나, useDispatch, useSelector
를 지원한다.



6.1. React Redux가 필요한이유(only Redux아님)
Container Component의 구현을 자동화해줌.


6.2. React Redux - connect & provider

npm install react-redux

import {connect} from 'react-redux';

export default connect()(Presentational Component);

connect()();에서 만들어진 값을 export하는 데 그 값이 우리가 수동으로 랩핑했던 값이랑 같은 값이 나온다.



최상위 컴포넌트(루트 컴포넌트)에 
import {Provider} from 'react-redux';
를 하고 <Provider> 컴포넌트를 <App /> 컴포넌트를 랩핑
감싸주어야한다.
그리고 Provider의 props에 store를 주면된다.

<Provider store={store}>
 <App/>
</Provider>

Provider는 우리를 편리하게 해주는 매직이지만 이 매직을 왜 써야하는지 논리적으로 이해를 하지 못한다면 공부할때 정말 괴로울 수 밖에 없음


<hr>
 











