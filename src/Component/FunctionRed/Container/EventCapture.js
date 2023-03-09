
// https://www.google.com/search?client=firefox-b-d&q=disbale+zoom+in+d3
import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
import {update_X_zoomrange,set_X_zoomrange} from "../Action/data_ac"
const EventCapture = (props) => {
 

  const refevent = useRef(null);
  const dispatch= useDispatch()
  const { width,height,margin, widthchart, heightchart,xzoomrange } = useSelector(
    (state) => state.dimensionReducer
  );

  

  const isToggledzoom = useSelector(
    (state) => state.chartpropReducer?.isToggledzoom
  );


  useEffect(() => {
    // console.log("xzoomrange in zoomsvg",xzoomrange);
    zoomsvg();
  }, [isToggledzoom,xzoomrange]);

  // const extent = [
  //   [margin.left, margin.top],
  //   [width - margin.right, height - margin.top]
  // ];

  const extent = [
    [-500, margin.top],
    [width+500, height - margin.top]
  ];

  const zoomGlobal = d3.zoom().scaleExtent([.5, 55])
  .translateExtent(extent)
  // .extent(extent)
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

    const newXshift=[margin.padding_left, width-margin.padding_left-margin.padding_right-margin.left].map(d => event.transform.applyX(d));

      // handlescalband([margin.padding_left, width-margin.padding_left-margin.padding_right-margin.left].map(d => event.transform.applyX(d)))
      dispatch(update_X_zoomrange({rangemin:newXshift[0],rangemax:newXshift[1]}))
  
  };



  const reset = () => {
    const svgel = d3.select(refevent.current);
    // svgel.call(zoomGlobal.transform, d3.zoomIdentity);
    // handlescalband([margin.padding_left, width-margin.padding_left-margin.padding_right-margin.right-margin.padding_left-300])
    dispatch(set_X_zoomrange())
  };
  const panLeft = () => {
    const svgel = d3.select(refevent.current);
    svgel.transition().call(zoomGlobal.translateBy, -50, 0);
   
  };

  const panRight = () => {
    const svgel = d3.select(refevent.current);
    svgel.transition().call(zoomGlobal.translateBy, 50, 0);
  };

  const centerfit = () => {
    const svgel = d3.select(refevent.current);
    svgel
      .transition()
      .call(zoomGlobal.translateTo, 1 * widthchart, 1 * heightchart);
  };


 

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
