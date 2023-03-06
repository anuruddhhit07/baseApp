import * as d3 from "d3";
const testdata = [
  { time: 1387212120, open: 368, close: 300, high: 380, low: 158 },
  { time: 1387212130, open: 330, close: 250, high: 389, low: 310 },
  { time: 1387212140, open: 213, close: 253, high: 289, low: 213 },
  { time: 1387212150, open: 180, close: 150, high: 189, low: 110 },
  { time: 1387212160, open: 310, close: 350, high: 389, low: 310 },
  { time: 1387212170, open: 213, close: 253, high: 289, low: 213 },
  { time: 1387212180, open: 190, close: 150, high: 189, low: 110 },
  { time: 1387212190, open: 362, close: 530, high: 589, low: 510 },
  { time: 1387212200, open: 409, close: 356, high: 300, low: 510 },
  { time: 1387212210, open: 334, close: 275, high: 369, low: 185 },
  { time: 1387212220, open: 304, close: 389, high: 389, low: 310 },
  { time: 1387212230, open: 395, close: 235, high: 289, low: 213 },
  { time: 1387212240, open: 339, close: 148, high: 189, low: 110 },
  { time: 1387212250, open: 310, close: 350, high: 389, low: 310 },
  { time: 1387212260, open: 283, close: 253, high: 289, low: 213 },
  { time: 1387212270, open: 290, close: 350, high: 376, low: 110 },
  { time: 1387212280, open: 448, close: 550, high: 624, low: 510 },
  { time: 1387212290, open: 419, close: 299, high: 194, low: 510 },
  { time: 1387212300, open: 150, close: 163, high: 189, low: 145 },
  { time: 1387212310, open: 330, close: 350, high: 356, low: 310 },
  { time: 1387212320, open: 213, close: 253, high: 289, low: 213 },
  { time: 1387212330, open: 180, close: 150, high: 189, low: 110 },
  { time: 1387212340, open: 310, close: 350, high: 389, low: 310 },
  { time: 1387212350, open: 213, close: 253, high: 289, low: 213 },
  { time: 1387212360, open: 190, close: 150, high: 230, low: 110 },
  { time: 1387212370, open: 408, close: 301, high: 382, low: 245 },
  { time: 1387212380, open: 330, close: 356, high: 404, low: 230 },
  { time: 1387212390, open: 183, close: 143, high: 190, low: 31 },
  { time: 1387212400, open: 183, close: 265, high: 271, low: 165 },
  { time: 1387212410, open: 395, close: 253, high: 424, low: 213 },
  { time: 1387212420, open: 339, close: 379, high: 446, low: 275 },
  { time: 1387212430, open: 310, close: 350, high: 389, low: 310 },
  { time: 1387212440, open: 283, close: 253, high: 289, low: 213 },
  { time: 1387212450, open: 162, close: 350, high: 189, low: 122 },
  { time: 1387212460, open: 452, close: 361, high: 525, low: 329 },
  { time: 1387212470, open: 173, close: 281, high: 312, low: 141 },
  { time: 1387212480, open: 183, close: 265, high: 271, low: 165 },
  { time: 1387212490, open: 395, close: 253, high: 424, low: 213 },
  { time: 1387212500, open: 339, close: 379, high: 446, low: 275 },
  { time: 1387212510, open: 310, close: 350, high: 389, low: 310 },
  { time: 1387212520, open: 283, close: 253, high: 289, low: 213 },
  { time: 1387212530, open: 162, close: 350, high: 189, low: 122 },
  { time: 1387212540, open: 452, close: 361, high: 542, low: 329 },
  { time: 1387212550, open: 173, close: 281, high: 312, low: 91 },
  { time: 1387212560, open: 183, close: 265, high: 271, low: 165 },
  { time: 1387212570, open: 395, close: 253, high: 424, low: 213 },
];

