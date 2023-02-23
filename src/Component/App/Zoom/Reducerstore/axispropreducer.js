import * as d3 from "d3";


const initialState = {
    orient: 0,
    xScale:null
  };
  
  export default function axisReducer(state = initialState, action) {

  console.log('action',action);
  console.log(action.type);
  // console.log(action.payload);

    switch (action.type) {
      case 'XScale':
        console.log("here in xscalee");
        return {
            orient: action.payload.a,
            xScale: d3.scaleTime().domain([action.payload.xMin, action.payload.xMax]).range([0, action.payload.width])
        };
      case 'YScale':
        return {
          orient: action.payload,
          xScale: state.xScale.push(action.payload) 
        };
      default:
        console.log("here in default");
        return state;
    }
  }

  // const xScale = useMemo(
  //   () => d3.scaleTime().domain([xMin, xMax]).range([0, width]),
  //   [xMin, xMax, width]
  // );

  
  // d3.scaleBand()
  // .domain(data.map(d => d.country))
  // .range([0, width]



// import { createStore } from 'redux';
// const store = createStore(reducer);
// store.dispatch({ type: 'INCREMENT', payload: 5 });
// console.log(store.getState()); // { count: 5 }
// store.dispatch({ type: 'DECREMENT', payload: 2 });
// console.log(store.getState()); // { count: 3 }