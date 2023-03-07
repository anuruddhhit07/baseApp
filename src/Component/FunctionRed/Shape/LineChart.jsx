import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


function LineChart({ data, xScale, yScale,xScaleband }) {
  const ref = useRef(null);
  
  
    // Define line generator
    const line = d3.line()
      .x((d, i) => xScaleband(d.time)+xScaleband.bandwidth()/2)
      .y(d => yScale(d.close))
      //.curve(d3.curveMonotoneX);
  

  useEffect(() => {
if(ref.current){
    // Draw line
    const svg = d3.select(ref.current)
   
    // Define line generator
   // const line = d3.line()
     // .x((d, i) => xScale(d.time))
    //  .y(d => yScale(d.close))
    //  .curve(d3.curveMonotoneX);
      
     svg.selectAll("*").remove()
    svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("clip-path", "url(#clipping)")
      .attr("d", line);
}
         
      
  }, [data,yScale,xScaleband.range()]);

  return (
    <g id ="ID_LineSeries" ref={ref} >
    </g>
  );
}
export default LineChart
