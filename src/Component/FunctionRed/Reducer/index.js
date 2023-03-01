import { combineReducers } from "redux";
import { dataReducer } from "./data_red";
import {dimensionReducer} from "./dimsion_red"
import {lineReducer} from "./linedata_red"


export default combineReducers({
    dataReducer,
    dimensionReducer,
    lineReducer
});