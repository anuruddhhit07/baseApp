import React, { Component } from 'react';
import LineChart from './Example/Linechart';
import {timesereisdataimpression} from "./Dummydata/dummydata"

// let data = [
//     { date: 20220101, impressions: 100 },
//     { date: 20220102, impressions: 120 },
//     // ... truncated but you get it
//   ];

let data=timesereisdataimpression()
console.log(data);

export default class EnterApi extends Component {
  render() {
    return (
      <div>
        hell
        <LineChart Data={data} data_type="campaign_impressions" />
      </div>
    );
  }
}
