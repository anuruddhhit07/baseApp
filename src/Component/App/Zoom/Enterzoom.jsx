import React, { useEffect, useReducer, useRef, useMemo, useState } from "react";


import { createStore } from "redux";

import { Provider } from "react-redux";

import reducer from './Reducerstore/index'
import ZoomieCanvas from "./ZoomieCanvas";
import { testdata, timesereiohlc } from "./Dummydata/dummydata";




const data=timesereiohlc()
console.log(data);


const ZoomieCircle = () => {
  const store = createStore(reducer);
  const [data, setData] = useState(null);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);
  const [togglestate, settogglestate] = useState(true);


  // const xMin=1387212120000
  // const xMax=1387212570000
  // store.dispatch({ type: "XScale" , payload:{xMin,xMax,width}})
 

  useEffect(fetchData, []);
  useEffect(initVis, [data]);

  function fetchData() {
    console.log(timesereiohlc());
    setData(timesereiohlc());
  }

  function initVis() {
    console.log("cgvfdhbgfnjhgm");
  store.dispatch({ type: "init" , payload:data})
  const xMin=1387212120000
  const xMax=1387212570000
  store.dispatch({ type: "XScale" , payload:{xMin,xMax,width}})
  console.log('hgkujyhlk',store.getState())
  settogglestate(!togglestate)
  }


  // const data=store.getState().datareducer.data
  // console.log(data);
  // const prop=useMaxminProp(data)
  
  
  // store.dispatch({ type: 'init', payload: prp });
  // console.log(store.getState())
// 

  return (
    <div >
      {console.log(store.getState())}
      {console.log( "AAAAAAAAA",togglestate,store.getState().axisReducer) }

      {"hi"}

      { togglestate &&
      (<Provider store={store}>
        <ZoomieCanvas />
      </Provider>)

}
    </div>
  );
};




export default ZoomieCircle;
