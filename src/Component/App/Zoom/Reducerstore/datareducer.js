
// 
import {testdata,timesereiohlc } from "../Dummydata/dummydata";

const initialState = { data: testdata };
// const initialState = { data: null};
export default function datareducer(state=initialState, action) {
  // console.log('action',action);
  // console.log(action.type);
  // console.log(action.payload);

    switch (action.type) {
      case "init":
        return { data: [1,2,3] };
      case "addData":
        return { data: [] };
      default:
        return state;
    }
  }