import React, { useRef,useEffect } from "react";
import * as d3 from "d3";

import { useSelector, useDispatch } from "react-redux";
import Axis from "./Axis";
import GridLines from "./GridLines"
import "./styles.scss"
const RendorXY= (props) => {
    

    const { width, height, margin,widthchart } = useSelector(
        (state) => state.dimensionReducer
      );
      const newXAxisrange=props.xScaleband.range()
      const newYAxisrange=props.yScale.range()

      // console.log("sdgfdhgd",props.yScale.range());

  const xSettings = {
    translate: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: props.xScaleband,
    orient: "bottom",
    class:"x-axis",
    range:newXAxisrange
  };
  const ySettings = {
    translate: `translate(${0}, 0)`,
    scale: props.yScale,
    orient: "left",
    class:"y-axis",
    range:newYAxisrange
  };
  
  const ySettings2 = {
    translate: `translate(${widthchart+margin.padding_right+margin.padding_left}, 0)`,
    scale: props.yScale,
    orient: "right",
    class:"y-axis",
    range:newYAxisrange
  };
    
     const GridxSettings = {
    translate: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: props.xScaleband,
    orient: "bottom",
    class:"axis-grid",
    length:height,
    range:newXAxisrange
  };
    
    const GridySettings = {
    translate: `translate(${0}, 0)`,
    scale: props.yScale,
    orient: "left",
    class:"axis-grid",
    length:width-margin.left-margin.right,
    range:newYAxisrange
  };

    // useEffect(()=>{
    //   console.log("objectfgfhgfh");
    // },[rangecheck])
  
  
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
{/* <GridLines {...GridxSettings}/>
<GridLines {...GridySettings}/> */}
    </g>
    </>
  );
};

export default RendorXY;

