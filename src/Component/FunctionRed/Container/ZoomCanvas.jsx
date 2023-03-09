// https://timmousk.com/blog/react-call-function-in-child-component/
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import "./styles.scss";

import EventCapture from "./EventCapture";




const ZoomCanvas = ({
  data,
  xScale,
  xScaleband,
  xScaleLinear,
  yScale,
  width,
  height,
  widthchart,
  heightchart,
  margin,
  children,
}) => {
  const ref = useRef(null);

  // const { xzoomrange } = useSelector(
  //   (state) => state.dimensionReducer
  // );

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.

    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        data: data,
        xScale: xScale,
        yScale: yScale,
        xScaleband:xScaleband,
        xScaleLinear:xScaleLinear,
      });
    }
    return child;
  });

  return (
    <>
      {/* <div>
        {width}
        {" "}
        {height}
      </div> */}
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
              <rect
                x={margin.padding_left * 0}
                y="0"
                width={widthchart + margin.padding_left + margin.padding_right}
                height={heightchart}
              />
            </clipPath>

            <EventCapture
              // scalebandrange={scalebandrange}
              // handlescalband={handlescalband}
            />

            <g id="ID_Chart">{childrenWithProps}</g>
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
