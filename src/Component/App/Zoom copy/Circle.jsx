//https://codesandbox.io/s/github/alexzywiak/d3-react-components/tree/master/?file=/src/components/ZoomSVG.tsx
import * as React from "react";
import * as d3 from "d3";
export default class Circle extends React.Component {
    ref=React.createRef()
    componentDidMount() {
      // const drag = d3
      //   .drag()
      //   .subject(d => {
      //     return d3.select(this.ref);
      //   })
      //   .on("start", dragstarted)
      //   .on("drag", dragged)
      //   .on("end", dragended);
  
      if (this.ref) {
        d3.select(this.ref)
          .attr("fill", "red")
          .attr("r", 15)
          .attr("cx", 50)
          .attr("cy", 50)
        //   .call(drag );
      }
    }
    render() {
      return <circle ref={ref => (this.ref = ref)} />;
    }
  }