
// https://www.google.com/search?client=firefox-b-d&q=disbale+zoom+in+d3
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import {setzoomstate,setzoomstatexz,setzoomstateyz} from "../Action/data_ac"
const EventCapture = (props) => {
  const {
   scalebandrange,
   handlescalband,
  } = props;

  const refevent = useRef(null);
  const dispatch= useDispatch()
  const { width,height,margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const isToggledzoom = useSelector(
    (state) => state.chartpropReducer?.isToggledzoom
  );


  useEffect(() => {
    zoomsvg();
  }, [isToggledzoom,scalebandrange]);

  const extent = [
    [margin.left, margin.top],
    [width - margin.right, height - margin.top]
  ];

  const zoomGlobal = d3.zoom().scaleExtent([0.5, 55])
  .translateExtent(extent)
  .extent(extent)
  .filter(() => isToggledzoom)
  .on("zoom", zoomed2);

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
    const point = center(event, targetsvgnode);
    const isZoomingX = point[1] > heightchart - margin.top - margin.bottom;
    const isZoomingY = point[0] < margin.left;


      handlescalband([margin.padding_left, width-margin.padding_left-margin.padding_right-margin.left].map(d => event.transform.applyX(d)))
  
  
  };



  const reset = () => {
    const svgel = d3.select(refevent.current);
    svgel.call(zoomGlobal.transform, d3.zoomIdentity);
    handlescalband([margin.padding_left, width-margin.padding_left-margin.padding_right-margin.left])

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
