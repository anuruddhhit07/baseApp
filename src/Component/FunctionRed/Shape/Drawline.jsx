import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID } from "../Action/data_ac";
import "./styles.scss";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function Drawline({ data, xScale, yScale }) {
  const ref = useRef(null);

  const { margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const linedata = useSelector((state) => state.lineReducer);
  const currentid = () => linedata.length && linedata[0].x1!==null ;


 
  useEffect(() => {
   console.log(currentid());
    if (ref.current && currentid()) {
      const svgl = d3.select(ref.current);
      console.log("first coor", linedata,
       [xScale(linedata[0].x1),yScale(linedata[0].y1),xScale(linedata[0].x2),yScale(linedata[0].y2)]
       );

       console.log('line zoom loop',xScale.domain());

      svgl.selectAll("*").remove();
      svgl
        .selectAll(null)
        .data(linedata)
        .enter()
        .append("line")
        .attr("class", "I_line")
        .attr("ID", (d) => d.ID)
        .attr("clip-path", "url(#clipping)")
        .attr("x1", (d) => xScale(d.x1))
        .attr("y1", (d) => yScale(d.y1))
        .attr("x2", (d) => xScale(d.x2))
        .attr("y2", (d) => yScale(d.y2));
    }
  },[xScale,linedata,yScale]);



  
  return (
    <g ref={ref}></g>
  );
}

export default Drawline;
