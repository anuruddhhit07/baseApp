import React, { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import * as d3 from 'd3';
import { setLineCoor } from "../Action/data_ac";

// https://stackoverflow.com/questions/54150783/react-hooks-usestate-with-object
// export const InteractiveLine = () => {
function InteractiveLine({ data, xScale, yScale }) {
    const ref = useRef(null);
    const dispatch = useDispatch();
    const [lcoor, setlinecoor] = useState(
        { l1: { x1: null, y1: null, x2: null, y2: null } }
    )

  
  const linedata = useSelector((state) => state.lineReducer);
  console.log('LIIIIIII',linedata)


  useEffect(() => {
    console.log('linedata update',linedata)
}, [linedata])

    useEffect(() => {
        if (ref.current) {
            console.log("first")

            const svg = d3.select("#listrect")
            svg.on("mousedown", mousedown)
                .on("mouseup", mouseup);
        }

    }, [])



    useEffect(() => {
        if (ref.current) {
            console.log("first coor", lcoor)
            const svgl = d3.select(ref.current);
            console.log(lcoor.l1)

            // const dict_key=l1
            const line_coor = lcoor.l1
            const x1 = line_coor.x1
            const y1 = line_coor.y1
            const x2 = line_coor.x2
            const y2 = line_coor.y2
            console.log(x1, x2, y1, y2)

            svgl.append("line")
                .attr("x1", x1)
                .attr("y1", y1)
                .attr("x2", x2)
                .attr("y2", y2)
                .attr('class', 'line')

        }
    }, [lcoor])

    function mousedown(event) {
        console.log("first mouse down")
        var m = d3.pointers(event);
        console.log(m)
        const svg = d3.select("#listrect")
        const corr = m[0]
        // setlinecoor(prevState => ({
        //     ...prevState,
        //     l1: { x1: corr[0], y1: corr[1], x2: 2 * corr[0], y2: corr[1] },
        // }))

        dispatch(setLineCoor());

        console.log('linedataaaaaaaaaaa',linedata)
    }

    function mousemove() {
        console.log(" mouse move")
        // var m = d3.mouse(this);
        // line.attr("x2", m[0])
        //     .attr("y2", m[1]);
    }

    function mouseup() {
        console.log("mouse up")
        // vis.on("mousemove", null);
    }


    console.log('exampleState', lcoor)

    console.log('linedata22',linedata)
    return (

        // <line  ref={ref}  x1="10" y1="10" x2="90" y2="90" stroke-width="1" stroke="black"/>
        // <line ref={ref} strokeWidth="1" stroke="black" />
        <g ref={ref}>
        </g>

    )
}

export default InteractiveLine

