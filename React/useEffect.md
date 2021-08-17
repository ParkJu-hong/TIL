useEffect

Effect 뜻 : 효과

비동기적인 코드들과 sideEffect가 발생하는 코드들을 useEffect 안에서 구현하도록 리액트는 권장하고 있다.

모든 컴포넌트가 마운트되고 난뒤에 useEffect의 두번째 인자에 따라 동적으로 실행이 되는데, 이때 컴포넌트가 언마운트된 상황
에서 useEffect에 언마운트된 컴포넌트를 재렌더링하게 되는 상황, 즉 props나 state 값이 변경이 되면 재랜더링이 되는 상황이
오게 되면 cleanup function 을 작성해야한다.

cleanup funtion을 작성해야한다는 것은 다음과 같은 오류를 통해 알게되었다
   
 Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

경고: 마운트되지 않은 구성 요소에서 React 상태 업데이트를 수행할 수 없습니다. 이것은 작동하지 않지만 응용 프로그램의 메모리 누수를 나타냅니다. 수정하려면 useEffect 정리 함수에서 모든 구독 및 비동기 작업을 취소하세요.

cleanup function은 useEffect의 첫번째함수의 리턴함수이다. 또한 cleanup function은 useEffect의 뒷정리를 한다. -> state에서 값을 지울때 실행됌(?)

```js
	useEffect(()=>{
		return ()=>{
			// cleanup function
		}
	}, [deps])
```

두번째 인자는 배열(주로 deps, dependency라고 칭한다)이 들어간다



<hr>


내가 개발을 배우고 있는 학원인 코드스테이츠에 질문을 올렸다. 


현재 어떤 스프린트를 진행 중이고, 어떤 문제에 부딪혔나요?
HA시험 위해 useEffect를 다시 공부하던 중 cleanup함수에 대해 이해가 되지 않아서 질문 드립니다.

다음과 같은 코드는 Ajax요청을 해서 state를 갱신하는 코드입니다. 그리고 value란 state는 각 컴포넌트에 가서 렌더링되게 되는 코드입니다.

```js
const [value, setValue] = useState([]);
useEffect(()=>{
 async () => {
  let URL = 'GET요청할 주소..'
  fetch(URL)
  .then((res) => res.json())
  .then((el) => {
   setValue(el);
  })
 }
}, [])
```
하지만 이렇게 되면 

Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.

와 같이 메모리 누수가 되서 cleanup 함수를 써야한다. 라고 해서 Ajax요청을 useEffect에서 한번만 되도록 하였습니다. 다음과 같이 하니 어찌어찌 위와 같은 오류는 나지않는데, 이해가 되질 않습니다..

애초에 useEffect의 두번째인자에 빈배열 혹은 인자를 넣지 않으면 리액트가 처음 렌더링이 된 이후에 useEffect가 한번 실행되는 것으로 알고 있는데 제가 아는 대로 한번만 실행되면 저렇게 왜 cleanup함수를 구현해서 Ajax요청이 한번만 되도록해야하는지, 왜 저렇게 cleanup 함수라고 하는 것을 useEffect에서 구현해야 되는지 이해가 잘 되지 않습니다.


```js
const [value, setValue] = useState([]);
useEffect(()=>{
 let forCleanup = true; 
 async () => {
  let URL = 'GET요청할 주소..'
  fetch(URL)
  .then((res) => res.json())
  .then((el) => {
   if(forCleanup){
   setValue(el);
  }
  })
 }
 return ()=>{ 
   forCleanup = false;
 }
}, [])
```

안 되는 부분을 해결하기 위해서 구체적으로 어떤 노력을 했나요?
리액트 공식문서와 여려 글들을 참조하여 위와 같이 코드를 고쳐보았습니다. 
또한 useEffect의 두번째인자가 빈배열인 경우 처음 렌더링후 한번만 useEffect가 실행되는 것이라고 알고있어서 AJAX요청 또한 한번만 되는지 알고있었는데, cleanup 함수를 쓰라는 오류가 나와서 AJAX요청이 한번만 실행되게 위와같이 했더니 오류는 사라지는데, 왜 저렇게 cleanup함수를 구현하지 않으면 매모리누수가 된다는 오류가 뜨는지까지 이해가 안되기까지 여러  검색과 시도를 했습니다...

