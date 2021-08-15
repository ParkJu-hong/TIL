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
