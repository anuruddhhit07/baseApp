import React,{useEffect, useRef} from "react"
import { scaleLinear, scaleBand } from 'd3-scale';
import { max } from 'd3-array';
import {format} from 'd3-format';
import {axisBottom, axisLeft} from 'd3-axis'
import { select } from 'd3-selection';

const width = 960;
const height = 500;
const margin = {top: 20, right: 40, bottom: 20, left: 80};
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

const Chart = ({data}) => {
   const svg = useRef(null);
   useEffect(() => {
     renderBar(data)
   }, [data])
   
   const renderBar = (data) => {

      const xValue = d => d.population;
      const yValue = d => d.country;

      const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);

      const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

      const g = select(svg.current).append('g')
      .attr('transform',`translate(${margin.left}, ${margin.top})` );

      const xAxisTickFormat = number =>
        format('.3s')(number)
        .replace('G', 'B');

      const xAxis = axisBottom(xScale)
       .tickFormat(xAxisTickFormat);

      g.append('g').call(axisLeft(yScale));
      g.append('g').call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);

      g
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth())
      .attr('rx', 3)
   }
   return <svg  height={height} width={width} ref={svg} style={{fill: 'steelblue'}} />

}

export default Chart
