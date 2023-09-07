import { combineReducers } from "redux";
import textSizeReducer from "./textsize";
import changeColor from "./color";

const rootReducer = combineReducers({
	textSizeReducer,
	changeColor
})

export default rootReducer;