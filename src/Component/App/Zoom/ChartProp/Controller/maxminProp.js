import { useMemo } from "react";
import * as d3 from "d3";
 
const maxminProp  = ( data) => {
console.log('data',data);
data.forEach(function (d) {
    d.time = new Date(d.time * 1000);
  });
  
  const xMin =d3.min(data, function (d) {
    return Math.min(d.time);
  });
  const xMax = d3.max(data, function (d) {
    return Math.max(d.time);
  })

  return {xMin,xMax}

}

export default maxminProp;