import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as d3 from "d3";

const LastLinelavel = ({ data, xScale, yScale, xScaleband, xScaleLinear }) => {
  
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [lastline, setlastline] = useState({});
  const [xlocation, setxlocation] = useState(data.length - 1);

  const { width, margin, widthchart, heightchart } = useSelector(
    (state) => state.dimensionReducer
  );

  useEffect(() => {
    var lastlinedata = data.slice(-1)[0];
    // console.log('lastline',data.length);

    setlastline(lastlinedata);
    setxlocation(data.length - 1)
  }, [data, xScale, yScale, xScaleLinear.range(), data.length,xScaleband.range()]);


  if (data.length == 0 || lastline==undefined) {
    console.log("return nulll from lastlevel");
    <div >

    </div>
    return null;
  }
  return (
    <>
      <div>
{/* {console.log(lastline)} */}
    </div>

      <g id="ID_labelline" ref={ref}>
        {/* <line x1="0" y1="200" x2="800" y2="200" stroke="black" /> */}

        <line
          key={"ID_labelline_line"}
          id={"ID_labelline"}
          //   className="focusLine"
          x1={xScaleLinear(xlocation)}
          y1={yScale(lastline.close)}
          x2={xScaleLinear(widthchart)}
          y2={yScale(lastline.close)}
          opacity={1}
          stroke="black"
          strokeDasharray="4 1"
        ></line>

        <text x={xScaleLinear(xlocation)+margin.padding_right-50} y={yScale(lastline.close)} fill="black">
        {lastline.close}
        </text>

        {/* {linedata &&
          linedata.map(({ ID, x1, x2, y1, y2 }) => (
            <line
              key={ID}
              id={ID}
            //   className="I_line"
              x1={xScaleLinear(x1)}
              y1={yScale(y1)}
              x2={xScaleLinear(x2)}
              y2={yScale(y2)}
              opacity={1}
              stroke="red"
            ></line>
          ))} */}
      </g>
    </>
  );
};

export default LastLinelavel;
