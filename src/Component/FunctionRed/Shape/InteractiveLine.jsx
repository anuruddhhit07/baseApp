import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID } from "../Action/data_ac";
import "./styles.scss";
import { computeHeadingLevel } from "@testing-library/react";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function InteractiveLine({ data, xScale, yScale }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  // console.log("object", data);
  const {width, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );
//https://gist.github.com/mikehadlow/93b471e569e31af07cd3
  const linedata = useSelector((state) => state.lineReducer);
  const [line_state, settoggelhzline] = useState(false);
  const [deleteline_toggel, settdeleteline_toggel] = useState(false);
  const [crosshairtoggle,setcrosshairtoggle]=useState(true)
 
  const drawlinetype = useSelector((state) => state.chartpropReducer?.drawlinetype);

  const tempx1 = useRef(null);
  const tempy1 = useRef(null);
  const tempx2 = useRef(null);
  const tempy2 = useRef(null);
  
  const focus=d3.select(ref.current).append('g').style('display','none')
  
  
  useEffect(()=>{
   // d3.select("#focusLineY").remove()
    //const focus = d3.select(ref.current).append('g').style('display', 'none');
                
            focus.append('line')
                .attr('id', 'focusLineX')
                .attr('class', 'focusLine');
            focus.append('line')
                .attr('id', 'focusLineY')
                .attr('class', 'focusLine');

/*
const horizontalLine = d3.select(ref.current).append("line")
    .attr("opacity", 0)
    .attr("x1", 0)
    .attr("x2", width)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("pointer-events", "none");
   */ 
    
 })
 
  



  useEffect(() => {
    if (ref.current && data.length > 0) {
      // console.log("first");
      // console.log(data.length);
      const svg = d3.select("#listrect");
      
      /*
      var horizontalLine = svg.append("line")
    .attr("opacity", 1)
    .attr("x1", 0)
    .attr("x2", width)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("pointer-events", "none");
    */
    
    
    //   inti_temp_lincoor();

      svg
       // .on("mousedown", mousedown)
        .on("mouseup", 
        line_state == true
            ? function (event) {
                mouseup(event, "isMouseup");
              }
            : null
        )
        .on(
          "mousedown",
          line_state == true
            ? function (event) {
                mousedown(event, "isMousedown");
              }
            : null
        )
        // .on("keypress",deleteline)
        .on(
          "dblclick",
          deleteline_toggel == true
            ? function (event) {
                deleteline(event, "deleteevent");
              }
            : null
        )
       .on("mousemove",
       crosshairtoggle==true ?
       function (event){
         mousemove(event,"crosshair")
       }
       : null
       )
        .on('mouseover', function() { focus.style('display', null); })
      .on('mouseout', function() {
       // d3.select("#focusLineY").remove()
         focus.style('display', 'none'); 
         
         })
    }
  }, [data,xScale, yScale,line_state, deleteline_toggel,crosshairtoggle]);

  // useEffect(() => {
  //  console.log(currentid());
  //   if (ref.current && currentid()) {
  //     const svgl = d3.select(ref.current);
  //     console.log("first coor", linedata,
  //      [xScale(linedata[0].x1),yScale(linedata[0].y1),xScale(linedata[0].x2),yScale(linedata[0].y2)]
  //      );

  //      console.log('line zoom loop',xScale.domain());

  //     svgl.selectAll("*").remove();
  //     svgl
  //       .selectAll(null)
  //       .data(linedata)
  //       .enter()
  //       .append("line")
  //       .attr("class", "I_line")
  //       .attr("ID", (d) => d.ID)
  //       .attr("clip-path", "url(#clipping)")
  //       .attr("x1", (d) => xScale(d.x1))
  //       .attr("y1", (d) => yScale(d.y1))
  //       .attr("x2", (d) => xScale(d.x2))
  //       .attr("y2", (d) => yScale(d.y2));
  //   }
  // },[xScale]);

  function mousedown(event, isMouseUp) {
    // console.log(event);
    // console.log(isMouseUp);
    var m = d3.pointers(event);
    const corr = m[0];
    // console.log("corrdown", corr);
    const x1 = corr[0];
    const y1 = corr[1];
    // const xx1 = xScale.invert(x1);
    // const yy1 = yScale.invert(y1);

    tempx1.current=x1
    tempy1.current=y1

    // var tempx1=xx1
    // var tempy1=yy1
    // const xx2 = xScale.invert(widthchart);
    // const yy2 = yScale.invert(y1);

    // setttemp_lincoor({...temp_lincoor,x1:2})

    // setttemp_lincoor((prevState) => ({
    //   // object that we want to update
    //   ...prevState, // keep all other key-value pairs
    //   x1: xx1, // update the value of specific key
    //   y1: yy1,
    // }));

    // dispatch(setLineCoor("Hline", xx1, yy1, xx2, yy2));

   
  }

  function mousemove(event) {
    console.log(" mouse move");
    var m = d3.pointers(event);
    const corr = m[0];
    console.log("corrmove", corr);
    //svg.selectAll("*").remove();
    
    console.log(focus)
    
    var x = xScale(corr[0]);
    var y = yScale(corr[1]);
    
    focus.select('#focusLineY')
    .attr('x1', 0).attr('y1', corr[1])
    .attr('x2', widthchart).attr('y2',corr[1]);
    
    
    /*
    var horizontalLine = d3.select(ref.current).append("line")
    .attr("opacity", 0)
    .attr("x1", 0)
    .attr("x2", width)
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("pointer-events", "none");
    */
    
    /*
    horizontalLine.attr("y1", corr[1]).attr("y2", corr[1]).attr("opacity", 1)

*/

  }

  function mouseup(event) {
    var m = d3.pointers(event);
    const corr = m[0];
    console.log("corrup", corr);
    const x2 = corr[0];
    const y2 = corr[1];
    // const xx2 = xScale.invert(x2);
    // const yy2 = yScale.invert(y2);

    tempx2.current=x2
    tempy2.current=y2
    
    dispatchlinecoor()
    
    // 

  }

  function deleteline(event, deleteevent) {
    console.log("deleteline", line_state);
    if (line_state == false && deleteline_toggel == true) {
      d3.selectAll(".I_line").on("mouseover", function () {
        const ID_DELETE = d3.select(this).attr("ID");
        d3.select(this).classed("over_delete", true).remove();
        console.log("hello", ID_DELETE);
        dispatch(deletelinebyID(ID_DELETE));
      });
    }
  }

  function dispatchlinecoor(){
    // console.log('temp_lincoor',tempx1.current);
    if (drawlinetype=="HZ_LINE"){
        
        dispatch(setLineCoor("Hline",xScale.invert(0), yScale.invert(tempy1.current), xScale.invert(widthchart), yScale.invert(tempy1.current)));
    }
else{
    dispatch(setLineCoor("Hline", xScale.invert(tempx1.current), yScale.invert(tempy1.current), xScale.invert(tempx2.current), yScale.invert(tempy2.current)));
}
    
    // inti_temp_lincoor()
    hzline();
  }

  const hzline = () => {
    if (line_state == false) {
      settdeleteline_toggel(false);
      setcrosshairtoggle(false)
    }

    settoggelhzline(!line_state);
  };

  const delhzline = () => {
    if (deleteline_toggel == false) {
      settoggelhzline(false);
      setcrosshairtoggle(false)
    }

    settdeleteline_toggel(!deleteline_toggel);
  };
  
  const crosshairfn =()=>{
    console.log("34")
    if (crosshairtoggle==false){
      settoggelhzline(false)
      settdeleteline_toggel(false)
    }
    setcrosshairtoggle(!crosshairtoggle) 
  }

  d3.select("#H_line")
    .on("click", hzline)
    .style("background-color", line_state == true ? "#B4BEC4" : "white");

  d3.select("#delete_horizontal")
    .on("click", delhzline)
    .style("background-color", deleteline_toggel == true ? "#B4BEC4" : "white");


d3.select("#crosshairbtn")
.on("click",crosshairfn)
.style("background-color",crosshairtoggle==true? "#B4BEC4":"white")


  console.log("linedata22", linedata, )
// //    temp_lincoor
//    );
  return (
    // <line  ref={ref}  x1="10" y1="10" x2="90" y2="90" stroke-width="1" stroke="black"/>
    // <line ref={ref} strokeWidth="1" stroke="black" />
    <g ref={ref}></g>
  );
}

export default InteractiveLine;
