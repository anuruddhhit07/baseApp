import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { useSelector, useDispatch } from "react-redux";
// https://stackoverflow.com/questions/65916866/setting-ticks-on-a-time-scale-during-zoom
const Axis = ({ range, scale, data, orient, classd, translated,widthchart,xScaleband }) => {
  const ref = useRef(null);

  const { width,height,margin, heightchart,xzoomrange } = useSelector(
    (state) => state.dimensionReducer
  );

//   const refdata = useRef(data);

  // console.log(data);

  useEffect(() => {
    // refdata.current=data
    renderAxis();
  }, [range, scale, data, orient, classd, translated,widthchart]);

  const renderAxis = () => {
    if (orient == "bottom") {

      var labelSize = 50; // largest label is 23 pixels ("May")
      var maxTotalLabels = Math.floor(widthchart / labelSize);

        // console.log("hi",scale(0)-scale(1),scale(45)-scale(44))
        const tickwidth=((scale(1)-scale(0)))
        // const numberoftick0=Math.floor(tickwidth)
        // const numberoftick1=Math.floor(widthchart/tickwidth)
        // console.log("numberoftick",[numberoftick0,numberoftick1])
        // console.log(Math.floor(scale.invert(widthchart))-Math.floor(scale.invert(0)))
     //   console.log('scales',data.length,scale.invert(margin.left),scale.invert(widthchart+margin.left),xScaleband.bandwidth());
        const tickcount=Math.floor(scale.invert(widthchart+margin.left)-scale.invert(margin.left))
        //console.log("ticket width",tickwidth,scale.ticks().length,maxTotalLabels);

      //  const totel_tick_count=Math.floor(scale.invert(widthchart+margin.left)-scale.invert(margin.left))
        
       // const allticknumber=totel_tick_count*labelSize

        //console.log('totla tick size',allticknumber);
       // console.log('allowable max tick number',maxTotalLabels);
        // console.log(d3.interpolateArray([12, 3], [4, 5, 6])(0.2));

        const factorr=(xvale)=>{
           var fac=(data.length-xvale)/(data.length-2)
          var fac2=maxTotalLabels-(fac*(maxTotalLabels-data.length))
         return fac2
         }

         console.log('tickcount',factorr(tickcount));
         
         if (data.length>0){
         //console.log("datatat",data)
        
      //console.log("ghhh",data[0].unixtime)
         
         const diff=data[1].unixtime-data[0].unixtime
       
       const year_diff=Math.floor(diff/(3600*24*365))
           const month_diff=Math.floor(diff/(3600*24*30))
          const week_diff=Math.floor(diff/(3600*24*7))
          const day_diff= Math.floor(diff/(3600*24))
          const hours_diff = Math.floor(diff/3600);
          const mins_diff = Math.floor((diff % 3600)/60)
          const secs_diff = diff%60;
  console.log("diff",day_diff,hours_diff,mins_diff,secs_diff)
       
         }
      // console.log(data);
      var xValues = data.map(function(d,i){return i});
      console.log(xValues);
      // const ticksnumer= totel_tick_count>50 ? 10:totel_tick_count
    //  var tickValues = scale
    //    .domain()
    //     // .filter(function(d, i) { return !((i + 1) % Math.floor(scale.domain().length / 10)); })
    //    .filter(function (d, i) {
    //      return i;
    //    });

      var AxisGenerator = d3
        .axisBottom(scale)
        //.ticks(totel_tick_count>maxTotalLabels ? maxTotalLabels:data.length)
        // .ticks(tickwidth*scale.ticks().length)
        .ticks(factorr(tickcount))
        .tickFormat((i) => multiFormat(i));

      var axis = d3
        .select(ref.current)
        .call(AxisGenerator)
        .attr("clip-path", "url(#clipping)");
    }

    // if (props.orient=='top'){
    //     var AxisGenerator = d3.axisTop(props.scale)
    //     var axis =d3.select(ref.current).call(AxisGenerator).attr("clip-path", "url(#clipping)")
    // }

    if (orient == "left") {
      var AxisGenerator = d3.axisLeft(scale);
      var axis = d3.select(ref.current).call(AxisGenerator);
      // .attr("clip-path", "url(#clipping)")
    }

    if (orient == "right") {
      var AxisGenerator = d3.axisRight(scale);
      var axis = d3.select(ref.current).call(AxisGenerator);
      // .attr("clip-path", "url(#clipping)")
    }
  };

  var formatMillisecond = d3.timeFormat(".%L"),
    formatSecond = d3.timeFormat(":%S"),
    formatMinute = d3.timeFormat("%I:%M"),
    formatHour = d3.timeFormat("%I %p"),
    formatDay = d3.timeFormat("%a %d"),
    formatWeek = d3.timeFormat("%b %d"),
    formatMonth = d3.timeFormat("%B"),
    formatYear = d3.timeFormat("%Y");

 

  function multiFormat(index) {
    // console.log(data.length);
    // console.log(data);
    //   return index < refdata.current.length? (d3.timeSecond(refdata.current[index].time) < refdata.current[index].time ? formatMillisecond
    //       : d3.timeMinute(refdata.current[index].time) < refdata.current[index].time ? formatSecond
    //       : d3.timeHour(refdata.current[index].time) < refdata.current[index].time ? formatMinute
    //       : d3.timeDay(refdata.current[index].time) < refdata.current[index].time ? formatHour
    //       : d3.timeMonth(refdata.current[index].time) < refdata.current[index].time ? (d3.timeWeek(refdata.current[index].time) < refdata.current[index].time ? formatDay : formatWeek)
    //       : d3.timeYear(refdata.current[index].time) < refdata.current[index].time ? formatMonth
    //       : formatYear)(refdata.current[index].time):null
          if (index < data.length){
            // console.log("Time",[data[index].time,d3.timeSecond(data[index].time)]);
            
          }
          
/*
          return index < data.length? (
           d3.timeSecond(data[index].time) < data[index].time ? formatMillisecond
         : d3.timeMinute(data[index].time) < data[index].time ? formatSecond
         : d3.timeHour(data[index].time) < data[index].time ? formatMinute
         : d3.timeDay(data[index].time) < data[index].time ? formatHour
         : d3.timeWeek(data[index].time)< data[index].time?formatDay
         : d3.timeMonth(data[index].time) < data[index].time ? formatWeek
         : d3.timeYear(data[index].time) < data[index].time ? formatMonth
          : formatYear)(data[index].time)
          :null
          
          */
          
          return index < data.length? (formatWeek)(data[index].time):null
    
  }


  // function tickFormat(val) {
  //   // https://codepen.io/el-sa-mu-el/pen/PoWJPbW
  //   // const ticks = d3.event?.transform?.rescaleX( x )?.ticks()
  
  //   if ( !ticks )
  //     return `${ Math.round(val / 2.628e9) } months`
  
  //   else {
  
  //       const distance = ticks[ ticks.length - 1 ] - ticks[ ticks.length - 2 ]
  
  //       if ( distance <= 10000000 )
  //         return `${ Math.round(val / 3.6e6) } hours`
  //       else if ( distance <= 250000000 )
  //         return `${ Math.round(val / 8.64e7) } days`
  //       else if ( distance <= 1000000000 )
  //         return `${ Math.round(val / 6.048e8) } weeks`
  //       else if ( distance > 1000000000 )
  //         return `${ Math.round(val / 2.628e9) } months`
  
  //   }
    
  // }

  

  return <g className={classd} ref={ref} transform={translated}></g>;
};

export default Axis;
