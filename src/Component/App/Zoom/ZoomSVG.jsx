import * as React from "react";
import * as d3 from "d3";
import "./styles.scss";
import { connect } from "react-redux";
import maxminProp from "./ChartProp/Controller/maxminProp";




class ZoomSVG extends React.Component {
  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.updatesvg = this.updatesvg.bind(this);
    // this.intilize = this.intilize.bind(this);
    // this.recalculate = this.recalculate.bind(this);
    
    // this.axis_min_max= maxminProp(this.props.data)
    
      // this.state = {
      //    xxscale:this.props.dispatch({ type: 'XScale', payload: {...this.axis_min_max,width:this.props.width} })
      // }
   
    
    
  }

  componentDidMount() {
    // this.intilize();
    this.updatesvg();
    
  }

  componentDidUpdate(prevProps) {
    // console.log("prevProps",prevProps,this.props);
   
    console.log('formcomponentDidUpdate' );
    // this.updatesvg();
  }

  shouldComponentUpdate () {
    // console.log("prevProps",prevProps,this.props);
    console.log('shouldComponentUpdate' );
    // this.updatesvg();
    // this.recalculate()
    // console.log(this.props.xScale);
    console.log();
    return true
  }


  // intilize(){
  //   console.log(this.props.data);
  //   const axis_min_max= maxminProp(this.props.data)   
  //   console.log('componentDidMount' ,{...axis_min_max,width:this.props.width})
  //   this.props.dispatch({ type: 'XScale', payload: {...axis_min_max,width:this.props.width} })
  //   console.log(this.props.xScale);
  //   console.log(this.props);
  // }

  // recalculate(){
  //   const axis_min_max= maxminProp(this.props.data)   
  //   console.log('componentDidMount' ,{...axis_min_max,width:this.props.width})
  //   this.props.dispatch({ type: 'XScale', payload: {...axis_min_max,width:this.props.width} })
  //   // this.setState()
  //   console.log(this.props);
  // }


  updatesvg() {   
    // console.log(this.props);
    const zoomed = (event) => {
      const currentTransform = event.transform;
      d3.select(this.ref).select("g").attr("transform", currentTransform);
    };
    const zoom = d3.zoom().scaleExtent([1, 10]).on("zoom", zoomed);
    d3.select(this.ref).call(zoom);


    
  }
  

  render() {

    // this.recalculate()



   
    return (
      <>
      
      {this.props.xScale !==null && this.props.xScale(1387212570000)}
      
      <svg
        className="mainsvg"
        id={"bg1"}
        height={this.props.height}
        width={this.props.width}
      >
        <g ref={(ref) => (this.ref = ref)}>
          {/* <rect height="500" width="500" fill="none" pointerEvents="all" /> */}
          <g>{this.props.children}</g>
        </g>
        jhk
      </svg>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    width: state.dimensionreducer.width,
    height: state.dimensionreducer.height,
    margin: state.dimensionreducer.margin,
    data:state.datareducer.data,
    orient:state.axisReducer.orient,
    xScale:state.axisReducer.xScale


  };
};

export default connect(mapStateToProps)(ZoomSVG);
