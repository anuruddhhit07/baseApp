// https://timmousk.com/blog/react-call-function-in-child-component/
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";
import { getData, setDim,setzoomstate,setzoomstateyz,setzoomstatexz } from "../Action/data_ac";
import useController from "../Controller/Controller";
import EventCapture from "./EventCapture";
import CheckInlineExample from "./CheckInline";

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

const ZoomCanvas = ({ data, isToggledzoom, children }) => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  // const refevent = useRef(null);

  const { width, height, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const currentGlobalZoomState = useSelector((state) => state.chartpropReducer?.currentGlobalZoomState);
  const currentXZoomState = useSelector((state) => state.chartpropReducer?.currentXZoomState);
  const currentYZoomState = useSelector((state) => state.chartpropReducer?.currentYZoomState);
  
console.log('currentGlobalZoomState',currentGlobalZoomState);
  // const [currentGlobalZoomState, setCurrentGlobalZoomState] =
  //   useState(zoomIdentity);
  // const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  // const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);

  const { xScale, yScale } = useController({
    data,
    width,
    height,
    margin,
    currentGlobalZoomState,
  });

  

//console.log('currentXZoomState',currentXZoomState,currentGlobalZoomState);

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

//  console.log('main zoom loop',xScale.domain());

  return (
    <>
      {/* {this.props.xScale !==null && this.props.xScale(1387212570000)} */}
      <div>
        {/* x={p1.x}
        y={p1.y} */}
        {}

        {/* <button id="reset"> Reset </button>
        <button id="panLeft"> panLeft </button>
        <button id="panRight"> panRight </button>
        <button id="center"> center </button>
        <button id="H_line">Line</button>
        <button id="delete_horizontal">Delete Line</button> */}
       
        
      </div>
      <div
        style={{
          position: "relative",
          width,
          height,
          marginLeft: 10,
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
              <rect x={margin.padding_left*0} y="0" width={widthchart+margin.padding_left+margin.padding_right} height={heightchart} />
            </clipPath>

            <EventCapture
             // handleGlobalZoomState={handleGlobalZoomState}
             // currentGlobalZoomState={currentGlobalZoomState}
             // currentYZoomState={currentYZoomState}
            //  currentXZoomState={currentXZoomState}
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
