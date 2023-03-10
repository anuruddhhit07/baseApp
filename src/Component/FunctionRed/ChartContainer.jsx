// https://codepen.io/coquin/pen/BNpQoO//

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { getData, setDim,setchartprop } from "./Action/data_ac";
import {
  getData,
  changeDim,
  setDim,
  setchartprop,
  setzoomstate,
  setzoomstateyz,
  setzoomstatexz,
  set_X_zoomrange,
  update_X_zoomrange,
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
import { useContainerDimensions } from "./helper/ContainerDimensions";
import LastLinelavel from "./Shape/LastLinelavel";
import ListionalComponet from "./Container/ListionalComponet";

const ChartContainer = () => {
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  const runonce = useRef(0);
  const componentRef = useRef();
  //const tooltipref=useRef();

  // const dimd=[]
  // const dimd = useContainerDimensions(componentRef)

  const data = useSelector((state) => state.dataReducer?.data);
  const counter = useSelector((state) => state.dataLimitReducer.count);

  // console.log("counter",data);

  // console.log("counter",counter);

  // const drawlinetype = useSelector(
  //   (state) => state.chartpropReducer?.drawlinetype
  // );

  const { width, height, margin, widthchart, heightchart, xzoomrange } =
    useSelector((state) => state.dimensionReducer);

  const isToggledzoom = useSelector(
    (state) => state.chartpropReducer?.isToggledzoom
  );

  const [fecthsource, setfecthsource] = useState("mysql");
  const [isToggled, toggle] = useState(true);
  const [togglestudymode, settogglestudymode] = useState(true);
  const [start, setstart] = useState(false);
  const [dimensions, setDimensions] = useState({
    width_container: 400,
    height_container: 500,
  });
  const [scalebandrange, setscalebandrange] = useState(null);

  const { xScale, yScale, xScaleband, xScaleLinear } = useController({
    data,
    margin,
    widthchart,
    heightchart,
    xzoomrange,
  });

  useEffect(() => {
    console.log("Run once");
    // console.log(data);
    // console.log(dimensions.width_container);
    setstart(true);
    dispatch(getData(fecthsource, counter));
  }, [runonce]);

  // useEffect(() => {
  //   console.log("Run after start once");
  //   // console.log(dimensions.width_container);
  //   // setstart(true);
  //   // dispatch(getData(fecthsource, counter));
  // }, [start]);

  useEffect(() => {
    // console.log("Run componentRef");
    // console.log(componentRef.current)
    // console.log(dimensions);
    const getDimensions = () => ({
      width_container: componentRef.current.offsetWidth - 20,
      height_container: window.innerHeight - 180,
    });
    setDimensions(getDimensions());
  }, [componentRef]);

  useEffect(() => {
    // console.log("currendwidht",dimensions.width_container);
    // console.log(window.innerHeight)
    dispatch(setDim(dimensions.width_container, dimensions.height_container));
    dispatch(set_X_zoomrange());
  }, [dimensions.width_container]);

  useEffect(() => {
    xScaleband.range(xzoomrange);
    xScaleLinear.range(xzoomrange);
    setscalebandrange(xzoomrange);
  }, [xzoomrange]);

  useEffect(() => {
    //from local or fetch
    dispatch(getData(fecthsource, counter));
  }, [fecthsource, counter]);

  const setwidth = (wi_inc, hi_inc, opert) => {
    dispatch(changeDim(wi_inc, hi_inc, opert));
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

  const toggledatafeedrate = () => {
    settogglestudymode(!togglestudymode);
    
  };

  const togglezoom = () => {
    // settogglezoom(!isToggledzoom);
    dispatch(setzoomtoggel());
  };

  // const togglelinetype = () => {
  //   dispatch(
  //     setchartprop({
  //       drawlinetype: drawlinetype == "HZ_LINE" ? "GZ" : "HZ_LINE",
  //     })
  //   );
  // };

  // if (data.length == 0) {
  //   console.log("return nulll");
  //   <div >

  //   </div>
  //   return null;
  // }
  // console.log('counter',counter);
  return (
    <div ref={componentRef}>
      {console.log("togglestudymode",togglestudymode)}
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
          onClick={() => dispatch(setdatalimitdecrese(togglestudymode==true?10:1))}
        >
          D-
        </button>

        <label className="toggle">
          <input
            type="checkbox"
            defaultChecked={togglestudymode}
            onClick={toggledatafeedrate}
          />
          <span className="slider"></span>
          <span className="labels" data-on="Test" data-off="Study"></span>
        </label>

        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() => dispatch(setdatalimitincrese(togglestudymode==true?10:1))}
        >
          I+
        </button>

        

        <button
          className="sqaure-button sqaure-button_charttype"
          onClick={() =>
            dispatch(update_X_zoomrange({ rangemin: -1400, rangemax: 400 }))
          }
        >
          Z
        </button>
        
        
        
        
      </div>

      <div id="tooltipid" style={{ opacity: 1 }}>
        <span id="tooltidate">Date </span>
        <span id="tooltiopen">O: </span>
        <span id="tooltihigh">H </span>
        <span id="tooltilow">L </span>
        <span id="toolticlsoe">C </span>
        {/* <span>My mother has </span> */}
      </div>
      {/* <div>
       {counter}
      </div> */}

      <ZoomCanvas
        data={data}
        xScale={xScale}
        yScale={yScale}
        xScaleLinear={xScaleLinear}
        xScaleband={xScaleband}
        width={width}
        height={height}
        widthchart={widthchart}
        heightchart={heightchart}
        margin={margin}
      >
        {/* <Circle key={"cir"} /> */}

        <RendorXY />
        <LineChart />
        <CandlestickChart />
        <InteractiveLine />
        <Drawline />
        <LastLinelavel />
        <ListionalComponet />
      </ZoomCanvas>
    </div>
  );
};

export default ChartContainer;

// {data.map((row, index) => (
//   <p key={index}>
//     {row.id} {xScale(row.time)} :: {yScale(row.close)}
//     {/* {row.time.date} {row.open} {row.high} {row.low} {row.close} */}
//   </p>
// ))}
