import React, { Component } from "react";

import { connect } from "react-redux";

import Child from "./Child";

class Parent extends Component {
  incrementChildCounter = () => {
    this.props.dispatch({ type: "INCREMENT_CHILD" });
  };

  render() {
    return (
      <div className="parent-component">
        <div>
          This is the parent component - [COUNTER: {this.props.counter}]
        </div>

        <button onClick={this.incrementChildCounter}>
          Increment Child Counter
        </button>

        <Child />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  counter: state.parentCounter,
});

export default connect(mapStateToProps)(Parent);
