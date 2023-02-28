
// https://www.google.com/search?client=firefox-b-d&q=disbale+zoom+in+d3
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
const EventCapture = (props) => {
  const {
    currentGlobalZoomState,
    currentXZoomState,
    currentYZoomState,
    handleGlobalZoomState,
    isToggledzoom,
  } = props;

  const refevent = useRef(null);
  const { margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  useEffect(() => {
    zoomsvg();
  }, [currentGlobalZoomState, currentYZoomState, currentGlobalZoomState]);

  const zoomGlobal = d3.zoom().scaleExtent([0.1, 10]).on("zoom", zoomed2);

  // var zoomGlobal = d3.zoom().on('zoom', zoomed2);
 

  const zoomsvg = () => {
    const svgel = d3.select(refevent.current);
    console.log('isToggledzoom',isToggledzoom);

    if (isToggledzoom) {
      console.log('isToggledzoom1111',isToggledzoom);
      svgel.call(zoomGlobal);
    } 
    else {
      console.log('isToggledzoom2222',isToggledzoom);
      svgel.on('zoomGlobal', null);
    }
  };

  const center = (event, target) => {
    if (event.sourceEvent) {
      const p = d3.pointers(event, target);
      console.log("pdsgfdgb", p);
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
      console.log("both false");
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
  d3.select("#horizontal").on("click", clickDefine);

  return (
    <rect
      ref={refevent}
      id={"listrect"}
      height={heightchart}
      width={widthchart}
      pointerEvents="all"
      transform={`translate(${margin.left * 0}, ${margin.top * 0})`}
    />
  );
};

export default EventCapture;
