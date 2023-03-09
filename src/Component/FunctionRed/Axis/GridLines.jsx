import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./styles.scss";

const GridLines = ({
  range,
  scale,
  data,
  orient,
  classd,
  translated,
  length,
}) => {
  const ref = useRef(null);

  useEffect(() => {
    renderAxis();
  }, [range, scale, data, orient, classd, translated]);

  const renderAxis = () => {
    if (orient == "bottom") {
      
     

      var AxisGenerator = d3
        .axisBottom(scale)
        // .ticks(10)
        .tickSize(-length)
        .tickFormat("");

      var axis = d3
        .select(ref.current)
        .call(AxisGenerator)
        // .attr("clip-path", "url(#clipping)");

    }

    if (orient == "top") {
      // var AxisGenerator = d3.axisTop(props.scale)
      var Axisgrid = d3
        .axisTop(scale)
        .tickSize(length)
        .tickFormat("")
        .ticks(10);
      var axis = d3.select(ref.current).call(Axisgrid);
    }

    if (orient == "left") {
      // var AxisGenerator = d3.axisLeft(props.scale)
      var Axisgrid = d3
        .axisLeft(scale)
        .tickSize(-length)
        .tickFormat("")
        .ticks(10);
      var axis = d3.select(ref.current).call(Axisgrid);
    }

    if (orient == "right") {
      // var AxisGenerator = d3.axisRight(props.scale)
      var Axisgrid = d3
        .axisRight(scale)
        .tickSize(length)
        .tickFormat("")
        .ticks(10);
      var axis = d3.select(ref.current).call(Axisgrid);
    }

    // axis.append("g").call(xAxisGrid)
  };

  //   const getFormat=()=> {
  //     if (26 < 25) {
  //       return d3.timeFormat('%H:%M');
  //     } else {
  //       return d3.timeFormat('%d/%m %H:%M');
  //     }
  //   }

  // const multiFormat=(date)=> {
  //     return (d3.timeSecond(date) < date ? formatMillisecond
  //         : d3.timeMinute(date) < date ? formatSecond
  //         : d3.timeHour(date) < date ? formatMinute
  //         : d3.timeDay(date) < date ? formatHour
  //         : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
  //         : d3.timeYear(date) < date ? formatMonth
  //         : formatYear)(date);
  //   }

  return <g className={classd} ref={ref} transform={translated}></g>;
};

export default GridLines;
