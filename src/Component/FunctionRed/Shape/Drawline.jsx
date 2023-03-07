import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID } from "../Action/data_ac";
import "./styles.scss";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function Drawline({ data, xScale, yScale,xScaleband }) {
  const ref = useRef(null);

  const { margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const linedata = useSelector((state) => state.lineReducer);
  const currentid = () => linedata.length && linedata[0].x1 !== null;

    useEffect(() => {
      // console.log(currentid());
      if (ref.current && currentid()) {
        const svgl = d3.select(ref.current);
        svgl.selectAll("*").remove();
        svgl
          .selectAll(null)
          .data(linedata)
          .enter()
          .append("line")
          .attr("class", "I_line")
          .attr("ID", (d) => d.ID)
          .attr("clip-path", "url(#clipping)")
          .attr("x1", (d) => xScaleband(d.x1))
          .attr("y1", (d) => yScale(d.y1))
          .attr("x2", (d) => xScaleband(d.x2))
          .attr("y2", (d) => yScale(d.y2));
      }
    }, [xScaleband.range(), linedata, yScale]);




  if (currentid()==false) {
    return null;
  }

  return (
    <>
      <g id="ID_Drawline" ref={ref}>
        {/* {linedata &&
          linedata.map(({ ID, x1, x2, y1, y2 }) => (
            <line
              key={ID}
              id={ID}
              className="I_line"
              x1={xScale(x1)}
              y1={yScale(y1)}
              x2={xScale(x2)}
              y2={yScale(y2)}
              opacity={1}
            ></line>
          ))} */}
      </g>
    </>
  );
}

export default Drawline;
