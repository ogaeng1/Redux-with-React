I. Redux란?

> 리덕스는 가장 많이 사용하는 리액트 상태 관리 라이브러리입니다. 리덕스를 사용하면 컴포넌트의 상태 업데이트 관련 로직을 다른 파일로 분리시켜서 더욱 효율적으로 관리할 수 있습니다. 또한, 컴포넌트끼리 똑같은 상태를 공유해야 할 때도 여러 컴포넌트를 거치지 않고 손쉽게 상태 값을 전달하거나 업데이트할 수 있습니다.

II. 액션과 액션 타입 정의하기

> 상태에 어떠한 변화가 필요하면 `액션(action)`이란 것이 발생하게 됩니다. 이는 하나의 객체로 표현되는데, 액션 객체는 `type`필드를 반드시 가지고 있어야 합니다. 해당 값을 액션의 이름이라고 생각하면 됩니다.

```js
// modules/textsize.js
const INCREASE = "textsize/INCREASE";
const DECREASE = "textsize/DECREASE";
```

III. 액션 생성 함수

> `액션 생성 함수`는 액션 객체를 만들어 주는 함수입니다. 어떤 변화를 일으켜야 할 때마다 액션 객체를 만들어야 하는데 매번 액션 객체를 직접 작성하기 번거로울 수 있고, 만드는 과정에서 실수로 정보를 놓칠 수도 있기 때문에 이를 방지하기 위해 함수로 만들어서 관리합니다.

```js
// modules/textsize.js
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
```

IV. 초기상태와 리듀서

> `리듀서(reducer)`는 변화를 일으키는 함수입니다. 액션을 만들어서 발생시키면 리듀서가 현재 상태와 전달받은 액션 객체를 파라미터로 받아 옵니다. 그리고 두 값을 참고하여 새로운 상태를 만들어 반환합니다.

```js
// modules/textsize.js
const INCREASE = "textsize/INCREASE";
const DECREASE = "textsize/DECREASE";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

const initialState = {
	textSize: 20
}

function textSizeReducer(state = initialState, action) {
	switch(action.type) {
		case INCREASE:
			return {
				textSize: state.textSize * 2
			}
		case DECREASE:
			return {
				textSize: state.textSize / 2
			}
		default:
			return state;
	}
}

export default textSizeReducer;
```

```js
// modules/color.js
const CHANGE_COLOR = "color/CHANGE_COLOR";

export const getColor = (color) => ({ type: CHANGE_COLOR, payload: color });

const initialState = {
	textColor: "black"
}

function changeColor(state = initialState, action) {
	switch(action.type) {
		case CHANGE_COLOR:
			return {
				textColor: action.payload
			}
		default:
			return state;
	}
}

export default changeColor;
```

`color`모듈은 기존 `textsize`모듈과 달리 액션 객체에 `payload`라는 필드를 추가하여 사용하고 있습니다. `payload`는 액션 객체 속성 중 하나로,
액션에 관련된 데이터를 포함하는 역할을 합니다. `payload`는 액션을 수행하는 동작에 필요한 정보를 전달하기 위해 사용됩니다.

V. 루트 리듀서 만들기

> `createStore` 함수를 사용하여 스토어를 만들 때는 리듀서를 하나만 사용해야 합니다. 따라서 기존에 만들었던 리듀서들을 하나로 합쳐 주어야 하는데 이 작업을 리덕스에서 제공하는 `combineReducers`라는 유틸 함수를 사용하면 쉽게 처리가 가능합니다.

```js
//modules/index.js
import { combineReducers } from "redux";
import textSizeReducer from "./textsize";
import changeColor from "./color";

const rootReducer = combineReducers({
	textSizeReducer,
	changeColor
})

export default rootReducer;
```

VI. 스토어

> 스토어는 프로젝트 내에서 단 하나의 스토어만 가질 수 있습니다. 스토어 안에는 현재 애플리케이션 상태와 리듀서가 들어가 있으며, 그 외에도 몇 가지 중요한 내장 함수를 가지고 있습니다. 스토어를 만들 때는 `createStore` 함수를 사용합니다. 또한, 리액트 컴포넌트에서 스토어를 사용할 수 있도록 `App`컴포넌트를 `Provider`컴포넌트로 감싼 후 `store`를 `props`로 전달해 줍니다.

```js
// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './modules';

const store = createStore(rootReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);

reportWebVitals();
```

VII. 디스패치와 Hooks 사용하기

> 디스패치는 `액션을 발생시키는 것`으로 이해하면 될 것 같습니다. `useSelector` 훅은 리덕스의 상태를 조회할 수 있게 도와줍니다. `useDispatch` 훅은 컴포넌트 내부에서 스토어의 내장 함수 dispatch를 사용할 수 있게 해줍니다.

```jsx
// components/TextSize.jsx
import { useSelector, useDispatch } from "react-redux";
import { increase, decrease } from "../modules/textsize";
import { getColor } from "../modules/color";

const TextSize = () => {
	const size = useSelector((state) => state.textSizeReducer.textSize);
	const color = useSelector((state) => state.changeColor.textColor);
	const dispatch = useDispatch();

	const randomColor = () => {
		const colors = ["red", "blue", "violet", "green", "orange"];
		const randomIdx = Math.floor(Math.random() * color.length);
		return colors[randomIdx];
	}

	return (
		<div style={{
			width: "100%",
			height: "100vh",
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			flexDirection: "column",
			gap: "20px"
		}}>
			<div>텍스트 크기는 ? : {size}픽셀</div>
			<div style={{ fontSize: `${size}px`, color: `${color}` }}>크기가 변하는 텍스트</div>
			<div>
				<button onClick={() => dispatch(decrease())}>크기 감소</button>
				<button onClick={() => dispatch(increase())}>크기 증가</button>
				<button onClick={() => dispatch(getColor(randomColor()))}>색 변경</button>
			</div>
		</div>
	)
}

export default TextSize;
```