const testdata2 = [
  {
    id: 1001,
    ticker: "BANKNIFTY",
    unixtime: 1549943100,
    open: 27166.9,
    high: 27286.7,
    low: 26988.9,
    close: 27010.8,
    volume: 117431000,
  },
  {
    id: 1002,
    ticker: "BANKNIFTY",
    unixtime: 1550029500,
    open: 27068.8,
    high: 27108,
    low: 26839.1,
    close: 26885.4,
    volume: 112117000,
  },
  {
    id: 1003,
    ticker: "BANKNIFTY",
    unixtime: 1550115900,
    open: 26978,
    high: 27030,
    low: 26818.1,
    close: 26970.6,
    volume: 374944000,
  },
  {
    id: 1004,
    ticker: "BANKNIFTY",
    unixtime: 1550202300,
    open: 27017.2,
    high: 27029.9,
    low: 26635.2,
    close: 26794.2,
    volume: 252674000,
  },
  {
    id: 1005,
    ticker: "BANKNIFTY",
    unixtime: 1550461500,
    open: 26754.6,
    high: 26829.9,
    low: 26617.7,
    close: 26654.2,
    volume: 175448992,
  },
  {
    id: 1006,
    ticker: "BANKNIFTY",
    unixtime: 1550547900,
    open: 26666.6,
    high: 26996.4,
    low: 26625.6,
    close: 26684.8,
    volume: 129760000,
  },
  {
    id: 1007,
    ticker: "BANKNIFTY",
    unixtime: 1550634300,
    open: 26786,
    high: 26985.5,
    low: 26732.7,
    close: 26955.5,
    volume: 130712000,
  },
  {
    id: 1008,
    ticker: "BANKNIFTY",
    unixtime: 1550720700,
    open: 26994.8,
    high: 27100.9,
    low: 26973,
    close: 27052.4,
    volume: 148275008,
  },
  {
    id: 1009,
    ticker: "BANKNIFTY",
    unixtime: 1550807100,
    open: 26960.1,
    high: 26997.3,
    low: 26847.8,
    close: 26867.6,
    volume: 221450000,
  },
  {
    id: 1010,
    ticker: "BANKNIFTY",
    unixtime: 1551066300,
    open: 26934.2,
    high: 27197.1,
    low: 26932.7,
    close: 27159.2,
    volume: 141100992,
  },
  {
    id: 1011,
    ticker: "BANKNIFTY",
    unixtime: 1551152700,
    open: 26853.8,
    high: 27127.2,
    low: 26736.6,
    close: 26952.9,
    volume: 201083008,
  },
  {
    id: 1012,
    ticker: "BANKNIFTY",
    unixtime: 1551239100,
    open: 27078.1,
    high: 27189.4,
    low: 26719.4,
    close: 26799.3,
    volume: 193744992,
  },
  {
    id: 1013,
    ticker: "BANKNIFTY",
    unixtime: 1551325500,
    open: 26878,
    high: 26920.5,
    low: 26762.6,
    close: 26789.9,
    volume: 191588992,
  },
  {
    id: 1014,
    ticker: "BANKNIFTY",
    unixtime: 1551411900,
    open: 26941,
    high: 27076.6,
    low: 26928.9,
    close: 27043.9,
    volume: 189426000,
  },
  {
    id: 1015,
    ticker: "BANKNIFTY",
    unixtime: 1551757500,
    open: 27068.2,
    high: 27580.8,
    low: 26958.1,
    close: 27554.1,
    volume: 207435008,
  },
  {
    id: 1016,
    ticker: "BANKNIFTY",
    unixtime: 1551843900,
    open: 27618.1,
    high: 27681.7,
    low: 27492.1,
    close: 27625.7,
    volume: 179778000,
  },
  {
    id: 1017,
    ticker: "BANKNIFTY",
    unixtime: 1551930300,
    open: 27661,
    high: 27815.5,
    low: 27560,
    close: 27764.6,
    volume: 208016992,
  },
  {
    id: 1018,
    ticker: "BANKNIFTY",
    unixtime: 1552016700,
    open: 27686.2,
    high: 27811.3,
    low: 27645.4,
    close: 27761.8,
    volume: 140524000,
  },
  {
    id: 1019,
    ticker: "BANKNIFTY",
    unixtime: 1552275900,
    open: 27840.1,
    high: 28035.6,
    low: 27791.2,
    close: 27966.7,
    volume: 148236000,
  },
  {
    id: 1020,
    ticker: "BANKNIFTY",
    unixtime: 1552362300,
    open: 28168.2,
    high: 28488.1,
    low: 28142.2,
    close: 28443.7,
    volume: 184260000,
  },
  {
    id: 1021,
    ticker: "BANKNIFTY",
    unixtime: 1552448700,
    open: 28480.3,
    high: 28927.7,
    low: 28353.7,
    close: 28884.3,
    volume: 206998000,
  },
  {
    id: 1022,
    ticker: "BANKNIFTY",
    unixtime: 1552535100,
    open: 29028.9,
    high: 29070.3,
    low: 28819.8,
    close: 28923.1,
    volume: 187140000,
  },
  {
    id: 1023,
    ticker: "BANKNIFTY",
    unixtime: 1552621500,
    open: 29007,
    high: 29520.7,
    low: 28990.8,
    close: 29381.4,
    volume: 296216992,
  },
  {
    id: 1024,
    ticker: "BANKNIFTY",
    unixtime: 1552880700,
    open: 29521.6,
    high: 29812,
    low: 29361.7,
    close: 29596.1,
    volume: 185740992,
  },
  {
    id: 1025,
    ticker: "BANKNIFTY",
    unixtime: 1552967100,
    open: 29702.6,
    high: 29799.8,
    low: 29547.7,
    close: 29767.8,
    volume: 222296000,
  },
  {
    id: 1026,
    ticker: "BANKNIFTY",
    unixtime: 1553053500,
    open: 29769.7,
    high: 29885.2,
    low: 29633.5,
    close: 29832.2,
    volume: 194920992,
  },
  {
    id: 1027,
    ticker: "BANKNIFTY",
    unixtime: 1553226300,
    open: 29920.8,
    high: 30008.1,
    low: 29508.7,
    close: 29582.5,
    volume: 219824000,
  },
  {
    id: 1028,
    ticker: "BANKNIFTY",
    unixtime: 1553485500,
    open: 29329.4,
    high: 29329.4,
    low: 29156.2,
    close: 29281.2,
    volume: 132018000,
  },
  {
    id: 1029,
    ticker: "BANKNIFTY",
    unixtime: 1553571900,
    open: 29300.4,
    high: 29950.2,
    low: 29278.5,
    close: 29882.2,
    volume: 131213000,
  },
  {
    id: 1030,
    ticker: "BANKNIFTY",
    unixtime: 1553658300,
    open: 30034.2,
    high: 30262.6,
    low: 29790.2,
    close: 30019.8,
    volume: 260544992,
  },
  {
    id: 1031,
    ticker: "BANKNIFTY",
    unixtime: 1553744700,
    open: 30064.8,
    high: 30496.1,
    low: 29969.1,
    close: 30420.6,
    volume: 292111008,
  },
  {
    id: 1032,
    ticker: "BANKNIFTY",
    unixtime: 1553831100,
    open: 30480.3,
    high: 30499.2,
    low: 30235.9,
    close: 30426.8,
    volume: 219687008,
  },
  {
    id: 1033,
    ticker: "BANKNIFTY",
    unixtime: 1554090300,
    open: 30537.6,
    high: 30648.1,
    low: 30218.3,
    close: 30326.5,
    volume: 224440992,
  },
  {
    id: 1034,
    ticker: "BANKNIFTY",
    unixtime: 1554176700,
    open: 30450.1,
    high: 30452.9,
    low: 30155.8,
    close: 30354.2,
    volume: 196482000,
  },
  {
    id: 1035,
    ticker: "BANKNIFTY",
    unixtime: 1554263100,
    open: 30440.8,
    high: 30602.6,
    low: 30036.2,
    close: 30093.3,
    volume: 193072000,
  },
  {
    id: 1036,
    ticker: "BANKNIFTY",
    unixtime: 1554349500,
    open: 30147.3,
    high: 30245.7,
    low: 29809.9,
    close: 29904.9,
    volume: 199631008,
  },
  {
    id: 1037,
    ticker: "BANKNIFTY",
    unixtime: 1554435900,
    open: 30002.8,
    high: 30174,
    low: 29850,
    close: 30084.7,
    volume: 154140992,
  },
  {
    id: 1038,
    ticker: "BANKNIFTY",
    unixtime: 1554695100,
    open: 30201.5,
    high: 30232.1,
    low: 29716.6,
    close: 29845.3,
    volume: 147200992,
  },
  {
    id: 1039,
    ticker: "BANKNIFTY",
    unixtime: 1554781500,
    open: 29901.5,
    high: 30165.1,
    low: 29703.6,
    close: 30113.8,
    volume: 165462000,
  },
  {
    id: 1040,
    ticker: "BANKNIFTY",
    unixtime: 1554867900,
    open: 29916.6,
    high: 30155.8,
    low: 29768.1,
    close: 29803.5,
    volume: 165250000,
  },
  {
    id: 1041,
    ticker: "BANKNIFTY",
    unixtime: 1554954300,
    open: 29841.8,
    high: 29852.2,
    low: 29640.2,
    close: 29786.1,
    volume: 108248000,
  },
  {
    id: 1042,
    ticker: "BANKNIFTY",
    unixtime: 1555040700,
    open: 29780.6,
    high: 30000.9,
    low: 29707,
    close: 29938.6,
    volume: 104859000,
  },
  {
    id: 1043,
    ticker: "BANKNIFTY",
    unixtime: 1555299900,
    open: 29983.5,
    high: 30163.1,
    low: 29919.1,
    close: 30104.2,
    volume: 90614000,
  },
  {
    id: 1044,
    ticker: "BANKNIFTY",
    unixtime: 1555386300,
    open: 30236.2,
    high: 30590.9,
    low: 30228.2,
    close: 30531.3,
    volume: 117822000,
  },
  {
    id: 1045,
    ticker: "BANKNIFTY",
    unixtime: 1555559100,
    open: 30656.5,
    high: 30669.8,
    low: 30142.2,
    close: 30223.4,
    volume: 141698000,
  },
  {
    id: 1046,
    ticker: "BANKNIFTY",
    unixtime: 1555904700,
    open: 30282.5,
    high: 30289.9,
    low: 29647.6,
    close: 29687.9,
    volume: 132778000,
  },
  {
    id: 1047,
    ticker: "BANKNIFTY",
    unixtime: 1555991100,
    open: 29761.9,
    high: 29906.5,
    low: 29455.4,
    close: 29479.7,
    volume: 145856992,
  },
  {
    id: 1048,
    ticker: "BANKNIFTY",
    unixtime: 1556077500,
    open: 29550.5,
    high: 29914.8,
    low: 29435.1,
    close: 29860.8,
    volume: 129529000,
  },
  {
    id: 1049,
    ticker: "BANKNIFTY",
    unixtime: 1556163900,
    open: 29927.1,
    high: 30057.7,
    low: 29511.9,
    close: 29561.3,
    volume: 201016000,
  },
  {
    id: 1050,
    ticker: "BANKNIFTY",
    unixtime: 1556250300,
    open: 29764.8,
    high: 30048.2,
    low: 29563.2,
    close: 30013.5,
    volume: 158188992,
  },
];

