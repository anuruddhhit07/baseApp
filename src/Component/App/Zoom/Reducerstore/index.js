import { combineReducers } from 'redux'
import dimensionreducer from './dimensionreducer'
import counterreducer from './counterreducer'
import circlereducer from './circlepropreducer'
import axisReducer from './axispropreducer'
import datareducer from "./datareducer"


export default combineReducers({
    dimensionreducer,
    counterreducer,
    circlereducer,
    axisReducer,
    datareducer
    
})