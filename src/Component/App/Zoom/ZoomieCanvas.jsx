// import React from "react";
import ZoomSVG from "./ZoomSVG";
import Circle from "./Shape/Circle";
import React, { Component } from "react";
import { connect } from "react-redux";

class ZoomieCanvas extends Component {

  constructor(props) {
    super(props)
  
   
  }



  
  incrementChildCounter = () => {
    this.props.dispatch({ type: "increment" });
  };

  decrementChildCounter = () => {
    this.props.dispatch({ type: "decrement" });
  };

  incrementRadius = () => {
    this.props.dispatch({ type: "INCREMENT_Radius" });
  };

  decrementRadius = () => {
    this.props.dispatch({ type: "DECREMENT_Radius" });
  };


  render() {
    
    return (
      <div className="parent-component">
        <div>
          <div>
            This is the parent component - [Increase: {this.props.counter}]
          </div>

          <button onClick={this.incrementChildCounter}>
            I++ Size
          </button>

          <button onClick={this.decrementChildCounter}>
            D-- Size
          </button>

          <button onClick={this.incrementRadius}>
            R++
          </button>

          <button onClick={this.decrementRadius}>
            R--
          </button>


        </div>

        {/* <Child /> */}
        <div>
          <ZoomSVG>
            <Circle />
          </ZoomSVG>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    counter: state.counterreducer.parentCounter,
    width: state.dimensionreducer.width,
    height: state.dimensionreducer.height,
    margin: state.dimensionreducer.margin,
  };
};

export default connect(mapStateToProps)(ZoomieCanvas);

// const ZoomieCanvas = (props) => {
//   return (
//     <ZoomSVG>
//       <Circle />
//     </ZoomSVG>
//   );
// };

// export default ZoomieCanvas;
