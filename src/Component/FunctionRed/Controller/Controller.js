import { useMemo } from "react";
import * as d3 from "d3";

import  configureStore from "../Store/store";
const store = configureStore();

// console.log('status',store.getState().dimensionReducer.width);
 
const useController = ({ data, width, height,margin,currentGlobalZoomState }) => {
// console.log('controller data',data,);
  var width = width - margin.left - margin.right-margin.padding_left-margin.padding_right
  var height = height - margin.top - margin.bottom
  // console.log(width);
  
  // data.forEach(function (d) {
  //     d.time = new Date(d.time * 1000);
  //   });
  // console.log(data);

 
    
  const xMin = useMemo(
    () => d3.min(data, function (d) {
      return Math.min(d.time);
    }),
    [data]
  );
  const xMax = useMemo(
    () => d3.max(data, function (d) {
      return Math.max(d.time);
    }),
    [data]
  );

  // console.log(xMin,xMax);

  // const xScale = useMemo(
  //   () => d3.scaleTime().domain([xMin, xMax]).rangeRound([margin.padding_left, width+margin.padding_left]).nice(),
  //   [xMin, xMax, width,currentGlobalZoomState]
  // );

  // Use this to draw x axis
  const xScale = useMemo(
    () => d3.scaleTime().domain(d3.extent(data, function(d) { return d.time; })).rangeRound([margin.padding_left, width+margin.padding_left]).nice(),
    [xMin, xMax, width,currentGlobalZoomState]
  );

  const xScaleband = useMemo(
    () => d3.scaleBand().domain(d3.extent(data, function(d) { return d.time; })).range([margin.padding_left, width+margin.padding_left]),
    [xMin, xMax, width,currentGlobalZoomState]
     );
       


  // const parseDate = d3.timeParse("%s");
  // console.log('data',data);
  // var valuesForXAxis = data.map(function (d){return parseDate(d.unixtime)}); 


  // Add an ordinal scale
// var xScale = d3.scaleBand()
// .domain(d3.map(data, function(d) { return d.time; }))
// .rangeRound([margin.padding_left, width+margin.padding_left]);

//   // var valuesForXAxis = data.map(function (d){return d.time}); 
  
// console.log('valuesForXAxis',valuesForXAxis);

//  var xScale11 = useMemo(
//  ()=>d3.scaleBand()
//  .domain(d3.map(data, function(d) { return d.time; }))
//  .rangeRound([margin.padding_left, width+margin.padding_left])
//  [xMin, xMax, width,currentGlobalZoomState]
//   );
    
  
  //https://stackoverflow.com/questions/26128148/d3-barchart-first-bar-overlaps-axis-label
  //const xScale11 = useMemo(
   // () => d3.scaleOrdinal()
      //  .domain(data.map(function(d) {return d.time}))
       //  .rangeRoundBands([margin.padding_left, width+margin.padding_left ]),
     //   [xMin,xMax,width,currentGlobalZoomState]
      //  )

  // console.log(currentGlobalZoomState);

  const xScaleunix = useMemo(
    () => d3.scaleLinear().domain([xMin, xMax]).range([0, width]),
    [xMin, xMax, width,currentGlobalZoomState]
  );

  // console.log(xScaleunix(xMin),xScaleunix(xMax));

  const yMin = useMemo(
    () => d3.min(data, function (d) {
      return Math.min(d.low);
    }),
    [data]
  );
  const yMax = useMemo(
    () => d3.max(data, function (d) {
      return Math.max(d.high);
    }),
    [data]
  );
  const yScaleForAxis = useMemo(() => {
    const indention = (yMax - yMin) * 0.5;
    return d3.scaleLinear()
      .domain([yMin - indention, yMax + indention])
      .range([height, 0]);
  }, [height, yMin, yMax]);

// console.log("hii",[yMin,yMax])
  const yScale = useMemo(
    () => d3.scaleLinear().domain([yMin, yMax]).range([height, 0]).nice(),
    [height, yMin, yMax,currentGlobalZoomState]
  );
  const yTickFormat = (d) =>
    `${parseFloat(d) > 0 ? "+" : ""}${d3.format(".2%")(d / 100)}`;
 
  return {
    yTickFormat,
    xScale,
    xScaleunix,
    yScale,
    yScaleForAxis,
    xScaleband
  };
};
 
export default useController;