// https://github.com/shubhamns/mern-stack-react-redux-thunk-crud-app-with-functional-component/tree/master/react-app/src/reducers
// https://stackoverflow.com/questions/74044438/multiple-components-decide-to-fetch-an-object-at-the-same-time
// https://gist.github.com/mbostock/2983699
import {
    GET_DIMENSION,
    SET_DIEMNSION,
  } from "../ActionTypes/data_acty";

 
  const weightmain=400
  const heightmain=280


  const initialState = {
    loading: false,
    width: weightmain,
    height: heightmain,
    margin:{top:10,bottom:40,left:50,right:30},
    widthchart: weightmain-50-30,
    heightchart:heightmain-10-40,
    error: "",
  };

// console.log(initialState.heightchart());


  export function dimensionReducer(state = initialState, action) {
    switch (action.type) {
      case GET_DIMENSION:
      return {
        ...state,
      };
      case SET_DIEMNSION:
        console.log('resss',action);
      return {
        ...state,
        width: state.width + action.payload?.width_inc,
        height: state.height + action.payload?.height_inc,
        widthchart:state.width + action.payload?.width_inc-state.margin.left-state.margin.right,
        heightchart:state.height + action.payload?.height_inc-state.margin.bottom-state.margin.top
      };
    
      
      default:
        return state;
    }
  }