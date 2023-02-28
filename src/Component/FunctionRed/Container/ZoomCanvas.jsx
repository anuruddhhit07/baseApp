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

const ZoomCanvas = ({ data, children }) => {
  const ref = useRef(null);
  // const refevent = useRef(null);

  const { width, height, margin,widthchart,heightchart } = useSelector(
    (state) => state.dimensionReducer
  );
  
 
  const [currentGlobalZoomState, setCurrentGlobalZoomState] =
    useState(zoomIdentity);
  const [currentYZoomState, setCurrentYZoomState] = useState(zoomIdentity);
  const [currentXZoomState, setCurrentXZoomState] = useState(zoomIdentity);

  const [value, setValue] = React.useState("hhhh")

  const [p1, setp1] = useState({ x: 0, y: 0 });
 
  const { xScale, yScale } = useController({
    data,
    width,
    height,
    margin,
    currentGlobalZoomState,
  });



  function handleChange(newValue) {
    setValue(newValue);
  }



  if (currentXZoomState) {
    const newXScale = currentXZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());
  }

  if (currentYZoomState) {
    const newYScale = currentYZoomState.rescaleY(yScale);
    yScale.domain(newYScale.domain());
  }

  useEffect(() => {
    // updatesvg()
    // zoomsvg();
  }, [currentXZoomState, currentYZoomState, currentGlobalZoomState]);

  const zoomsvg = () => {
    

    //const svg = select(ref.current);
    const svgel = select("#listrect");
    const that = this;

    // const targetsvg=select("#listrect")
    const targetsvgnode = select("#listrect").node();
    // console.log(targetsvg);
    // console.log(targetsvgnode);

    const center = (event, target) => {
      if (event.sourceEvent) {
        const p = pointers(event, target);
        console.log("pdsgfdgb", p);
        return [mean(p, (d) => d[0]), mean(p, (d) => d[1])];
      }
      return [widthchart / 2, heightchart / 2];
    };

    const zoomed2 = (event) => {
      // console.log("evennnnnnnnnnnt", event.transform);

      const { k: newK, x: newX, y: newY } = event.transform;
      const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;

      console.log(event);
      const point = center(event, targetsvgnode);
      console.log("pointfddgfdgfd", point);

      // const isZoomingX = point[0] > margin.left && point[0] < widthchart;
      // const isZoomingY = point[1] > margin.top && point[1] < heightchart;

      const isZoomingX = point[1] > heightchart - margin.top - margin.bottom;

      const isZoomingY = point[0] < margin.left;

      if (isZoomingX == false && isZoomingY == false) {
        console.log("both false");
        setCurrentXZoomState(
          currentXZoomState
            .translate((newX - prevX) / prevK, 0)
            .scale(newK / prevK)
        );
        setCurrentYZoomState(
          currentYZoomState
            .translate(0, (newY - prevY) / prevK)
            .scale(newK / prevK)
        );
      }

      setp1({ x: point[0], y: point[1] });

      if (isZoomingX) {
        setCurrentXZoomState(
          currentXZoomState
            .translate((newX - prevX) / prevK, 0)
            .scale(newK / prevK)
        );
      }
      if (isZoomingY) {
        setCurrentYZoomState(
          currentYZoomState
            .translate(0, (newY - prevY) / prevK)
            .scale(newK / prevK)
        );
      }

      // Keeping track of the previous transform object
      // setCurrentGlobalZoomState(event.transform);
      // console.log("firstfgdgffg",changeh)
      setCurrentGlobalZoomState(event.transform);
    };

    const zoomGlobal = zoom().scaleExtent([0.1, 10]).on("zoom", zoomed2);

    const reset = () => {
      svgel.call(zoomGlobal.transform, zoomIdentity);
      setCurrentGlobalZoomState(zoomIdentity);
      setCurrentXZoomState(zoomIdentity);
      setCurrentYZoomState(zoomIdentity);
    };

    const panLeft = () => {
      svgel.transition().call(zoomGlobal.translateBy, -150, 0);
    };

    const panRight = () => {
      svgel.transition().call(zoomGlobal.translateBy, 150, 0);
    };

    const centerfit=()=> {
      svgel
        .transition()
        .call(zoomGlobal.translateTo, 0.5 * widthchart, 0.5 * heightchart);
    }

    
    const Horizontal=(event)=> {
      console.log(that);
      console.log(event);
      
      // 
      svgel.on('click', function(e){
        // let point = center(event, targetsvgnode);
        const point = pointers(e);
        console.log('point',point);
       
      })
    }


    d3.select("#reset").on("click", reset);
    d3.select("#panLeft").on("click", panLeft);
    d3.select("#panRight").on("click", panRight);
    d3.select("#center").on("click", centerfit);
    d3.select("#horizontal").on("click", Horizontal);

    svgel.call(zoomGlobal);
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
        {/* x={p1.x}
        y={p1.y} */}
        {value}
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

            <rect
              id={"listrect"}
              height={heightchart}
              width={widthchart}
              pointerEvents="all"
              transform={`translate(${margin.left * 0}, ${margin.top * 0})`}
            />


            <EventCapture 
            onChange={handleChange}
            />

            <g>{childrenWithProps}</g>
          </g>
        </svg>
      </div>
    </>
  );
};

export default ZoomCanvas;