export const ohlcdata = () => {
  const parser = d3.timeParse("%s");
  const arrayObj = testdata.map((a) => ({ ...a }));
  // var arrayObj = testdata;
  // console.log('testdata',testdata);
  var i;

  for (i = 0; i < arrayObj.length; i++) {
    //console.log(arrayObj[i].time)
    // arrayObj[i].time = new Date(arrayObj[i]["time"] * 1000);

    arrayObj[i].time = parser(arrayObj[i]["time"]);

    // delete arrayObj[i]["time"];
    //console.log(arrayObj[i].time)
  }
  //  console.log("res obj =>", arrayObj);
  return arrayObj;
};

export const ohlcdata2 = () => {
  
  const arrayObj = testdata2.map((a) => ({ ...a }));
  // var arrayObj = testdata;
  // console.log('testdata',testdata);

  var i;
  for (i = 0; i < arrayObj.length; i++) {
    arrayObj[i].time = new Date(arrayObj[i]["unixtime"] * 1000);
    //  delete arrayObj[i]["unixtime"];
  }
  //  console.log("res obj =>", arrayObj);
  return arrayObj;
};

export const arraydata = () => {
  const dataset = [];

  for (let i = 0; i < 5; i++) {
    dataset.push(Math.round(Math.random() * 100));
  }

  return dataset;
};

