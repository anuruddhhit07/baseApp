import { combineReducers } from "redux";
import { dataReducer,dataLimitReducer } from "./data_red";
import {dimensionReducer} from "./dimsion_red"
import {lineReducer} from "./linedata_red"
import {chartpropReducer} from "./chartprop_red"


export default combineReducers({
    dataReducer,
    dataLimitReducer,
    dimensionReducer,
    lineReducer,
    chartpropReducer
});