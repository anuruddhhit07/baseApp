import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";
import { setLineCoor, deletelinebyID,setzoomtoggel } from "../Action/data_ac";
import "./styles.scss";
import {scaleBandInvert} from "../helper/utilityfn"
import { computeHeadingLevel } from "@testing-library/react";
// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function InteractiveLine({ data, yScale,xScaleband,xScaleLinear }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  // console.log("object", data);
  const { width, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );
  //https://gist.github.com/mikehadlow/93b471e569e31af07cd3
  const linedata = useSelector((state) => state.lineReducer);
  const [line_state, settoggelhzline] = useState(false);
  const [deleteline_toggel, settdeleteline_toggel] = useState(false);

  const isToggledzoom = useSelector(
    (state) => state.chartpropReducer?.isToggledzoom
  );
  const [crosshairtoggle, setcrosshairtoggle] = useState(!isToggledzoom);

  const drawlinetype = useSelector(
    (state) => state.chartpropReducer?.drawlinetype
  );




  const tempx1 = useRef(null);
  const tempy1 = useRef(null);
  const tempx2 = useRef(null);
  const tempy2 = useRef(null);



  useEffect(() => {
    setcrosshairtoggle(!isToggledzoom)
  },[isToggledzoom])

  useEffect(() => {
    if (ref.current && data.length > 0) {
      const svg = d3.select("#listrect");

      svg
        // .on("mousedown", mousedown)
        .on(
          "mouseup",
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
              console.log("in delete function");
                deleteline(event, "deleteevent");
              }
            : null
        )
        .on(
          "mousemove",
          crosshairtoggle == true
            ? function (event) {
                mousemove(event, "ID_crosshair");
              }
            : null
        )
        .on("mouseover", function () {
          // d3.selectAll("#ID_crosshair").style("display", null);
        })
        .on("mouseout", function () {
          // d3.select("#focusLineY").remove()
          // d3.selectAll("#ID_crosshair").style("display", "none");
        });
    }
  }, [data,xScaleband.range(), xScaleLinear.range().yScale, line_state, deleteline_toggel, crosshairtoggle]);

  function mousedown(event, isMouseUp) {
    // console.log(event);
    // console.log(isMouseUp);
    var m = d3.pointers(event);
    const corr = m[0];

    const x1 = corr[0];
    const y1 = corr[1];

    tempx1.current = x1;
    tempy1.current = y1;
  }

  function mousemove(event) {
    // console.log(" mouse move");
    var m = d3.pointers(event);
    const corr = m[0];
    // console.log("corrmove", corr);
    //svg.selectAll("*").remove();

    // console.log(focus)

    var x = xScaleband(corr[0]);
    var y = yScale(corr[1]);

    d3.select("#focusLineY")
      .attr("x1", 0)
      .attr("y1", corr[1])
      .attr("x2", width)
      .attr("y2", corr[1]);

    d3.select("#focusLineX")
      .attr("x1", corr[0])
      .attr("y1", 0)
      .attr("x2", corr[0])
      .attr("y2", heightchart);
  }

  function mouseup(event) {
    var m = d3.pointers(event);
    const corr = m[0];
    console.log("corrup", corr);
    const x2 = corr[0];
    const y2 = corr[1];
    // const xx2 = xScale.invert(x2);
    // const yy2 = yScale.invert(y2);

    tempx2.current = x2;
    tempy2.current = y2;



    dispatchlinecoor();

    //
  }

  function deleteline(event, deleteevent) {
    console.log("line_state", line_state);
    console.log("deleteline_toggel", deleteline_toggel);
    if (line_state == false && deleteline_toggel == true) {
      d3.selectAll(".I_line").on("mouseover", function () {
        const ID_DELETE = d3.select(this).attr("ID");
        d3.select(this).classed("over_delete", true).remove();
        // console.log("hello", ID_DELETE);
        dispatch(deletelinebyID(ID_DELETE));
      });
    }
  }

  function dispatchlinecoor() {
    // console.log('temp_lincoor',tempx1.current,tempy1.current,yScale.invert(tempy1.current));

    // var dvalX1 = scaleBandInvert(xScaleband)(widthchart)
    // var dvalX2 = scaleBandInvert(xScaleband)(tempx2.current)
    

  
    if (drawlinetype == "HZ_LINE") {
      dispatch(
        setLineCoor(
          "Hline",
          // scaleBandInvert(xScaleband)(0),
          xScaleLinear.invert(margin.padding_left),
          yScale.invert(tempy1.current),
          xScaleLinear.invert(widthchart+margin.padding_left),
          yScale.invert(tempy1.current)
        )
      );
    } else {
      
     // lineFromPoints()
     var P=[tempx1.current,tempy1.current]
     var Q=[tempx2.current,tempy2.current]
     
    //  var YY1=lineFromPoints(P,Q,0)
    //  var YY2=lineFromPoints(P,Q,width)
     
      dispatch(
        setLineCoor(
          "Hline",
          // scaleBandInvert(xScaleband)(tempx1.current),
          xScaleLinear.invert(P[0]),
          yScale.invert(P[1]),
          // scaleBandInvert(xScaleband)(tempx2.current),
          xScaleLinear.invert(Q[0]),
          yScale.invert(Q[1])
        )
      );
    }
    

    // inti_temp_lincoor()
    hzline();
  }
  
  function lineFromPoints(P, Q,xpoint)
{
    var a = Q[1] - P[1]
    var b = P[0] - Q[0]
    var c = a*(P[0]) + b*(P[1])
    
    //ax+by=c
    // y=(c-ax)/b
  if (b>0 || b<0){
    return (c-a*xpoint)/b
  }
  else {
    return P[1]
  }
 /*
    if (b < 0)
        document.write("The line passing through " +
                       "points P and Q is:  " + a +
                       "x - " + b + "y = " + c + "<br>")
    else
        document.write("The line passing through " +
                       "points P and Q is:  "+ a + 
                       "x + " + b + "y = " + c + "<br>")
                       */
}

  // function scaleBandInvert(scale) {
  //   var domain = scale.domain();
  //   var paddingOuter = scale(domain[0]);
  //   var eachBand = scale.step();
  //   return function (value) {
  //     var index = Math.floor(((value - paddingOuter) / eachBand));
  //     return domain[Math.max(0,Math.min(index, domain.length-1))];
  //   }
  // }

  const hzline = () => {
    if (line_state == false) {
      settdeleteline_toggel(false);
      setcrosshairtoggle(false);
    }

    settoggelhzline(!line_state);
  };

  const delhzline = () => {
    if (deleteline_toggel == false) {
      settoggelhzline(false);
      setcrosshairtoggle(false);
    }

    settdeleteline_toggel(!deleteline_toggel);
  };

  const crosshairfn = () => {
    // console.log("34")
    if (crosshairtoggle == false) {
      settoggelhzline(false);
      settdeleteline_toggel(false);
      // dispatch(setzoomtoggel());
    }
    // else{
    //   d3.selectAll("#crosshair").style('display', 'none')
    // }

    setcrosshairtoggle(!crosshairtoggle);
  };

  d3.select("#H_line")
    .on("click", hzline)
    .style("background-color", line_state == true ? "#B4BEC4" : "white");

  d3.select("#delete_horizontal")
    .on("click", delhzline)
    .style("background-color", deleteline_toggel == true ? "#B4BEC4" : "white");

  d3.select("#crosshairbtn")
    .on("click", crosshairfn)
    .style("background-color", crosshairtoggle == true ? "#B4BEC4" : "white");

  // console.log("linedata22", linedata,)
  // //    temp_lincoor
  //    );
  // console.log("rendorcfbgfnb");
  return (
    <> 
  
      <g id="ID_crosshair" 
      // style={{ display: "none" }}
      ref={ref}>
        {/* <line
          id="focusLineX"
          className="focusLine"
          opacity={crosshairtoggle ? 1 : 0}
         
        >
          {" "}
        </line> */}

        <line
          id="focusLineY"
          className="focusLine"
          opacity={crosshairtoggle ? 1 : 0}
        >
          {" "}
        </line>
        
      </g>
    </>
  );
}

export default InteractiveLine;
