import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
//https://plnkr.co/edit/43suZoDC37TOEfCBJOdT?p=preview&preview

function LineChart({ data, xScale, yScale, xScaleband, xScaleLinear }) {
  const ref = useRef(null);
  // console.log(isNaN(yScale(0)));
  const { heightchart, xzoomrange } = useSelector(
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

  var t = d3.transition().duration(750).ease(d3.easeLinear);

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
      const linedata = data.map((d) => {
        return { time: d.time, close: d.close };
      });
      const newdata = [{ name: "Brooklyn", datum: linedata }];
      // console.log(newdata);
      const checknode = d3.select("#ID_LineS").selectAll("#linesseries").node();
      // console.log("checknode", checknode);
      if (checknode !== null) {
        const checksvgnumber = d3
          .select("#ID_LineS")
          .selectAll("#linesseries")
          .nodes().length;
        // console.log("checksvg", checksvgnumber);
        //  const svg = d3.select("#ID_LineS")
        var vlines = d3.select("#ID_LineS").selectAll("#linesseries");
      } else {
        const svg = d3.select("#ID_LineS");
        var vlines = svg
          .append("g")
          .attr("id", "linesseries")
          .attr("clip-path", "url(#clipping)");
      }
      update(newdata, vlines);
    }
  }, [data,changePropcheckyMin.current, changePropcheckyMax.current,xScaleLinear.range()]);

  function update(data1, vlines) {
    // console.log(vlines);
    // console.log(data1);

    // DATA JOIN
    // Join new data with old elements, if any.
    var varlines = vlines.selectAll(".varline").data(data1, function (d) {
      return d.name;
    });

    // console.log(varlines);
    varlines.exit().remove();
    // varlines.transition(t).attr("d", function (d) {
    //   return line(d.datum);
    // });

    varlines.attr("d", function (d) {
      return line(d.datum);
    });

    varlines
      .enter()
      .append("path")
      .attr("class", "varline vline")
      .attr("id", function (d) {
        return "line_" + d.name;
      })
      .attr("d", function (d) {
        return line(d.datum);
      })
      .style("stroke", function (d) {
        return 2;
      })
      .merge(varlines);
  }

  return (
    <>
      {/* <div>{console.log(rerendorstate, yScale(0))}</div> */}
      <g id="ID_LineS" ref={ref}></g>
    </>
  );
}
export default LineChart;
