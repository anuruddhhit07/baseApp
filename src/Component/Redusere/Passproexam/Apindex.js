// https://www.pluralsight.com/guides/how-to-connect-redux-to-grandchild-component
import React from "react";
import ReactDOM from "react-dom"
import { Provider } from "react-redux";
import { createStore } from "redux";
import "./style.css";
import Parent from "./Parent";

const initialState = {
  count: 0,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };

    default:
      return {
        count: state.count,
      };
  }
}

const store = createStore(reducer);

const RedsApp = () => {
  return (
    <div className="Appp">
      <Provider store={store}>
        <Parent />
      </Provider>
    </div>
  );
};


export default RedsApp