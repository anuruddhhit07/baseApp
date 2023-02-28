import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';
import {drawSVGCandleohlc} from "./Draw/drawSVGCandle"

const CandlestickChart = ({ data,xScale,yScale }) => {
  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );

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
    .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("clip-path", "url(#clipping)")
      .attr('x', (d) => xScale(d.time))
      .attr('y', (d) => yScale(Math.max(d.open, d.close)))
      .attr('width', 5)
      .attr('height', (d) => {
        return yScale(Math.min(d.open, d.close)) - yScale(Math.max(d.open, d.close));
      })
      .attr('fill', (d) => {
        return d.open > d.close ? 'red' : 'green';
      })
      .attr('stroke', 'black');

      // const ohlchart = svg
      // .selectAll("path.svgcandle")
      // .data(data)
      // .enter()
      // .append("g")
      // .append("path")
      // .attr("clip-path", "url(#clipping)")


      // ohlchart
      // .attr('fill', (d) => {
      //       return d.open > d.close ? 'blue' : 'green';
      //     })
      //   .attr("d", function (d, index) {
      //     // return drawSVGCandle(d.xCoordinate, d.yCoordinate, d.candleWidth, d.upper, d.body, d.lower);
      //     return drawSVGCandleohlc(
      //       xScale(d.time),
      //       height-yScale(d.open),
      //       height-yScale(d.high),
      //       height-yScale(d.low),
      //       height-yScale(d.close),
      //      5
      //     );
      //   });

    
      
    }
      
      
  }, [data,xScale,yScale]);

  return <g ref={ref}></g>;
};

export default CandlestickChart;
