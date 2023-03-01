import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_DIMENSION,
  SET_DIEMNSION,
  GET_LINEDATA,
  SET_LINEDATA
} from "../ActionTypes/data_acty";

import { api_url } from "../Config/index";
import axios, * as others from "axios";
// const axios = require("axios");

import {ohlcdata} from "../Dummydata/dummydata"

export function getData(fecthsource="mysql") {
  return (dispatch) => {
    dispatch({ type: GET_USER_REQUEST });
    if (fecthsource=="mysql"){
   /* axios
     .get(`${api_url}/data`)
     .then(function (res) {
       var arrayObj = res.data.data;
       console.log(arrayObj)
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
     }); */
    }
    else{
      dispatch({
        type: GET_USER_SUCCESS,
        payload: { data: ohlcdata() },
      });
    }
  };
}

export function setDim(width_increment = 10, height_increment = 20,operrator=1) {
  return (dispatch) => {
    dispatch({
      type: SET_DIEMNSION,
      payload: { width_inc: operrator*width_increment, height_inc: operrator*height_increment },
    });
  };
}

export function setLineCoor(Linetype= "Hline",ID="L2",x1=1,y1=2,x2=3,y2=4) {
  
  var temppayload1={LineType:"HLINE",ID:"L1",x1: 1, y1: 3, x2: 5, y2: 6}
  
  

  console.log('temppayload0',temppayload1)
  // temppayload[Linetype]
  return (dispatch) => {
    dispatch({
      type: SET_LINEDATA,
      payload: temppayload1,
    });
  };
}
