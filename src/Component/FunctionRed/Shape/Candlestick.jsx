import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { drawSVGCandleohlc } from "./Draw/drawSVGCandle";
import "./tooltip.scss";
//https://www.freecodecamp.org/news/how-to-work-with-d3-jss-general-update-pattern-8adce8d55418/
const CandlestickChart = ({
  data,
  xScale,
  yScale,
  xScaleband,
  xScaleLinear,
}) => {
  const ref = useRef(null);
  const { width, height, margin } = useSelector(
    (state) => state.dimensionReducer
  );
  const barwidth = xScaleband.bandwidth();
  //  console.log(barwidth);
  const formatTime = d3.timeFormat("%d/%m/%Y %H:%M:%S");

  useEffect(() => {
    

    // draw candlestick chart

    if (ref.current && data.length > 0) {
      const svg = d3.select(ref.current);

      const bars = svg.selectAll("rect").data(data);
      const barsline = svg.selectAll("line").data(data);
      

      barsline
         .enter()
        .append('line')
         .attr("clip-path","url(#clipping)")
         .merge(barsline)
        .attr('class', 'cdline')
         //.attr('x1', (d) => xScale(d.time))
          .attr('x1', (d,i) => xScaleLinear(i))
         .attr('y1', (d) => yScale(d.high))
          .attr('x2', (d,i) => xScaleLinear(i))
       //  .attr('x2', (d) => xScale(d.time))
         .attr('y2', (d) => yScale(d.low))
         
         barsline.exit().remove()

      bars
        .enter()
        .append("rect")
        .attr("clip-path", "url(#clipping)")
        .merge(bars)
        .attr("x", (d, i) => xScaleLinear(i) - barwidth / 4)
        .attr("y", (d) => yScale(Math.max(d.open, d.close)))
        .attr("width", barwidth / 2)
        .attr("height", (d) => {
          return (
            yScale(Math.min(d.open, d.close)) -
            yScale(Math.max(d.open, d.close))
          );
        })
        .attr("fill", (d) => {
          return d.open > d.close ? "red" : "green";
        })
        .attr("stroke", "black")
        .on("mouseover", function (event, d) {
          mouseover(event, d);
        })
        .on("mouseout", mouseout)

        bars.exit().remove()
    }
  }, [data, yScale, xScaleband.range()]);

  const mouseover = (event, d) => {
    const tooltipref = d3
      .select("#tooltipid")
      .style("opacity", 1)
      .attr("class", "div-2");

    d3.select("#tooltidate").html(
      `<span id="datetool" >Date: ${formatTime(d.time)}</span>`
    );
    d3.select("#tooltiopen").html(`<span id="opentool" >O: ${d.open} </span>`);
    d3.select("#tooltihigh").html(`<span id="hightool" >H: ${d.high} </span>`);
    d3.select("#tooltilow").html(`<span id="lowtool" >L: ${d.low} </span>`);
    d3.select("#toolticlsoe").html(
      `<span id="closetool" >C: ${d.close} </span>`
    );
  };

  const mouseout = () => {
    // console.log("2333")
    d3.select("#tooltipid").style("opacity", 0);
  };

  return <g id="ID_OHLCSeries" ref={ref}></g>;
};

export default CandlestickChart;
