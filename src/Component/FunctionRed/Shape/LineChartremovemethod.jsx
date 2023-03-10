import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
//https://plnkr.co/edit/43suZoDC37TOEfCBJOdT?p=preview&preview

function LineChart({ data, xScale, yScale, xScaleband, xScaleLinear }) {
  const ref = useRef(null);
  // console.log(isNaN(yScale(0)));
  const { heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const changePropcheckyMin = useRef(false);
  const changePropcheckyMax = useRef(false);

  // const [rerendorstate, setrerendorsate] = useState(false);

  // Define line generator
  const line = d3
    .line()
    .x((d, i) => xScaleLinear(i))
    .y((d) => yScale(d.close));

    var t = d3.transition()
    .duration(750)
    .ease(d3.easeLinear);

  if (isNaN(yScale(0)) == false) {
    changePropcheckyMin.current = yScale(0);
    changePropcheckyMax.current = yScale(heightchart);
  } else {
  }


  // useEffect(()=>{
  //   const svg = d3.select("#ID_LineS")
  //   var vlines = svg.append("g").attr('id', 'linesseries');
  // },[ref])

  
  useEffect(() => {
    if (ref.current && data.length > 0) {
      // console.log(vlines);
      // console.log("data", data, yScale(0));

    

      // Draw line
      const svg = d3.select("#ID_LineS")
      svg.selectAll("*").remove()
      svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("clip-path", "url(#clipping)")
        .attr("d", line);

      // var vlines = svg.append("g").attr('id', 'lines');

      // const svg = d3.select("#ID_LineS")
      // var vlines = svg.append("g").attr('id', 'linesseries');
      // const svgUpdate = d3.select("#ID_LineS").data(data);
      // console.log(svgUpdate,svgUpdate.node());
      // svgUpdate = svgUpdate.enter()

      // svg.selectAll("*").remove();

      // svg
      //   .append("path")
      //   .datum(data)
      //   .attr("class", "line")
      //   .attr("clip-path", "url(#clipping)")
      //   .attr("d", line);
    }
  }, [changePropcheckyMin.current, changePropcheckyMax.current,xScaleLinear.range()]);

  

  return (
    <>
      {/* <div>{console.log(rerendorstate, yScale(0))}</div> */}
      <g id="ID_LineS" ref={ref}></g>
    </>
  );
}
export default LineChart;
