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

  const xSettings = {
    translate: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: props.xScale,
    orient: "bottom",
    class:"x-axis"
  };
  const ySettings = {
    translate: `translate(${0}, 0)`,
    scale: props.yScale,
    orient: "left",
    class:"y-axis"
  };
  
  const ySettings2 = {
    translate: `translate(${widthchart+margin.padding_right+margin.padding_left}, 0)`,
    scale: props.yScale,
    orient: "right",
    class:"y-axis"
  };
    
     const GridxSettings = {
    translate: `translate(${0}, ${height-margin.bottom-margin.top})`,
    scale: props.xScale,
    orient: "bottom",
    class:"axis-grid",
    length:height
  };
    
    const GridySettings = {
    translate: `translate(${0}, 0)`,
    scale: props.yScale,
    orient: "left",
    class:"axis-grid",
    length:width-margin.left-margin.right
  };
    
  
  
  // console.log('propssss',props,xSettings,props.xScale(0));


  return (
    <g className="xy-axis">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
        <Axis {...ySettings2} />
<GridLines {...GridxSettings}/>
<GridLines {...GridySettings}/>
    </g>
  );
};

export default RendorXY;

