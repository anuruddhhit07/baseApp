import React, { useState, useEffect, useRef, useMemo } from "react";

export const useContainerDimensions = myRef => {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
    useEffect(() => {
        console.log("object");
        console.log(myRef.current.offsetWidth);
      const getDimensions = () => ({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight
      })
  
      const handleResize = () => {
        setDimensions(getDimensions())
      }
  
      if (myRef.current) {
        console.log(getDimensions());
        setDimensions(getDimensions())
      }
  
      window.addEventListener("resize", handleResize)
  
      return () => {
        window.removeEventListener("resize", handleResize)
      }
    }, [myRef])
  
    return dimensions;
  };