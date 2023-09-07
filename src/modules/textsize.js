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
