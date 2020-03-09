import React, { useState } from "react";
import Element from "./Element.js";
import "./Table.css";
import data from "./data/data.json";

const totalColumns = 18;
let borderColour;

const Table = () => {
  const [hoveredElement, setHoveredElement] = useState({} | null);
  const [selectedElements, setSelectedElements] = useState({});

  const handleClick = evt => {
    setSelectedElements(evt);
  };

  let sameBlockElements = [];
  sameBlockElements = data.elements.filter(
    el => el.block === selectedElements.block
  );
  let elementGroupClassName = "";
  const getElementGroupName = el => {
    if ([3, 11, 19, 37, 55, 87].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Alkali";
    }
    if ([4, 12, 20, 38, 56, 88].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Alkaline";
    }
    if (
      [13, 31, 49, 50, 81, 82, 83, 113, 114, 115, 116].indexOf(
        el.atomicNumber
      ) > -1
    ) {
      elementGroupClassName = "Basic";
    }
    if ([5, 14, 32, 33, 51, 52, 84].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Semimetal";
    }
    if ([1, 6, 7, 8, 15, 16, 34].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Nonmetal";
    }
    if ([9, 17, 35, 53, 85, 117].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Halogen";
    }
    if ([2, 10, 18, 36, 54, 86, 118].indexOf(el.atomicNumber) > -1) {
      elementGroupClassName = "Nobel";
    }
    if (el.atomicNumber >= 21 && el.atomicNumber <= 30) {
      elementGroupClassName = "Transition";
    }
    if (el.atomicNumber >= 39 && el.atomicNumber <= 48) {
      elementGroupClassName = "Transition";
    }
    if (el.atomicNumber >= 57 && el.atomicNumber <= 71) {
      elementGroupClassName = "Lanthanide";
    }
    if (el.atomicNumber >= 72 && el.atomicNumber <= 80) {
      elementGroupClassName = "Transition";
    }
    if (el.atomicNumber >= 89 && el.atomicNumber <= 103) {
      elementGroupClassName = "Actinide";
    }
    if (el.atomicNumber >= 104 && el.atomicNumber <= 112) {
      elementGroupClassName = "Transition";
    }
  };

  const createElements = (data, borderColour = "#C6C6CE") => {
    let groups = [];
    for (let i = 0; i < data.length; i++) {
      let color = borderColour;

      if (hoveredElement && hoveredElement.symbol === data[i].symbol) {
        color = "#FFFF";
      }
      if (Object.values(selectedElements).includes(data[i].symbol)) {
        color = "#0F14EC";
      }

      getElementGroupName(data[i]);

      groups.push(
        <Element
          key={data[i].symbol}
          className={`element 
          ${elementGroupClassName}
          ${
            sameBlockElements.filter(element => {
              return element.block === data[i].block;
            }).length !== 0
              ? "same-block"
              : ""
          }`}
          borderColour={color}
          element={data[i]}
          column={+data[i].column}
          row={+data[i].row}
          mouseEnter={element => {
            setHoveredElement(element);
          }}
          mouseLeave={element => {
            setHoveredElement(null);
          }}
          handleClick={handleClick}
        />
      );
    }
    return groups;
  };

  const populateTableWithElements = element => {
    return <>{createElements(element, borderColour)}</>;
  };

  const createFromData = index => {
    return {
      name: data.elements[index].name,
      atomicNumber: data.elements[index].atomicNumber,
      symbol: data.elements[index].symbol,
      atomicWeight: data.elements[index].atomicWeight,
      block: data.elements[index].block,
      column: data.elements[index].column,
      row: data.elements[index].row
    };
  };

  const ElementsFromTo = (from, to) => {
    let PTelements = [];
    for (let i = from; i < to; i++) {
      PTelements.push(createFromData(i));
    }
    return PTelements;
  };

  /* full periodic table */
  const allTheElements = () => {
    return (
      <>
        {populateTableWithElements(ElementsFromTo(0, 1))}
        {populateTableWithElements(ElementsFromTo(1, 2))}
        {populateTableWithElements(ElementsFromTo(2, 4))}
        {populateTableWithElements(ElementsFromTo(4, 10))}
        {populateTableWithElements(ElementsFromTo(10, 12))}
        {populateTableWithElements(ElementsFromTo(12, 18))}
        {populateTableWithElements(ElementsFromTo(18, 36))}
        {populateTableWithElements(ElementsFromTo(36, 54))}
        {populateTableWithElements(ElementsFromTo(54, 56))}
        {populateTableWithElements([
          {
            name: "Lanthanum",
            symbol: "La",
            atomicNumber: "57",
            atomicWeight: "138.91",
            block: "d",
            column: 3,
            row: 8
          }
        ])}
        {populateTableWithElements(ElementsFromTo(57, 71))}
        {populateTableWithElements(ElementsFromTo(71, 86))}
        {populateTableWithElements(ElementsFromTo(86, 88))}
        {populateTableWithElements([
          {
            name: "Actinium",
            symbol: "Ac",
            atomicNumber: "89",
            atomicWeight: "[227]",
            block: "d",
            column: 3,
            row: 9
          }
        ])}
        {populateTableWithElements(ElementsFromTo(89, 103))}
        {populateTableWithElements(ElementsFromTo(103, 118))}
      </>
    );
  };

  return <div className="periodic-table">{allTheElements()}</div>;
};

export default Table;
