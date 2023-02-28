import React, { useRef, useEffect, useState } from "react";

const EventCapture = (props) => {

    props.onChange("helooo")
    const refevent = useRef(null);
  return (
    <rect
    ref={refevent}
    id={"listrect"}
    // height={height2}
    // width={widhth2}
    // pointerEvents="all"
    // transform={`translate(${margin.left * 0}, ${margin.top * 0})`}
  />

  );
}

export default EventCapture;
