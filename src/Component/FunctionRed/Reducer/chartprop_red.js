// https://github.com/shubhamns/mern-stack-react-redux-thunk-crud-app-with-functional-component/tree/master/react-app/src/reducers
// https://stackoverflow.com/questions/74044438/multiple-components-decide-to-fetch-an-object-at-the-same-time
// https://gist.github.com/mbostock/2983699

import * as d3 from "d3";
import {
  GET_CHARTPROP,
  SET_CHARTPROP,
  SET_ZOOMSTATE,
  SET_ZOOMXZSTATE,
  SET_ZOOMYZSTATE,
  SET_ZOOMTOGGLE,
  SET_ZOOMXRANGE,
} from "../ActionTypes/data_acty";



const initialState = {
  loading: false,
  drawlinetype: "HZ_LINE",
  isToggledzoom:false,
  currentGlobalZoomState:d3.zoomIdentity,
  currentXZoomState:d3.zoomIdentity,
  currentYZoomState:d3.zoomIdentity,
  // xzoomrange:[],
  error: "",
};

// console.log(initialState.heightchart());


export function chartpropReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CHARTPROP:
    return {
      ...state,
    };
    case SET_CHARTPROP:
      // console.log('resss',action);
    return {
      ...state,
      drawlinetype: action.payload?.drawlinetype,
    };


    case SET_ZOOMTOGGLE:
      // console.log('resss',state);
    return {
      ...state,
      isToggledzoom: !state.isToggledzoom,
    };

    case SET_ZOOMSTATE:
      // console.log('resss',action);
    return {
      ...state,
      currentGlobalZoomState: action.payload?.currentGlobalZoomState,
    };

    case SET_ZOOMXZSTATE:
      // console.log('resss',action);
    return {
      ...state,
      currentXZoomState: action.payload?.currentXZoomState,
    };


    case SET_ZOOMYZSTATE:
      // console.log('resss',action);
    return {
      ...state,
      currentYZoomState: action.payload?.currentYZoomState,
    };

    // case SET_ZOOMXRANGE:
    //   // console.log('resss',action);
    // return {
    //   ...state,
    //   xzoomrange: action.payload?.range_array,
    // };
  
    
    default:
      return state;
  }
}