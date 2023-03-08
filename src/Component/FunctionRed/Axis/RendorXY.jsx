import React, { useRef,useEffect } from "react";
import * as d3 from "d3";

import { useSelector, useDispatch } from "react-redux";
import Axis from "./Axis";
import GridLines from "./GridLines"
import "./styles.scss"
const RendorXY= ({data,xScaleband,yScale,xScaleLinear}) => {
    

    const { width, height, margin,widthchart } = useSelector(
        (state) => state.dimensionReducer
      );
// const chart_width=width+margin.padding_left-margin.padding_left
// console.log('dtyd',chart_width,widthchart);
      const newXAxisrange=xScaleband.range()
      const newYAxisrange=yScale.range()

      // console.log("sdgfdhgd",width,widthchart,margin);

  const xSettings = {
    translated: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: xScaleLinear,
    data:data,
    orient: "bottom",
    classd:"x-axis",
    range:newXAxisrange,
    widthchart:widthchart,
    xScaleband:xScaleband
  };
  const ySettings = {
    translated: `translate(${0}, 0)`,
    scale: yScale,
    orient: "left",
    classd:"y-axis",
    range:newYAxisrange,
    xScaleband:xScaleband
  };
  
  const ySettings2 = {
    translated: `translate(${widthchart+margin.padding_right+margin.padding_left}, 0)`,
    scale: yScale,
    orient: "right",
    classd:"y-axis",
    range:newYAxisrange,
    xScaleband:xScaleband
  };
    
     const GridxSettings = {
    translated: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: xScaleLinear,
    data:data,
    orient: "bottom",
    classd:"axis-grid",
    length:height,
    range:newXAxisrange,
    widthchart:widthchart,
    xScaleband:xScaleband
  };
    
    const GridySettings = {
    translated: `translate(${0}, 0)`,
    scale: yScale,
    orient: "left",
    classd:"axis-grid",
    length:width-margin.left-margin.right,
    range:newYAxisrange,
    xScaleband:xScaleband
  };

    useEffect(()=>{
      // console.log("objectfgfhgfh");
      // console.log(newXAxisrange);
      // console.log(newYAxisrange);
    })
  
  
  // console.log('propssss',props,xSettings,props.xScale(0));


  return (
   
    <>
    {/* {console.log("RendorXY",props.xScaleband,props.xScaleband.range())}
    {console.log(xSettings)}
    {console.log(props.xScaleband(props.data[2].time))} */}
    <g id="ID_XYAxis" className="xy-axis">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
        <Axis {...ySettings2} />
<GridLines {...GridxSettings}/>
{/* <GridLines {...GridySettings}/> */}
    </g>
    </>
  );
};

export default RendorXY;

