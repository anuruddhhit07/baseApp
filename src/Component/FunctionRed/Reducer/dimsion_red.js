// https://github.com/shubhamns/mern-stack-react-redux-thunk-crud-app-with-functional-component/tree/master/react-app/src/reducers
// https://stackoverflow.com/questions/74044438/multiple-components-decide-to-fetch-an-object-at-the-same-time
// https://gist.github.com/mbostock/2983699
import {
    GET_DIMENSION,
    SET_DIEMNSION,
  } from "../ActionTypes/data_acty";

 
  const weightmain=700
  const heightmain=480
  const top=10
  const bottom=40
  const left=50
  const right=50
  const padding_left=30
  const padding_right=30


  const initialState = {
    loading: false,
    width: weightmain,
    height: heightmain,
    margin:{top:top,bottom:bottom,left:left,right:right,padding_left:padding_left,padding_right:padding_right},
    widthchart: weightmain-left-right-padding_left-padding_right,
    heightchart:heightmain-top-bottom,
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
        widthchart:state.width + action.payload?.width_inc-state.margin.left-state.margin.right-state.margin.padding_left-state.margin.padding_right,
        heightchart:state.height + action.payload?.height_inc-state.margin.bottom-state.margin.top
      };
    
      
      default:
        return state;
    }
  }