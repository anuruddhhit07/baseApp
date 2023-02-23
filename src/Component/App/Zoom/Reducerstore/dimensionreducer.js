
const initialDimenState = {
    width: 400,
    height: 300,
    margin: { top: 20, right: 50, bottom: 25, left: 50 },
  };

export default function dimensionreducer(state=initialDimenState, action) {
    switch (action.type) {
      case "increment":
        return {
          width: state.width + 10,
          height: state.height + 10,
          margin: state.margin,
        };
      case "decrement":
        return {
          width: state.width - 10,
          height: state.height - 10,
          margin: state.margin,
        };
      case "reset":
        return { width: 600, height: 500, margin: state.margin };
      default:
        return state;
    }
  }
  