// https://blog.scottlogic.com/2019/05/09/building-a-better-d3-axis.html
import React from "react";
import d3 from "d3";
export default class Axis extends React.Component {
    constructor(props) {
      super(props)
      this.myRef = React.createRef();
     
    }
    
    
  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.renderAxis();
  }
  renderAxis() {
    var node = this.myRef.axis;
    var axis = d3.svg
      .axis()
      .orient(this.props.orient)
      .ticks(5)
      .scale(this.props.scale);

    d3.select(node).call(axis);
  }
  render() {
    return <g className="axis" ref={this.myRef} transform={this.props.translate}></g>;
  }
}
