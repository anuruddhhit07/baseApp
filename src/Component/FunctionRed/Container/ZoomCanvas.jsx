// https://timmousk.com/blog/react-call-function-in-child-component/
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { getData, setDim } from "../Action/data_ac";
import useController from "../Controller/Controller";
import EventCapture from "./EventCapture";

import {
  select,
  pointers,
  pointer,
  mean,
  scaleLinear,
  zoomIdentity,
  max,
  zoom,
  zoomTransform,
} from "d3";

const ZoomCanvas = ({ data,isToggledzoom, children }) => {
  const ref = useRef(null);
  // const refevent = useRef(null);

  const { width, height, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const [currentGlobalZoomState, setCurrentGlobalZoomState] =
    useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);



  const { xScale, yScale } = useController({
    data,
    width,
    height,
    margin,
    currentGlobalZoomState,
  });

  function handleGlobalZoomState(zoomtype, zoomstate) {
    // setValue(newValue);
    if (zoomtype == "globalzoom") {
      setCurrentGlobalZoomState(zoomstate);
    }
    if (zoomtype == "xz_zoom") {
      setCurrentXZoomState(zoomstate);
    }
    if (zoomtype == "yz_zoom") {
      setCurrentYZoomState(zoomstate);
    }
    console.log(currentXZoomState, currentYZoomState);
  }

  if (currentXZoomState) {
    const newXScale = currentXZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  if (currentYZoomState) {
    const newYScale = currentYZoomState.rescaleY(yScale);
    yScale.domain(newYScale.domain());
  }

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        data: data,
        xScale: xScale,
        yScale: yScale,
      });
    }
    return child;
  });

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
      <div>
        {/* x={p1.x}
        y={p1.y} */}
        {}

        <button id="reset"> Reset </button>
        <button id="panLeft"> panLeft </button>
        <button id="panRight"> panRight </button>
        <button id="center"> center </button>
        <button id="horizontal">Horizontal Line</button>

      </div>
      <div
        style={{
          position: "relative",
          width,
          height,
          marginLeft: 60,
          marginTop: 0,
        }}
      >
        <svg
          className="mainsvg"
          id={"bg1"}
          viewBox={`0 0 ${width} ${height}`}
          height={height}
          width={width}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1 + 5,
            border: "1px dotted red",
          }}
        >
          <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
            <clipPath id="clipping">
              <rect x="0" y="0" width={widthchart} height={heightchart} />
            </clipPath>

            <EventCapture
              handleGlobalZoomState={handleGlobalZoomState}
              currentGlobalZoomState={currentGlobalZoomState}
              currentYZoomState={currentYZoomState}
              currentXZoomState={currentXZoomState}
              isToggledzoom={isToggledzoom}
            />

            <g>{childrenWithProps}</g>
          </g>
        </svg>
      </div>
    </>
  );
};

export default ZoomCanvas;

// const [currentGlobalZoomState, setCurrentGlobalZoomState] =useState(zoomIdentity);
// const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
// const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);
