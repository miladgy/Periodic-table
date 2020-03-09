import React from "react";
import "./Element.css";

const Element = props => {
  const style = {
    gridColumn: props.column,
    gridColumnEnd: props.column,
    gridRow: props.row,
    gridRowEnd: props.row,
    borderColor: props.borderColour
  };

  return (
    <div
      className={props.className}
      style={style}
      onMouseEnter={element => props.mouseEnter(props.element)}
      onMouseLeave={element => props.mouseLeave(props.element)}
      onClick={element => props.handleClick(props.element)}
    >
      <div className="element-atomic">{props.element.atomicNumber}</div>
      <div className="element-symbol">{props.element.symbol}</div>
      <div className="element-name">{props.element.name}</div>
    </div>
  );
};

export default Element;
