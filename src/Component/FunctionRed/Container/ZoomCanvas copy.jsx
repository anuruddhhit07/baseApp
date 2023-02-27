import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./styles.scss";
import { useSelector, useDispatch } from "react-redux";

import {
  select,
  pointers,
  mean,
  scaleLinear,
  zoomIdentity,
  max,
  zoom,
  zoomTransform,
} from "d3";

const ZoomCanvas = ({
  data,
  xScale,
  yScale,
  currentGlobalZoomState,
  currentYZoomState,
  currentXZoomState,
  setglobalzoom,
  setxzzoom,
  setyzzoom,
  children,
}) => {
  // const ref = useRef(null);

  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );




  
  const [p1, setp1] = useState({ x: 0, y: 0 });

  const widhth2 = width - margin.left - margin.right;
  const height2 = height - margin.top - margin.bottom;


  useEffect(() => {
    // updatesvg()
    zoomsvg();
  }, [currentXZoomState, currentYZoomState, currentGlobalZoomState]);

  const zoomsvg = () => {
    //const widhth2=width-margin.left-margin.right
    // const height2=width-margin.top-margin.bottom

    //const svg = select(ref.current);
    const svg = select(".listrect");
    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        return [mean(p, (d) => d[0]), mean(p, (d) => d[1])];
      }
      return [widhth2 / 2, height2 / 2];
    };

    const zoomed2 = (event) => {
      console.log("evennnnnnnnnnnt", event.transform);

      const { k: newK, x: newX, y: newY } = event.transform;
      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
      const point = center(event, svg);
      console.log("pointfddgfdgfd", point);

      const isZoomingX = point[0] > margin.left && point[0] < widhth2;
      const isZoomingY = point[1] > margin.top && point[1] < height2;

      setp1({ x: point[0], y: point[1] });

      isZoomingX &&
        setxzzoom(
          currentXZoomState
            .translate((newX - prevX) / prevK, 0)
            .scale(newK / prevK)
        );
      isZoomingY &&
        setyzzoom(
          currentYZoomState
            .translate(0, (newY - prevY) / prevK)
            .scale(newK / prevK)
        );

      // Keeping track of the previous transform object
      // setCurrentGlobalZoomState(event.transform);
      // console.log("firstfgdgffg",changeh)
      setglobalzoom(event.transform);
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 500]).on("zoom", zoomed2);

    // console.log("zooooo",zoomGlobal)
    svg.call(zoomGlobal);
    // console.log("svggggg cllllllllllll")
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.

    // const newXScale = currentXZoomState.rescaleX(xScale);
    // xScale.domain(newXScale.domain());

    // console.log("object",xScale(0));
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
        x={p1.x}
        y={p1.y}
      </div>
      <svg className="mainsvg" id={"bg1"} height={height} width={width}>
        <g ref={ref} transform={`translate(${margin.left}, ${margin.top})`}>
          <clipPath id="clipping">
            <rect x="0" y="0" width={widhth2} height={height2} />
          </clipPath>
          <rect
            className={"listrect"}
            height={height2}
            width={widhth2}
            //pointerEvents="all"
          />

          <g>{childrenWithProps}</g>
        </g>
      </svg>
    </>
  );
};

export default ZoomCanvas;
