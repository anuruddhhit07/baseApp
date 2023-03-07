import React ,{ useRef,useEffect }from "react";
import * as d3 from "d3";



const Axis = ({range,scale,data,orient,classd,translated}) => {
    const ref = useRef(null);

console.log(translated);

    useEffect(()=>{
        renderAxis()
    },[range,scale,data,orient,classd,translated])

    const renderAxis=()=> {

     

       
        if (orient=='bottom'){

            var tickValues = scale.domain()
            // .filter(function(d, i) { return !((i + 1) % Math.floor(scale.domain().length / 10)); })
            .filter(function(d, i) { return i })

            var AxisGenerator = d3.axisBottom(scale)
            .tickFormat(
               (d,i) => {
                //    console.log(d,i);
                   return i
               }
             )
            //  .tickFormat(d3.timeFormat("%Y-%m-%d"))
            // .tickFormat(multiFormat)
            // .tickValues(tickValues);
            // .tickValues("|")
            // .tickFormat((date)=>multiFormat(date))
            //var xAxisGrid = d3.axisBottom(props.scale).tickSize(-200).tickFormat('').ticks(10);
           // .innerTickSize(-200)
            // .tickFormat(multiFormat())

            var axis =d3.select(ref.current).call(AxisGenerator).attr("clip-path", "url(#clipping)")
        }

        // if (props.orient=='top'){
        //     var AxisGenerator = d3.axisTop(props.scale) 
        //     var axis =d3.select(ref.current).call(AxisGenerator).attr("clip-path", "url(#clipping)")
        // }

        if (orient=='left'){
            var AxisGenerator = d3.axisLeft(scale)
            var axis =d3.select(ref.current).call(AxisGenerator)
            // .attr("clip-path", "url(#clipping)")
        }

        if (orient=='right'){
            var AxisGenerator = d3.axisRight(scale)
            var axis =d3.select(ref.current).call(AxisGenerator) 
            // .attr("clip-path", "url(#clipping)")
        }
           
        
        
    
    }


    

    var formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

function multiFormat(date) {
  return (d3.timeSecond(date) < date ? formatMillisecond
      : d3.timeMinute(date) < date ? formatSecond
      : d3.timeHour(date) < date ? formatMinute
      : d3.timeDay(date) < date ? formatHour
      : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
      : d3.timeYear(date) < date ? formatMonth
      : formatYear)(date);
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

    return <g className={classd} ref={ref} 
    transform={translated}
    ></g>;

}

export default Axis;