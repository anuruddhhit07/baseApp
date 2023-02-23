import * as React from "react";
import * as d3 from "d3";
import "./styles.scss";
export default class ZoomSVG extends React.Component {
  ref=React.createRef()
  componentDidMount() {
    const zoomed = (event) => {
      const currentTransform = event.transform;
      d3.select(this.ref)
        .select("g")
        .attr("transform", currentTransform);
    };
    
    const zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on("zoom", zoomed);

    d3.select(this.ref).call(zoom);
  }
  render() {
    return (
      <svg className="mainsvg" id={"bg1"} height="300" width="500">
        <g ref={ref => (this.ref = ref)}>
          {/* <rect height="500" width="500" fill="none" pointerEvents="all" /> */}
          <g>{this.props.children}</g>
        </g>
      </svg>
    );
  }
}