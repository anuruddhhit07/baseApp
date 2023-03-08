import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID,updateLineCoor } from "../Action/data_ac";
import "./styles.scss";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// https://stackoverflow.com/questions/13188125/d3-add-multiple-classes-with-function
// export const InteractiveLine = () => {

function Drawline({ data, xScale, yScale,xScaleband,xScaleLinear }) {
  const ref = useRef(null);
  const dispatch = useDispatch();

  const { margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const linedata = useSelector((state) => state.lineReducer);
  const currentid = () => linedata.length && linedata[0].x1 !== null;

    useEffect(() => {
      // console.log(currentid());
      if (ref.current && currentid()) {
        const svgl = d3.select(ref.current);
        // console.log(linedata);
        svgl.selectAll("*").remove();

        svgl
          .selectAll(null)
          .data(linedata)
          .enter()
          .append("line")
          // .attr("class", "I_line")
          .attr("ID", (d) => d.ID)
          .attr("clip-path", "url(#clipping)")
          .attr("x1", (d) => xScaleLinear(d.x1))
          .attr("y1", (d) => yScale(d.y1))
          .attr("x2", (d) => xScaleLinear(d.x2))
          .attr("y2", (d) => yScale(d.y2))
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          

        svgl.selectAll("cirle")
        .data(linedata)
        .enter().append("circle")
        .attr("class", function(d, i) {return "dot1_"+i})
        .attr("cx", function(d, i) {
          return  xScaleLinear(d.x1)
        })
        .attr("cy", function(d) {
          return yScale(d.y1)
        })
        .attr("r", 5)
        .attr("fill","red")
        .attr("Line_ID", function(d,i) { return d.ID })
        .attr("Line_Point", function(d,i) { return 0 })
        .call(drag);


        svgl.selectAll("cirle")
        .data(linedata)
        .enter().append("circle")
        .attr("class", function(d, i) {return "dot2_"+i})
        .attr("cx", function(d, i) {
          return  xScaleLinear(d.x2)
        })
        .attr("cy", function(d) {
          return yScale(d.y2)
        })
        .attr("r", 5)
        .attr("Line_ID", function(d,i) { return d.ID; })
        .attr("Line_Point", function(d,i) { return 1 })
        .call(drag);

        //d3.select(".user").attr("data-name")

      }
    }, [xScaleband.range(),xScaleLinear.range(), linedata, yScale]);


    var drag = d3.drag()
    .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);


      function dragstarted(event, d) {
        console.log('drawsatr');
        // console.log(d3.select(this).select("#IL1"));
        //d3.select(this).attr("stroke", "yellow").attr("stroke-width",4 )
        d3.select(this).attr("fill", "yellow")
        
        // d3.select(this).select("#IL1").attr("color", "blue");
      }
    
      function dragged(event, d) {
          var dx = event.x;
          var dy = event.y;
          // console.log('hii',dx,dy,yScale(dy),d);
          // console.log(d3.select(this).attr("Line_Point"))
          d3.select(this).attr("cy", (d) => dy)
          //d3.select(this).attr("y2", (d) =>  dy)

          var point_id=d3.select(this).attr("Line_Point")

          dispatch(
            updateLineCoor(
              "Hline",
              // scaleBandInvert(xScaleband)(0),
              d.ID,
              point_id,
              // point_id==0?d.x1:d.x2,
              xScaleLinear.invert(dx),
              yScale.invert(dy)
            )
          );

          
      }
    
      function dragended(event, d) {
        //d3.select(this).attr("stroke", "blue").attr("stroke-width", 4)
        d3.select(this).attr("fill", "blue")
      }

    // var drag = d3.drag()
    // .on('dragstart', null)
    // .on('drag', function(d){
    //   // move circle
    //   var dx = d3.event.dx;
    //   var dy = d3.event.dy;
    //   var x1New = parseFloat(d3.select(this).attr('x1'))+ dx;
    //   var y1New = parseFloat(d3.select(this).attr('y1'))+ dy;
    //   var x2New = parseFloat(d3.select(this).attr('x2'))+ dx;
    //   var y2New = parseFloat(d3.select(this).attr('y2'))+ dy;
    //   line.attr("x1",x1New)
    //       .attr("y1",y1New)
    //       .attr("x2",x2New)
    //       .attr("y2",y2New);
    //   }).on('dragend', function(){
    // });


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
              x1={xScaleLinear(x1)}
              y1={yScale(y1)}
              x2={xScaleLinear(x2)}
              y2={yScale(y2)}
              opacity={1}
            ></line>
          ))} */}
      </g>
    </>
  );
}

export default Drawline;
