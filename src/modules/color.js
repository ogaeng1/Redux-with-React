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