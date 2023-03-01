import {
  GET_LINEDATA,
  SET_LINEDATA,
} from "../ActionTypes/data_acty";




// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// https://stackoverflow.com/questions/57750301/usestate-array-of-objects
// const initialState ={ Hline: {L1:{ x1: null, y1: null, x2: null, y2: null }} }

const initialState = [{ LineType: "HLINE", ID: "L1", x1: null, y1: null, x2: null, y2: null }]

export function lineReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LINEDATA:
      return {
        ...state,
      };
    case SET_LINEDATA:
      // console.log(state)
      //   console.log('llllinedata',state);
      // console.log('temp', action.payload)
      //   // Linetype: Linetype, ID: ID,x1:x1,y1:y1,x2:x2,y2:y2
      

      if (action.payload.x1 == null || action.payload.x2 == null || action.payload.y1 == null || action.payload.y2 == null) {
       
        return state
      }
      else {
        return [...state, action.payload];
      }

    // console.log("firstyy",[...state])
    // console.log("fdgdfgghh",[...state, action.payload])






    default:
      return state;
  }
}
