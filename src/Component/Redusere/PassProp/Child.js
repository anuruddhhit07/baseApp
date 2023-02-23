import React, { Component } from "react";

import { connect } from "react-redux";


class Child extends Component {

  incrementParentCounter = () => {

    this.props.dispatch({ type: "INCREMENT_PARENT" });

  };

  render() {

    return (

      <div className="child-component">

        <div>This is the child component - [COUNTER: {this.props.counter}]</div>

        <button onClick={this.incrementParentCounter}>

          Increment Parent Counter

        </button>

      </div>

    );

  }

}

const mapStateToProps = (state) => ({

  counter: state.childCounter,

});


export default connect(mapStateToProps)(Child);