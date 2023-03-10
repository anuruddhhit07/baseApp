import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_DIMENSION,
  SET_DIEMNSION,
  UPDATE_DIEMNSION,
  GET_LINEDATA,
  SET_LINEDATA,
  UPDATE_LINEDATA,
  RESET_LINEID,
  DELETEBY_LINEID,
  SET_CHARTPROP,
  SET_ZOOMSTATE,
  SET_ZOOMXZSTATE,
  SET_ZOOMYZSTATE,
  SET_ZOOMTOGGLE,
  SET_ZOOMXRANGE,
  UPDATE_ZOOMXRANGE,
  SET_DATA_LIMIT_INCRESE,
  SET_DATA_LIMIT_DECRESE
} from "../ActionTypes/data_acty";

import { api_url } from "../Config/index";
import axios, * as others from "axios";
// const axios = require("axios");

import {ohlcdata2} from "../Dummydata/dummydata"

export function getData(fecthsource="mysql",count=10) {
  return (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    if (fecthsource=="mysql"){
    axios
     .get(`${api_url}/data`,{ params: { count: count } })
     .then(function (res) {
       var arrayObj = res.data.data;
      //  console.log(arrayObj)
      var i;
       for (i = 0; i < arrayObj.length; i++) {     
       arrayObj[i].time = new Date(arrayObj[i]["unixtime"] * 1000);
        //  delete arrayObj[i]["unixtime"];
       }     
      //  console.log("res obj =>", arrayObj);
        dispatch({
          type: GET_USER_SUCCESS,
          payload: { data: arrayObj },
        });
     })
     .catch(function (error) {
       const { response } = error;
       console.log("err", response);
       if (response !== undefined) {
       dispatch({
           type: GET_USER_FAILURE,
           payload: "Error in fetch",
         });
       }
     })
    }
    else{
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { data: ohlcdata2() },
      });
    }
  };
}

export function changeDim(width_increment = 10, height_increment = 20,operrator=1) {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DIEMNSION,
      payload: { width_inc: operrator*width_increment, height_inc: operrator*height_increment },
    });
  };
}

export function setDim(width_container,height_container) {
  return (dispatch) => {
    dispatch({
      type: SET_DIEMNSION,
      payload: { width_container: width_container, height_container: height_container},
    });
  };
}

export function setLineCoor(Linetype= "Hline",x1=1,y1=2,x2=3,y2=4) {
  
  var temppayload1={LineType:Linetype,ID:null,x1: x1, y1: y1, x2: x2, y2: y2}
  // console.log('temppayload0',temppayload1)
  // temppayload[Linetype]
  return (dispatch) => {
    dispatch({
      type: SET_LINEDATA,
      payload: temppayload1,
    });
    dispatch({ type: RESET_LINEID });
  };
}


export function updateLineCoor(Linetype= "Hline",ID,linepoint,px,py) {
  
  var temppayload1={LineType:Linetype,ID:ID,linepoint:linepoint,px:px,py:py}
  // console.log('temppayload0',temppayload1)
  // temppayload[Linetype]
  return (dispatch) => {
    dispatch({
      type: UPDATE_LINEDATA,
      payload: temppayload1,
    });
   // dispatch({ type: RESET_LINEID });
  };
}



export function deletelinebyID(ID){
  return (dispatch) => {
    dispatch({
      type: DELETEBY_LINEID,
      payload: ID,
    });

    dispatch({ type: RESET_LINEID });
  };
}


export function setchartprop(props){
  console.log(props);
  const {drawlinetype}=props
  console.log('hello',props,drawlinetype);
  return (dispatch) => {
    dispatch({
      type: SET_CHARTPROP,
      payload: {drawlinetype:drawlinetype},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function setzoomstate(props){
  // console.log(props);
  const {currentGlobalZoomState}=props
  // console.log('hello',props,currentGlobalZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_ZOOMSTATE,
      payload: {currentGlobalZoomState:currentGlobalZoomState},
    });

    // dispatch({ type: RESET_LINEID });
  };
}

export function setzoomstatexz(props){
  console.log(props);
  const {currentXZoomState}=props
  // console.log('hello',props,currentXZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_ZOOMXZSTATE,
      payload: {currentXZoomState:currentXZoomState},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function setzoomstateyz(props){
  console.log(props);
  const {currentYZoomState}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_ZOOMYZSTATE,
      payload: {currentYZoomState:currentYZoomState},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function setzoomtoggel(props){
  // console.log(props);
  // const {zoomtoggle}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_ZOOMTOGGLE,
      // payload: {zoomtoggle:currentYZoomState},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function setdatalimitincrese(factor=10){
  // console.log(props);
  // const {zoomtoggle}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_DATA_LIMIT_INCRESE,
      payload: {count:factor},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function setdatalimitdecrese(factor=10){
  // console.log(props);
  // const {zoomtoggle}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_DATA_LIMIT_DECRESE,
      payload: {count:factor},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function update_X_zoomrange({rangemin,rangemax}){
  // console.log(rangemin,rangemax);
  // const {zoomtoggle}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: UPDATE_ZOOMXRANGE,
      payload: {range_array:[rangemin,rangemax]},
    });

    // dispatch({ type: RESET_LINEID });
  };
}


export function set_X_zoomrange(){
  // console.log(rangemin,rangemax);
  // const {zoomtoggle}=props
  // console.log('hello',props,currentYZoomState);
  return (dispatch) => {
    dispatch({
      type: SET_ZOOMXRANGE,
      // payload: {range_array:[rangemin,rangemax]},
    });

    // dispatch({ type: RESET_LINEID });
  };
}