// ===Daten===
export const datapluck = [
  {
    Datum: "2013-02-04 00:00:00",
    Summe: "1000.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-02-04 00:00:00",
    Summe: "200.00",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-02-21 00:00:00",
    Summe: "4000.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-02-23 00:00:00",
    Summe: "2000.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-02-23 00:00:00",
    Summe: "601.00",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-03-04 00:00:00",
    Summe: "775.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-03-04 00:00:00",
    Summe: "1395.10",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-04-03 00:00:00",
    Summe: "400.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-04-03 00:00:00",
    Summe: "1040.00",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-05-24 00:00:00",
    Summe: "400.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-05-24 00:00:00",
    Summe: "3288.88",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-05-28 00:00:00",
    Summe: "400.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-05-28 00:00:00",
    Summe: "4407.10",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-01 00:00:00",
    Summe: "400.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-01 00:00:00",
    Summe: "3525.86",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-04 00:00:00",
    Summe: "400.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-04 00:00:00",
    Summe: "2990.17",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-10 00:00:00",
    Summe: "390.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-10 00:00:00",
    Summe: "366.00",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-14 00:00:00",
    Summe: "390.00",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-14 00:00:00",
    Summe: "925.18",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-16 00:00:00",
    Summe: "708.44",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-16 00:00:00",
    Summe: "609.10",
    Type: "Type2",
    Notizen: null,
  },
  {
    Datum: "2013-06-20 00:00:00",
    Summe: "708.44",
    Type: "Type1",
    Notizen: null,
  },
  {
    Datum: "2013-06-20 00:00:00",
    Summe: "1760.80",
    Type: "Type2",
    Notizen: null,
  },
];

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export const timesereiohlc = () => {
  // Generate data for 30 days
  const data = d3.range(30).map((d, i) => {
    // console.log(d3.timeDay.offset(new Date(), i));
    // console.log(Math.random() * 100);
    return {
      time: d3.timeDay.offset(new Date(), i),
      open: getRandomArbitrary(30, 50),
      high: getRandomArbitrary(51, 55),
      low: getRandomArbitrary(5, 29),
      close: getRandomArbitrary(30, 50),
    };
  });
  // console.log(data);
  return data;
};

export const timesereisdata = () => {
  // Generate data for 30 days
  const data = d3.range(30).map((d, i) => {
    // console.log(d3.timeDay.offset(new Date(), i));
    // console.log(Math.random() * 100);
    return {
      time: d3.timeDay.offset(new Date(), i),
      value: Math.random() * 100,
    };
  });
  // console.log(data);
  return data;
};

export const timesereisdataimpression = () => {
  // Generate data for 30 days
  const data = d3.range(30).map((d, i) => {
    // console.log(d3.timeDay.offset(new Date(), i));
    // console.log(Math.random() * 100);
    return {
      date1: d3.timeDay.offset(new Date(), i),
      date: d3.timeDay.offset(new Date(), i).getTime(),
      Impressions: Math.random() * 100,
    };
  });
  console.log("dd", data);
  return data;
};

// timesereisdataimpression()
