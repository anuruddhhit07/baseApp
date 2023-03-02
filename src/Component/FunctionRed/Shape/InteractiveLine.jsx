import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID } from "../Action/data_ac";
import "./styles.scss";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function InteractiveLine({ data, xScale, yScale }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  console.log("object", data);
  const { margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const linedata = useSelector((state) => state.lineReducer);
  const [toggelhzline, settoggelhzline] = useState(false);
  const [deleteline_toggel, settdeleteline_toggel] = useState(false);
  const [linetype, settlinetype] = useState("GL");  //"HZL" or"GL

  const tempx1 = useRef(null);
  const tempy1 = useRef(null);
  const tempx2 = useRef(null);
  const tempy2 = useRef(null);

// var tempx1=null
// var tempy1=null
// let tempx2=null
// let tempy2=null


//   const [temp_lincoor, setttemp_lincoor] = useRef({
//     x1: null,
//     y1: null,
//     x2: null,
//     y2: null,
//   });

  const currentid = () => linedata.length;
//   function inti_temp_lincoor() {
//     setttemp_lincoor({ x1: null, y1: null, x2: null, y2: null });
//   }

  useEffect(() => {
    if (ref.current && data.length > 0) {
      console.log("first");
      console.log(data.length);
      const svg = d3.select("#listrect");
    //   inti_temp_lincoor();

      svg
        .on("mousedown", mousedown)
        .on("mouseup", 
        toggelhzline == true
            ? function (event) {
                mouseup(event, "isMouseup");
              }
            : null
        )
        .on(
          "mousedown",
          toggelhzline == true
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
        );
    }
  }, [data, xScale, yScale, toggelhzline, deleteline_toggel]);

  useEffect(() => {
    console.log("first coor", linedata, currentid() > 0);
    if (ref.current && currentid() > 0) {
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
        .attr("x1", (d) => xScale(d.x1))
        .attr("y1", (d) => yScale(d.y1))
        .attr("x2", (d) => xScale(d.x2))
        .attr("y2", (d) => yScale(d.y2));
    }
  });

  function mousedown(event, isMouseUp) {
    console.log(event);
    console.log(isMouseUp);
    var m = d3.pointers(event);
    const corr = m[0];
    console.log("corrdown", corr);
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
    console.log("deleteline", toggelhzline);
    if (toggelhzline == false && deleteline_toggel == true) {
      d3.selectAll(".I_line").on("mouseover", function () {
        const ID_DELETE = d3.select(this).attr("ID");
        d3.select(this).classed("over_delete", true).remove();
        console.log("hello", ID_DELETE);
        dispatch(deletelinebyID(ID_DELETE));
      });
    }
  }

  function dispatchlinecoor(){
    console.log('temp_lincoor',tempx1.current);
    if (linetype=="HZL"){
        
        dispatch(setLineCoor("Hline",xScale.invert(0), yScale.invert(tempy1.current), xScale.invert(widthchart), yScale.invert(tempy1.current)));
    }
else{
    dispatch(setLineCoor("Hline", xScale.invert(tempx1.current), yScale.invert(tempy1.current), xScale.invert(tempx2.current), yScale.invert(tempy2.current)));
}
    
    // inti_temp_lincoor()
    hzline();
  }

  const hzline = () => {
    if (toggelhzline == false) {
      settdeleteline_toggel(false);
    }

    settoggelhzline(!toggelhzline);
  };

  const delhzline = () => {
    if (deleteline_toggel == false) {
      settoggelhzline(false);
    }

    settdeleteline_toggel(!deleteline_toggel);
  };

  d3.select("#H_line")
    .on("click", hzline)
    .style("background-color", toggelhzline == true ? "#B4BEC4" : "white");

  d3.select("#delete_horizontal")
    .on("click", delhzline)
    .style("background-color", deleteline_toggel == true ? "#B4BEC4" : "white");

  console.log("linedata22", linedata, toggelhzline,tempx1,tempy1
//    temp_lincoor
   );
  return (
    // <line  ref={ref}  x1="10" y1="10" x2="90" y2="90" stroke-width="1" stroke="black"/>
    // <line ref={ref} strokeWidth="1" stroke="black" />
    <g ref={ref}></g>
  );
}

export default InteractiveLine;
