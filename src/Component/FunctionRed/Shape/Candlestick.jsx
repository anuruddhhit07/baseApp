import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';
import {drawSVGCandleohlc} from "./Draw/drawSVGCandle"

const CandlestickChart = ({ data,xScale,yScale,xScaleband }) => {
  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );
   const barwidth=xScaleband.bandwidth()
  //  console.log(xScaleband.bandwidth());
   const formatTime = d3.timeFormat("%d/%m/%Y %H:%M:%S");

  useEffect(() => {
  //  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
   // const width = 600 - margin.left - margin.right;
   // const height = 400 - margin.top - margin.bottom;

   // const svg = d3
   //   .select(svgRef.current)
    //  .attr('width', width + margin.left + margin.right)
   //   .attr('height', height + margin.top + margin.bottom)
   //   .append('g')
   //   .attr('transform', `translate(${margin.left},${margin.top})`);

    // x scale
  //  const x = d3.scaleBand().range([0, width]).padding(0.2);
  //  x.domain(data.map((d) => d.date));

    // y scale
  //  const y = d3.scaleLinear().range([height, 0]);
   // y.domain([d3.min(data, (d) => d.low), d3.max(data, (d) => d.high)]);

    // draw candlestick chart
    
    if (ref.current){
        const svg = d3.select(ref.current)
        svg.selectAll("*").remove()
      
      // svg
      //   .selectAll('line')
      //   .data(data)
      //   .enter()
      //   .append('line')
      //   .attr("clip-path","url(#clipping)")
      //   .attr('class', 'line')
      //   .attr('x1', (d) => xScale(d.time))
      //   // .attr('x1', (d) => xScaleband(d.time))
      //   .attr('y1', (d) => yScale(d.high))
      //   // .attr('x2', (d) => xScaleband(d.time))
      //   .attr('x2', (d) => xScale(d.time))
      //   .attr('y2', (d) => yScale(d.low))
        
       
    svg
    .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("clip-path", "url(#clipping)")
      // .attr('x', (d) => xScale(d.time)-barwidth/2)
      .attr('x', (d) => xScaleband(d.time))
      .attr('y', (d) => yScale(Math.max(d.open, d.close)))
      .attr('width', barwidth)
      .attr('height', (d) => {
        return yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close));
      })
      .attr('fill', (d) => {
        return d.open > d.close ? 'red' : 'green';
      })
      .attr('stroke', 'black')
       .on("mouseover", function(event,d)  {mouseover(event,d)})
      .on("mouseout", mouseout);

      
    }
      
      
  }, [data,xScale,yScale]);
  
  const mouseover=(event,d)=>{
    // console.log("gdhdhddj",d.time)
    const tooltipref=d3.select("#tooltipid")
    .style("opacity",1)
    tooltipref.text(
    `
    Date: ${formatTime(d.time)}
    O: ${d.open}
    H: ${d.high} 
    L:${d.low}
    C:${d.close}
    V:${d.volume}`
     ).style('fill', 'darkOrange')
    
  }
  const mouseout=()=>{
    // console.log("2333")
    d3.select("#tooltipid")
    .style("opacity",0)
  }

  return <g id="ID_OHLCSeries"ref={ref}></g>;
};

export default CandlestickChart;
