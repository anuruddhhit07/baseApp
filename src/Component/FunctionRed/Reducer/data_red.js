// https://github.com/shubhamns/mern-stack-react-redux-thunk-crud-app-with-functional-component/tree/master/react-app/src/reducers
// https://stackoverflow.com/questions/74044438/multiple-components-decide-to-fetch-an-object-at-the-same-time

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILURE,
    GET_DATA_LIMIT,
    SET_DATA_LIMIT_INCRESE,
    SET_DATA_LIMIT_DECRESE
  } from "../ActionTypes/data_acty";
  const initialState = {
    loading: false,
    item: "",
    data: [],
    error: "",
  };

  const initialStatedataLimit = {
    count: 10,
    error: "",
  };

  export function dataReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USER_REQUEST:
      return {
        ...state,
      };
      case GET_USER_SUCCESS:
        // console.log('resss',action);
      return {
        ...state,
        data: action.payload?.data,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
      
      default:
        return state;
    }
  }


  export function dataLimitReducer(state = initialStatedataLimit, action) {
    switch (action.type) {
      case GET_DATA_LIMIT:
      return {
        ...state,
      };
      case SET_DATA_LIMIT_INCRESE:
        // console.log('resss',action);
      return {
        ...state,
        count: state.count+action.payload?.count,
      };


      case SET_DATA_LIMIT_DECRESE:
        // console.log('resss',action);
        if ((state.count-action.payload?.count)<10){
          return {
            ...state,
          };
        }
      return {
        ...state,
        count: state.count-action.payload?.count,
      };
   
      
      default:
        return state;
    }
  }


 