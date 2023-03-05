
// https://www.google.com/search?client=firefox-b-d&q=disbale+zoom+in+d3
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import {setzoomstate,setzoomstatexz,setzoomstateyz} from "../Action/data_ac"
const EventCapture = (props) => {
  const {
    // currentGlobalZoomState,
    // currentXZoomState,
    // currentYZoomState,
   // handleGlobalZoomState,
    isToggledzoom,
  } = props;

  const refevent = useRef(null);
  const dispatch= useDispatch()
  const { width,height,margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );


  const currentGlobalZoomState = useSelector((state) => state.chartpropReducer?.currentGlobalZoomState);
  const currentXZoomState = useSelector((state) => state.chartpropReducer?.currentXZoomState);
  const currentYZoomState = useSelector((state) => state.chartpropReducer?.currentYZoomState);
  
  function handleGlobalZoomState(zoomtype, zoomstate) {
    // setValue(newValue);
    if (zoomtype == "globalzoom") {
      // setCurrentGlobalZoomState(zoomstate);
      dispatch(setzoomstate({currentGlobalZoomState:zoomstate}))
    }
    if (zoomtype == "xz_zoom") {
      // setCurrentXZoomState(zoomstate);
      dispatch(setzoomstatexz({currentXZoomState:zoomstate}))
    }
    if (zoomtype == "yz_zoom") {
      // setCurrentYZoomState(zoomstate);
      dispatch(setzoomstateyz({currentYZoomState:zoomstate}))
    }
    // console.log(currentXZoomState, currentYZoomState);
  }


  useEffect(() => {
    zoomsvg();
  }, [currentGlobalZoomState, currentYZoomState, currentGlobalZoomState,isToggledzoom]);

  const zoomGlobal = d3.zoom().scaleExtent([0.5, 1])
  .translateExtent([[-100, -100], [width + 100, height + 100]])
   .extent([[-100, -100], [width + 100, height + 100]])
  .filter(() => isToggledzoom)
  .on("zoom", zoomed2);

  // var brush = d3.brushX()
  //       .extent([[-10, -10], [width+10, height+10]])
  //       .on("brush end", brushed);


 

  const zoomsvg = () => {
    const svgel = d3.select(refevent.current);
    // console.log('isToggledzoom',isToggledzoom);
    svgel.call(zoomGlobal)

  };



  const center = (event, target) => {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target);
      // console.log("pdsgfdgb", p);
      return [d3.mean(p, (d) => d[0]), d3.mean(p, (d) => d[1])];
    }
    return [widthchart / 2, heightchart / 2];
  };

  function zoomed2(event)  {
    const targetsvgnode = d3.select("#listrect").node();
    const { k: newK, x: newX, y: newY } = event.transform;
    const { k: prevK, x: prevX, y: prevY } = currentGlobalZoomState;
    const point = center(event, targetsvgnode);
    const isZoomingX = point[1] > heightchart - margin.top - margin.bottom;
    const isZoomingY = point[0] < margin.left;
    if (isZoomingX == false && isZoomingY == false) {
      // console.log("both false");
      handleGlobalZoomState(
        "xz_zoom",
        currentXZoomState
          .translate((newX - prevX) / prevK, 0)
          .scale(newK / prevK)
      );
      handleGlobalZoomState(
        "yz_zoom",
        currentYZoomState
          .translate(0, (newY - prevY) / prevK)
          .scale(newK / prevK)
      );
    }

    if (isZoomingX) {
      handleGlobalZoomState(
        "xz_zoom",
        currentXZoomState
          .translate((newX - prevX) / prevK, 0)
          .scale(newK / prevK)
      );
    }
    if (isZoomingY) {
      handleGlobalZoomState(
        "yz_zoom",
        currentYZoomState
          .translate(0, (newY - prevY) / prevK)
          .scale(newK / prevK)
      );
    }
    handleGlobalZoomState("globalzoom", event.transform);
  };

//   function brushed() {
//     if (d3.event || d3.event.selection)
//     var s = d3.event.selection || xContext.range();

//     xFocus.domain(s.map(xContext.invert, xContext));
//     focusVis.select(".line-rain").attr("d", rainLine);
//     focusVis.select(".line-temp").attr("d", tempLine);
//     focusVis.select(".x axis").call(xAxisFocus);
//     focusVis.select(".zoom").call(zoom.transform, d3.zoomIdentity
//         .scale(visWidth / (s[1] - s[0]))
//         .translate(-s[0], 0));
// }


  const reset = () => {
    const svgel = d3.select(refevent.current);
    svgel.call(zoomGlobal.transform, d3.zoomIdentity);
    handleGlobalZoomState("globalzoom", d3.zoomIdentity);
    handleGlobalZoomState("xz_zoom", d3.zoomIdentity);
    handleGlobalZoomState("yz_zoom", d3.zoomIdentity);
  };
  const panLeft = () => {
    const svgel = d3.select(refevent.current);
    svgel.transition().call(zoomGlobal.translateBy, -150, 0);
  };

  const panRight = () => {
    const svgel = d3.select(refevent.current);
    svgel.transition().call(zoomGlobal.translateBy, 150, 0);
  };

  const centerfit = () => {
    const svgel = d3.select(refevent.current);
    svgel
      .transition()
      .call(zoomGlobal.translateTo, 0.5 * widthchart, 0.5 * heightchart);
  };
  const horz = (event) => {
    const svgel = d3.select(refevent.current);
    let sv = svgel.on("click", (e) => console.log(d3.pointer(e)));
    console.log(event);
    // svgel
    //   .transition()
    //   .call(zoomGlobal().translateTo, 0.5 * widthchart, 0.5 * heightchart);
  };

  function clickDefine(event) {
    const svgel = d3.select(refevent.current);
    svgel.on("click", function () {
      //Remove the currently clicked element from the selection.
      console.log(event);
      console.log(d3.pointer(event));
      d3.select(this).on("click", null);
      // setTimeout(function(){clickDefine();},1000)
    });
  }

  d3.select("#reset").on("click", reset);
  d3.select("#panLeft").on("click", panLeft);
  d3.select("#panRight").on("click", panRight);
  d3.select("#center").on("click", centerfit);
  

  return (
    <rect
      ref={refevent}
      id={"listrect"}
      height={heightchart}
      width={widthchart+margin.padding_left+margin.padding_right}
      pointerEvents="all"
      transform={`translate(${0}, ${margin.top * 0})`}
    />
  );
};

export default EventCapture;
