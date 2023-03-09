import React, { useRef, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

const ListionalComponet = ({data, yScale, xScaleband, xScaleLinear}) => {
  const ref = useRef(null);
  const [svgcoor,setsvgcoor]=useState([])
//   const dispatch = useDispatch();
  // console.log("object", data);
//   const { width, margin, widthchart, heightchart } = useSelector(
//     (state) => state.dimensionReducer
//   );

  const listional=true

  useEffect(() => {
    console.log("ref.current",ref.current);
    if (ref.current && data.length > 0) {
      const svg = d3.select("#listrect");
      svg.on(
        "mousemove",
        listional == true
          ? function (event) {
              mousemove(event, "ID_Listionar");
            }
          : null
      )
    }
  },[data,ref.current,yScale, xScaleband, xScaleLinear]);

  function mousemove(event) {
    console.log(" mouse move");
    var m = d3.pointers(event);
    const corr = m[0];
    setsvgcoor([corr[0],corr[1]])

  }


  return (
    <>
    <div>
        {console.log(svgcoor)}
        
    </div>
      <g id="ID_Listionar" ref={ref}></g>
    </>
  );
};

export default ListionalComponet;
