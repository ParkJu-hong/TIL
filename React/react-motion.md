react-transition-group하다 포기하고 넘어옴 react-motion으로

npm install react-motion

# state에 따른 react motion 적용법도 사용해보자

```jsx
import { Motion, spring } from 'react-motion';

<Motion defaultStyle={{x: -200, opacity: 0}} style={{x: spring(0), opacity: spring(1)}}>
{(style)=>(
	<Motion적용할 컴포넌트 style={{ opacity: style.opacity }}>
		{style.opacity}
	<Motion적용할 컴포넌트/>
)}
</Motion>

```

## 만들어본 예제

참고 ) [https://www.youtube.com/watch?v=ZUbUgSQqjD4](https://www.youtube.com/watch?v=ZUbUgSQqjD4)

```jsx
import "./styles.css";
import { Motion, spring } from "react-motion";
import { useState } from "react";

export default function App() {
  const [on, setOn] = useState(false);
  return (
    <div className="App">
      <Motion
        defaultStyle={{ x: -200, opacity: 0 }}
        style={{ x: spring(on ? 0 : -200), opacity: spring(on ? 1 : 0) }}
      >
        {(style) => (
          <>
            <button
              onClick={() => {
                setOn(!on);
                return;
              }}
            >
              버튼
            </button>
            <div style={{ opacity: style.opacity }}>{style.opacity}</div>
            <img
              style={{ opacity: style.opacity }}
              src="https://imgnews.pstatic.net/image/117/2021/11/17/202111170358981409_1_20211117041102108.jpg?type=w647"
            ></img>
          </>
        )}
      </Motion>
    </div>
  );
}
```
