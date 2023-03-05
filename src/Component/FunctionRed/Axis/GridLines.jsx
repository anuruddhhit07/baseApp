
import React ,{ useRef,useEffect }from "react";
import * as d3 from "d3";



const GridLines = (props) => {
    const ref = useRef(null);


    useEffect(()=>{
        renderAxis()
    },[props.scale])

    const renderAxis=()=> {

       
        if (props.orient=='bottom'){
      //      var AxisGenerator = d3.axisBottom(props.scale).ticks(5)
            var Axisgrid = d3.axisBottom(props.scale).tickSize(-200).tickFormat('').ticks(10);
           // .innerTickSize(-200)
            // .tickFormat(multiFormat())
        }

        if (props.orient=='top'){
           // var AxisGenerator = d3.axisTop(props.scale) 
            var Axisgrid = d3.axisTop(props.scale).tickSize(200).tickFormat('').ticks(10);
        }

        if (props.orient=='left'){
           // var AxisGenerator = d3.axisLeft(props.scale)
            var Axisgrid = d3.axisLeft(props.scale).tickSize(200).tickFormat('').ticks(10);
        }

        if (props.orient=='right'){
           // var AxisGenerator = d3.axisRight(props.scale) 
            var Axisgrid = d3.axisRight(props.scale).tickSize(-200).tickFormat('').ticks(10);
        }
           
        
        var axis =d3.select(ref.current).call(Axisgrid)
       // axis.append("g").call(xAxisGrid)
      }



    //   const getFormat=()=> {
    //     if (26 < 25) {
    //       return d3.timeFormat('%H:%M');
    //     } else {
    //       return d3.timeFormat('%d/%m %H:%M');
    //     }
    //   }

    // const multiFormat=(date)=> {
    //     return (d3.timeSecond(date) < date ? formatMillisecond
    //         : d3.timeMinute(date) < date ? formatSecond
    //         : d3.timeHour(date) < date ? formatMinute
    //         : d3.timeDay(date) < date ? formatHour
    //         : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
    //         : d3.timeYear(date) < date ? formatMonth
    //         : formatYear)(date);
    //   }

    return <g className={props.class} ref={ref} transform={props.translate}></g>;

}

export default GridLines;