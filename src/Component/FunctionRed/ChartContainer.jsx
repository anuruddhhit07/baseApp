import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getData,setDim } from "./Action/data_ac";
import useController from "./Controller/Controller";

const ChartContainer = () => {
  
  //this hook allows us to access the dispatch function
  const dispatch = useDispatch();
  //here we declare what we want to take from the redux store with the useSelector() hook
  //every time one of these properties is updated on the store, our component will re-render to reflect it
  const loading = useSelector((state) => state.dataReducer?.loading);
  const data = useSelector((state) => state.dataReducer?.data);
  const errorMessage = useSelector((state) => state.dataReducer.error);

  const {width,height,margin} = useSelector((state) => state.dimensionReducer);

  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);

  console.log('intilize data',data);

  const {xScale,yScale}=useController({data,width,height,margin})
  console.log('intilize constorl',xScale,yScale);
  

  useEffect(() => {
    dispatch(getData());

   

  }, []);

 

  const setwidth=()=>{
    dispatch(setDim());
  }

  return (
    
    <div>
      {console.log(width,height,margin)}
      {/* {xScale(1549943100)} */}
      <button onClick={setwidth}>
      Click me!
    </button>
      ChartContainer1
      {data.map((row, index) => (
        <p key={index}>{row.id} {xScale(row.time)} ::  {yScale(row.close)}
         {/* {row.time.date} {row.open} {row.high} {row.low} {row.close} */}
          </p>
      ))}
      
    </div>
  );
}

export default ChartContainer;
