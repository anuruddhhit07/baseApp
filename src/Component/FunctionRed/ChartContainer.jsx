// https://codepen.io/coquin/pen/BNpQoO//

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getData, setDim,setchartprop } from "./Action/data_ac";
import {
  getData,
  setDim,
  setchartprop,
  setzoomstate,
  setzoomstateyz,
  setzoomstatexz,
  setzoomtoggel,
  setdatalimitincrese,
  setdatalimitdecrese,

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
import {scaleBandInvert} from "./helper/utilityfn"

const ChartContainer = () => {
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  const runonce=useRef(0)
  //const tooltipref=useRef();

  const data = useSelector((state) => state.dataReducer?.data);
  const counter = useSelector((state) => state.dataLimitReducer.count);

  console.log("counter",data);

  console.log("counter",counter);


  const drawlinetype = useSelector(
    (state) => state.chartpropReducer?.drawlinetype
  );

  const { width, height, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  const isToggledzoom = useSelector(
    (state) => state.chartpropReducer?.isToggledzoom
  );

  const [fecthsource, setfecthsource] = useState("mysql");
  const [isToggled, toggle] = useState(false);
  const [start, setstart] = useState(false);

  const [scalebandrange, setscalebandrange] = useState(null);

  const { xScale, yScale, xScaleband } = useController({
    data,
    width,
    height,
    margin,
    scalebandrange
  });

  useEffect(()=>{
    console.log("Run once")
    setstart(true)
    dispatch(getData(fecthsource,counter))
  },[runonce])
 
  useEffect(() => {
    // console.log("gfdgdgfh",scalebandrange);
    // // setstart(true);
    if (scalebandrange) {
      // console.log("New range",scalebandrange);
      xScaleband.range(scalebandrange);
      xScale.range(scalebandrange);

      // yScale.range([400,-400])
    }
  }, [data, width, margin, scalebandrange]);


  useEffect(() => {
    //from local or fetch
    dispatch(getData(fecthsource,counter));
  }, [fecthsource,counter]);



  const setwidth = (wi_inc, hi_inc, opert) => {
    dispatch(setDim(wi_inc, hi_inc, opert));
  };

  const toggledatasource = () => {
    toggle(!isToggled);
    
    if (isToggled) {
      setfecthsource("mysql");
      // setfecthsource("local");
    } else {
      setfecthsource("local");
      // setfecthsource("mysql");
    }
  };

  const togglezoom = () => {
    // settogglezoom(!isToggledzoom);
    dispatch(setzoomtoggel());
  };

  const togglelinetype = () => {
    dispatch(
      setchartprop({
        drawlinetype: drawlinetype == "HZ_LINE" ? "GZ" : "HZ_LINE",
      })
    );
  };

  if (data.length == 0) {
    console.log("return nulll");
    return null;
  }
console.log('counter',counter);
  return (
    <>
    {console.log(data)}
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


        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() =>dispatch(setdatalimitincrese(10)) }
        >
          I+
        </button>

        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() =>dispatch(setdatalimitdecrese(10)) }
        >
          D-
        </button>

      </div>

      <div id="tooltipid" style={{ opacity: 0 }}>
        {" "}
        T
      </div>
      <div>
       {counter}
      </div>

      <ZoomCanvas
        data={data}
        xScale={xScale}
        yScale={yScale}
        xScaleband={xScaleband}
        width={width}
        height={height}
        widthchart={widthchart}
        heightchart={heightchart}
        margin={margin}
        scalebandrange={scalebandrange}
        handlescalband={setscalebandrange}
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
