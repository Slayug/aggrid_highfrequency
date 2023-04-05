import React from "react";

export default (props) => (
  <span>{new Array(parseInt(props.value, 1)).fill("#").join("")}</span>
);
