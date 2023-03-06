// https://codepen.io/coquin/pen/BNpQoO//

import React, { useState, useEffect, useRef,useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getData, setDim,setchartprop } from "./Action/data_ac";
import {
  getData,
  setDim,
  setchartprop,
  setzoomstate,
  setzoomstateyz,
  setzoomstatexz,
} from "./Action/data_ac";
import useController from "./Controller/Controller";
import ZoomCanvas from "./Container/ZoomCanvas";
import Circle from "./Shape/Circle";
import LineChart from "./Shape/LineChart";
import RendorXY from "./Axis/RendorXY";
import CandlestickChart from "./Shape/Candlestick";
import InteractiveLine from "./Shape/InteractiveLine";
import Drawline from "./Shape/Drawline";
import "./mainstyles.scss";
import "./toggle_styles.scss";
import * as d3 from "d3";

const ChartContainer = () => {
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  //const tooltipref=useRef();
  const data = useSelector((state) => state.dataReducer?.data);
  const drawlinetype = useSelector(
    (state) => state.chartpropReducer?.drawlinetype
  );

  const { width, height, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const currentGlobalZoomState = useSelector(
    (state) => state.chartpropReducer?.currentGlobalZoomState
  );
  const currentXZoomState = useSelector(
    (state) => state.chartpropReducer?.currentXZoomState
  );
  const currentYZoomState = useSelector(
    (state) => state.chartpropReducer?.currentYZoomState
  );

  const [fecthsource, setfecthsource] = useState("local");
  const [isToggled, toggle] = useState(false);
  const [isToggledzoom, settogglezoom] = useState(false);
  const [start, setstart] = useState(false);

 
 
    const { xScale, yScale,xScaleband } = useController({
      data,
      width,
      height,
      margin,
      currentGlobalZoomState,
    });
  

   
         



// 
  if (currentXZoomState) {
    const newXScale = currentXZoomState.rescaleX(xScale);
    xScale.domain(newXScale.domain());

    // const newXScaleBand = currentXZoomState.rescaleX(xScaleband);
    // xScaleband.domain(newXScaleBand.domain());


  }

  if (currentYZoomState) {
    const newYScale = currentYZoomState.rescaleY(yScale);
    yScale.domain(newYScale.domain());
  }

  useEffect(() => {
    setstart(true)
   
   
   
  }, [data]);


  if (start){
    console.log(data[1].time);
    console.log(xScaleband.bandwidth());
    console.log(xScaleband(data[0].time));
   
  }

  useEffect(() => {
    //from local or fetch
    dispatch(getData(fecthsource));
  }, [fecthsource]);

  const setwidth = (wi_inc, hi_inc, opert) => {
    dispatch(setDim(wi_inc, hi_inc, opert));
  };

  const toggledatasource = () => {
    toggle(!isToggled);
    if (isToggled) {
      setfecthsource("mysql");
    } else {
      setfecthsource("local");
    }
  };

  const togglezoom = () => {
    settogglezoom(!isToggledzoom);
  };

  const togglelinetype = () => {
    dispatch(
      setchartprop({
        drawlinetype: drawlinetype == "HZ_LINE" ? "GZ" : "HZ_LINE",
      })
    );
  };

  if (data.length == 0) {
    return null;
  }

  return (
    <>
      <div className="toppanelbox">
        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() => setwidth(10, 10, 1)}
        >
          +
        </button>
        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() => setwidth(10, 10, -1)}
        >
          -
        </button>

        <label className="toggle">
          <input
            type="checkbox"
            defaultChecked={isToggled}
            onClick={toggledatasource}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Test Data" data-off="Mysql"></span>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            defaultChecked={isToggledzoom}
            onClick={togglezoom}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Zoom On" data-off="Zoom Off"></span>
        </label>

        <label className="toggle">
          <input
            type="checkbox"
            defaultChecked={"HZ_LINE"}
            onClick={togglelinetype}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Hz" data-off="Gl"></span>
        </label>

        <button className="btn " id="reset">
          {" "}
          R{" "}
        </button>
        <button className="btn " id="panLeft">
          {" "}
          PL{" "}
        </button>
        <button className="btn " id="panRight">
          {" "}
          PR{" "}
        </button>
        <button className="btn " id="center">
          {" "}
          C{" "}
        </button>
        <button className="btn " id="H_line">
          Line
        </button>
        <button className="btn " id="delete_horizontal">
          DEL
        </button>
        <button className="btn" id="crosshairbtn">
          {" "}
          CR{" "}
        </button>
      </div>

      <div id="tooltipid" style={{ opacity: 0 }}>
        {" "}
        T
      </div>

      <ZoomCanvas
        data={data}
        isToggledzoom={isToggledzoom}
        xScale={xScale}
        yScale={yScale}
        width={width}
        height={height}
        widthchart={widthchart}
        heightchart={heightchart}
        margin={margin}
        currentGlobalZoomState={currentGlobalZoomState}
      >
        {/* <Circle key={"cir"} /> */}

        <RendorXY />
        <LineChart />
        <CandlestickChart />
        <InteractiveLine />
        <Drawline />
      </ZoomCanvas>
    </>
  );
};

export default ChartContainer;

// {data.map((row, index) => (
//   <p key={index}>
//     {row.id} {xScale(row.time)} :: {yScale(row.close)}
//     {/* {row.time.date} {row.open} {row.high} {row.low} {row.close} */}
//   </p>
// ))}
