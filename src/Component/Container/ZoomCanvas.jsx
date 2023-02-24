import React, { useRef,useEffect } from "react";
import * as d3 from "d3";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

const ZoomCanvas = ({ children }) => {
  // const ref = useRef(null);
  console.log(children);
  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );

  useEffect(() => {
    
        updatesvg()

  }, []);

  const updatesvg = () => {
    // console.log(this.props);
    const zoomed = (event) => {
      const currentTransform = event.transform;
      d3.select(ref.current).select("g").attr("transform", currentTransform);
    };
    const zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
    d3.select(ref.current).call(zoom);
  };

  return (
    <>
      {/* {this.props.xScale !==null && this.props.xScale(1387212570000)} */}

      <svg className="mainsvg" id={"bg1"} height={height} width={width}>
        <g ref={ref}>
          {/* <rect height="500" width="500" fill="none" pointerEvents="all" /> */}
          <g>{children}</g>
        </g>
      </svg>
    </>
  );
};

export default ZoomCanvas;
