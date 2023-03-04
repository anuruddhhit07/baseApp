import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, setDim,setchartprop } from "./Action/data_ac";
// import useController from "./Controller/Controller";
import ZoomCanvas from "./Container/ZoomCanvas";
import Circle from "./Shape/Circle";
import LineChart from "./Shape/LineChart";
import RendorXY from "./Axis/axisProp";
import CandlestickChart from "./Shape/Candlestick";
import InteractiveLine from "./Shape/InteractiveLine";
import Drawline from "./Shape/Drawline";
import "./mainstyles.scss";
import "./toggle_styles.scss";

const ChartContainer = () => {
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataReducer?.data);
  const drawlinetype = useSelector((state) => state.chartpropReducer?.drawlinetype);

  const [fecthsource, setfecthsource] = useState("local");
  const [isToggled, toggle] = useState(false);
  const [isToggledzoom, settogglezoom] = useState(false);

  
// console.log('drawlinetype',drawlinetype);
  
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
    dispatch(setchartprop({drawlinetype: drawlinetype=='HZ_LINE'?"GZ":'HZ_LINE'}))
  };

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


        <button className="btn " id="reset"> R </button>
        <button className="btn " id="panLeft"> PL </button>
        <button className="btn " id="panRight"> PR </button>
        <button className="btn "id="center"> C </button>
        <button className="btn " id="H_line">Line</button>
        <button className="btn " id="delete_horizontal">DEL</button>
        <button className="btn" id="crosshairbtn"> CR </button>


        {/* <button className="sqaure-button sqaure-button_charttype" id="reset"> R </button>
        <button className="sqaure-button sqaure-button_charttype" id="panLeft"> PL </button>
        <button className="sqaure-button sqaure-button_charttype" id="panRight"> PR </button>
        <button className="sqaure-button sqaure-button_charttype" id="center"> C </button>
        <button className="sqaure-button sqaure-button_charttype" id="H_line">Line</button>
        <button className="sqaure-button sqaure-button_charttype" id="delete_horizontal">DEL</button> */}
        
        {/* <button class="btn edit btn-primary">Modify</button>
        <button class="btn save btn-primary">Save</button> */}
        {/* <button className="btn ">Modify</button> */}
        {/* <button class="btn edit btn-primary" /> */}
        {/* <button > Button <i className='fas fa-angle-double-down'></i> </button> */}

      </div>

      

      

      <ZoomCanvas data={data} isToggledzoom={isToggledzoom}>
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
