

  const initialState1 = {
    parentCounter: 0,
    childCounter: 0,
  };
  

export default function counterreducer(state = initialState1, action) {
    switch (action.type) {
      case "INCREMENT_PARENT":
        return { ...state, parentCounter: state.parentCounter + 1 };
  
      case "INCREMENT_CHILD":
        return { ...state, childCounter: state.childCounter + 1 };
  
      default:
        return state;
    }
  }