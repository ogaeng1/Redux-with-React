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