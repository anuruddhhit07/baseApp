const initialState1 = {
    circleRadius: 10,
  };
  

export default function circlereducer(state = initialState1, action) {
    switch (action.type) {
      case "INCREMENT_Radius":
        return { ...state, circleRadius: state.circleRadius + 3 };
  
      case "DECREMENT_Radius":
        return { ...state, circleRadius: state.circleRadius - 3 };
  
      default:
        return state;
    }
  }