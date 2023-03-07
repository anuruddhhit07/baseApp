import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const Axis = ({ range, scale, data, orient, classd, translated }) => {
  const ref = useRef(null);
//   const refdata = useRef(data);

  // console.log(translated);

  useEffect(() => {
    // refdata.current=data
    renderAxis();
  }, [range, scale, data, orient, classd, translated]);

  const renderAxis = () => {
    if (orient == "bottom") {
      // console.log(data);
      // var xValues = data.map(function(d,i){return d.time});
      // console.log(xValues);
      var tickValues = scale
        .domain()
        // .filter(function(d, i) { return !((i + 1) % Math.floor(scale.domain().length / 10)); })
        .filter(function (d, i) {
          return i;
        });

      var AxisGenerator = d3
        .axisBottom(scale)
        .tickFormat((i) => multiFormat(i));

      var axis = d3
        .select(ref.current)
        .call(AxisGenerator)
        .attr("clip-path", "url(#clipping)");
    }

    // if (props.orient=='top'){
    //     var AxisGenerator = d3.axisTop(props.scale)
    //     var axis =d3.select(ref.current).call(AxisGenerator).attr("clip-path", "url(#clipping)")
    // }

    if (orient == "left") {
      var AxisGenerator = d3.axisLeft(scale);
      var axis = d3.select(ref.current).call(AxisGenerator);
      // .attr("clip-path", "url(#clipping)")
    }

    if (orient == "right") {
      var AxisGenerator = d3.axisRight(scale);
      var axis = d3.select(ref.current).call(AxisGenerator);
      // .attr("clip-path", "url(#clipping)")
    }
  };

  var formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

 

  function multiFormat(index) {
    // console.log(data.length);
    // console.log(data);
    //   return index < refdata.current.length? (d3.timeSecond(refdata.current[index].time) < refdata.current[index].time ? formatMillisecond
    //       : d3.timeMinute(refdata.current[index].time) < refdata.current[index].time ? formatSecond
    //       : d3.timeHour(refdata.current[index].time) < refdata.current[index].time ? formatMinute
    //       : d3.timeDay(refdata.current[index].time) < refdata.current[index].time ? formatHour
    //       : d3.timeMonth(refdata.current[index].time) < refdata.current[index].time ? (d3.timeWeek(refdata.current[index].time) < refdata.current[index].time ? formatDay : formatWeek)
    //       : d3.timeYear(refdata.current[index].time) < refdata.current[index].time ? formatMonth
    //       : formatYear)(refdata.current[index].time):null
    
    
          return index < data.length? (
           d3.timeSecond(data[index].time) < data[index].time ? formatMillisecond
         : d3.timeMinute(data[index].time) < data[index].time ? formatSecond
         : d3.timeHour(data[index].time) < data[index].time ? formatMinute
         : d3.timeDay(data[index].time) < data[index].time ? formatHour
         : d3.timeWeek(data[index].time)< data[index].time?formatDay
         : d3.timeMonth(data[index].time) < data[index].time ? formatWeek
         : d3.timeYear(data[index].time) < data[index].time ? formatMonth
          : formatYear)(data[index].time)
          :null
    
  }

  

  return <g className={classd} ref={ref} transform={translated}></g>;
};

export default Axis;
