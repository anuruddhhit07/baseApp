import { useMemo } from "react";
import * as d3 from "d3";
import { scaleBandInvert } from "../helper/utilityfn";
import configureStore from "../Store/store";
const store = configureStore();

// console.log('status',store.getState().dimensionReducer.width);

const useController = ({ data, margin, widthchart, heightchart }) => {
  var width = widthchart;
  var height = heightchart;

  const xMin = useMemo(
    () =>
      d3.min(data, function (d) {
        return Math.min(d.time);
      }),
    [data]
  );
  const xMax = useMemo(
    () =>
      d3.max(data, function (d) {
        return Math.max(d.time);
      }),
    [data]
  );

  // console.log("minmax",xMin,xMax);

  // const xScale = useMemo(
  //   () => d3.scaleTime().domain([xMin, xMax]).rangeRound([margin.padding_left, width+margin.padding_left]).nice(),
  //   [xMin, xMax, width,currentGlobalZoomState]
  // );

  //Use this to draw for calculatiion axis
  const xScale = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((_, index) => index))
        .rangeRound([margin.padding_left, width + margin.padding_left]),
    // .padding(.05),
    [xMin, xMax, width, height, margin]
  );

  const xScaleband = useMemo(
    () =>
      d3
        .scaleBand()
        .domain(data.map((d) => d.time))
        .rangeRound([margin.padding_left, width + margin.padding_left]),
    // .padding(.05),
    [xMin, xMax, width, height, margin]
  );

  const xScaleLinear = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, data.length])
        .rangeRound([margin.padding_left, width + margin.padding_left]),
    // .clamp(true),
    // .padding(.05),
    [xMin, xMax, width, height, margin]
  );

  // console.log("range",[margin.padding_left, width+margin.padding_left]);
  // const parseDate = d3.timeParse("%s");
  // console.log('data',data);
  // var valuesForXAxis = data.map(function (d){return parseDate(d.unixtime)});

  // Add an ordinal scale
  // var xScale = d3.scaleBand()
  // .domain(d3.map(data, function(d) { return d.time; }))
  // .rangeRound([margin.padding_left, width+margin.padding_left]);

  //   // var valuesForXAxis = data.map(function (d){return d.time});

  // console.log('valuesForXAxis',valuesForXAxis);

  //  var xScale11 = useMemo(
  //  ()=>d3.scaleBand()
  //  .domain(d3.map(data, function(d) { return d.time; }))
  //  .rangeRound([margin.padding_left, width+margin.padding_left])
  //  [xMin, xMax, width,currentGlobalZoomState]
  //   );

  //https://stackoverflow.com/questions/26128148/d3-barchart-first-bar-overlaps-axis-label
  //const xScale11 = useMemo(
  // () => d3.scaleOrdinal()
  //  .domain(data.map(function(d) {return d.time}))
  //  .rangeRoundBands([margin.padding_left, width+margin.padding_left ]),
  //   [xMin,xMax,width,currentGlobalZoomState]
  //  )

  // console.log(currentGlobalZoomState);

  const xScaleunix = useMemo(
    () => d3.scaleLinear().domain([xMin, xMax]).range([0, width]),
    [xMin, xMax, width]
  );

  // console.log(xScaleunix(xMin),xScaleunix(xMax));

  // console.log(scalebandrange);

  // console.log([xScaleLinear.invert(margin.padding_left),xScaleLinear.invert(width+margin.padding_left)]);
  // console.log([scaleBandInvert(xScale)(margin.padding_left),scaleBandInvert(xScale)(width+margin.padding_left)]);
  // console.log([scaleBandInvert(xScaleband)(margin.padding_left),scaleBandInvert(xScaleband)(width+margin.padding_left)]);

  // const minindex=scaleBandInvert(xScale)(margin.padding_left)
  // const maxindex=scaleBandInvert(xScale)(width+margin.padding_left)

  const minindex = d3.max([
    Math.floor(xScaleLinear.invert(margin.padding_left)),
    1,
  ]);
  const maxindex = d3.max([
    Math.floor(xScaleLinear.invert(width + margin.padding_left)),
    minindex + 1,
  ]);

  // console.log("range",[minindex,maxindex]);
  //    var newData =data;
  var newData = [];
  newData = data.slice(minindex, maxindex);

  // console.log(newData);

  const yMin = useMemo(
    () =>
      d3.min(newData, function (d) {
        return Math.min(d.low);
      }),
    [newData]
  );
  const yMax = useMemo(
    () =>
      d3.max(newData, function (d) {
        return Math.max(d.high);
      }),
    [newData]
  );
  const yScaleForAxis = useMemo(() => {
    const indention = (yMax - yMin) * 0.5;
    return d3
      .scaleLinear()
      .domain([yMin - indention, yMax + indention])
      .range([height, 0]);
  }, [height, yMin, yMax]);

  // console.log("hii",[yMin,yMax])
  const yScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([yMin - yMin * (0.5 / 100), yMax + yMax * (0.5 / 100)])
        .range([height, 0])
        .nice(),
    [height, yMin, yMax]
  );
  const yTickFormat = (d) =>
    `${parseFloat(d) > 0 ? "+" : ""}${d3.format(".2%")(d / 100)}`;

  return {
    yTickFormat,
    xScale,
    xScaleunix,
    yScale,
    yScaleForAxis,
    xScaleband,
    xScaleLinear,
  };
};

export default useController;
