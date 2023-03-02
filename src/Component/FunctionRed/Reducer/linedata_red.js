import { GET_LINEDATA, SET_LINEDATA,RESET_LINEID,DELETEBY_LINEID } from "../ActionTypes/data_acty";
import Form from 'react-bootstrap/Form';

// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// https://stackoverflow.com/questions/57750301/usestate-array-of-objects
// const initialState ={ Hline: {L1:{ x1: null, y1: null, x2: null, y2: null }} }

const initialState = [
  { LineType: "HLINE", ID: "IL0", x1: null, y1: null, x2: null, y2: null },
];



export function lineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LINEDATA:
      return {
        ...state,
      }; 
    case SET_LINEDATA:
      if (
        action.payload.x1 == null ||
        action.payload.x2 == null ||
        action.payload.y1 == null ||
        action.payload.y2 == null
      ) {
        return state;
      } else {
        action.payload.ID = "IL"+(state.length + 1);
        console.log("state", state.length);
        return [...state, action.payload];
      }

    case RESET_LINEID:
      // console.log('RESET_LINEID',state);
      // let outputsate = state.filter(obj => Object.keys(obj).includes("date");
      const outputsate = state.filter(object => {
        return object.x1 !== null;
        });
      // console.log('outputsate',outputsate);
      var result = outputsate.map((e,index) => ({ ...e, ID: "IL"+ (index+1) }));
      return result

    case DELETEBY_LINEID:
        console.log("ID",action.payload);
        const tempsate = state.filter(object => {
          return object.ID !== action.payload;
          });

    // const fileesate = state.filter(object => {
    //   return object.x1 !== null;
    //   });

    return tempsate;

    default:
      return state;
  }
}


