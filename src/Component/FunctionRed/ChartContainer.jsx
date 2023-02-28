import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData, setDim } from "./Action/data_ac";
// import useController from "./Controller/Controller";
import ZoomCanvas from "./Container/ZoomCanvas";
import Circle from "./Shape/Circle";
import LineChart from "./Shape/LineChart";
import RendorXY from "./Axis/axisProp";
import CandlestickChart from "./Shape/Candlestick";
import "./styles.scss";

const ChartContainer = () => {
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  const data = useSelector((state) => state.dataReducer?.data);

  const [fecthsource, setfecthsource] = useState("mysql");
  const [isToggled, toggle] = useState(true);
  // console.log("intilize data", data[0]);

  useEffect(() => {
    //from local or fetch
    dispatch(getData(fecthsource));
  }, [fecthsource]);

  const setwidth = (wi_inc, hi_inc, opert) => {
    dispatch(setDim(wi_inc, hi_inc, opert));
  };

  const toggledatasource = () => {
    toggle(!isToggled);
    if (isToggled){
      setfecthsource("mysql")
    }
    else {
      setfecthsource("local")
    }
  };

  return (
    <>
      <div>
        <button onClick={() => setwidth(10, 10, 1)}>++</button>
        <button onClick={() => setwidth(10, 10, -1)}>--</button>
        <label>
          <input
            type="checkbox"
            defaultChecked={isToggled}
            onClick={toggledatasource}
          />
          <span></span>
          <strong>{"DS"}</strong>
        </label>
      </div>
      {/* {fecthsource} */}

      <ZoomCanvas data={data}>
        <Circle key={"cir"} />
        <RendorXY />
        {/* <LineChart /> */}
        <CandlestickChart />
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
