// https://www.pluralsight.com/guides/handle-parent-child-data-relationships-in-redux
import { Provider } from "react-redux";

import { createStore } from "redux";
import Parent from "./Parent";

const initialState = {
  parentCounter: 0,
  childCounter: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT_PARENT":
      return { ...state, parentCounter: state.parentCounter + 1 };

    case "INCREMENT_CHILD":
      return { ...state, childCounter: state.childCounter + 1 };

    default:
      return state;
  }
}

const store = createStore(reducer);

const RedApp2=()=> {
  return (
    <div className="App">
      <Provider store={store}>
        <Parent />
      </Provider>
    </div>
  );
}

export default RedApp2;
