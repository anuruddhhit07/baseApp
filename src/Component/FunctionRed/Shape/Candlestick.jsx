import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';
import {drawSVGCandleohlc} from "./Draw/drawSVGCandle"
import "./tooltip.scss"

const CandlestickChart = ({ data,xScale,yScale,xScaleband,xScaleLinear }) => {
  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );
   const barwidth=xScaleband.bandwidth()
  //  console.log(barwidth);
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
      
      svg
         .selectAll('line')
         .data(data)
         .enter()
        .append('line')
         .attr("clip-path","url(#clipping)")
        .attr('class', 'line')
         //.attr('x1', (d) => xScale(d.time))
          .attr('x1', (d,i) => xScaleLinear(i))
         .attr('y1', (d) => yScale(d.high))
          .attr('x2', (d,i) => xScaleLinear(i))
       //  .attr('x2', (d) => xScale(d.time))
         .attr('y2', (d) => yScale(d.low))
        
       
    svg
    .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("clip-path", "url(#clipping)")
      // .attr('x', (d) => xScale(d.time)-barwidth/2)
      .attr('x', (d,i) => xScaleLinear(i)-barwidth/4)
      .attr('y', (d) => yScale(Math.max(d.open, d.close)))
      .attr('width', barwidth/2)
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
        
  }, [data,yScale,xScaleband.range()]);
  
  const mouseover=(event,d)=>{
    const tooltipref=d3.select("#tooltipid")
    .style("opacity",1)
    .attr('class', 'div-2')

   
    d3.select("#tooltidate").html(`<span id="datetool" >Date: ${formatTime(d.time)}</span>`)
    d3.select("#tooltiopen").html(`<span id="opentool" >O: ${d.open} </span>`)
    d3.select("#tooltihigh").html(`<span id="hightool" >H: ${d.high} </span>`)
    d3.select("#tooltilow").html(`<span id="lowtool" >L: ${d.low} </span>`)
    d3.select("#toolticlsoe").html(`<span id="closetool" >C: ${d.close} </span>`)
  
 
     
 
    
  }





  const mouseout=()=>{
    // console.log("2333")
    d3.select("#tooltipid")
    .style("opacity",0)
  }

  return <g id="ID_OHLCSeries"ref={ref}></g>;
};

export default CandlestickChart;
