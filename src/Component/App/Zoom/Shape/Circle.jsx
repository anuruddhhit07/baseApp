//https://codesandbox.io/s/github/alexzywiak/d3-react-components/tree/master/?file=/src/components/ZoomSVG.tsx
import * as React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

 class Circle extends React.Component {
    // ref=React.createRef()

    constructor(props) {
      super(props);
  
      this.ref = React.createRef();
      this.updatesvg = this.updatesvg.bind(this);
    }

    componentDidMount() {
      this.updatesvg();
    }
  
    componentDidUpdate(prevProps) {
      // console.log("prevProps",prevProps,this.props);
      // console.log('object');
      this.updatesvg();
    }

    updatesvg() {
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
          .attr("r", this.props.circleRadius)
          .attr("cx", 50)
          .attr("cy", 50)
        //   .call(drag );
      }
    }


    render() {
      return <circle ref={ref => (this.ref = ref)} />;
    }
  }


  const mapStateToProps = (state) => {
    // console.log(state);
    return {
      circleRadius: state.circlereducer.circleRadius,
     
    };
  };
  
  export default connect(mapStateToProps)(Circle);
