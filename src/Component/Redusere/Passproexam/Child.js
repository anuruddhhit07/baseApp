import React from "react";

import Grandchild from "./GrandChild";


const Child = () => (

  <div className="child-component">

    <div>This is the child component</div>

    <Grandchild />

  </div>

);


export default Child;