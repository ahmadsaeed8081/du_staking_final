import React, { useState } from "react";

import { ArrowDownIcon } from "../../assets/Icons";

const DropDown = ({ dropDownList, selectedValue, setSelectedValue }) => {
  const [hide, setHide] = useState(false);
  //   const [selectedValue, setSelectedValue] = useState();
  return (
    <div className="dropDown flex items-center justify-center flex-col relative">
      <div className="category flex items-center">
        <div
          className="cbox cleanbtn flex items-center relative pointer"
          onClick={(e) => {
            e.stopPropagation();
            setHide(!hide);
          }}
        >
          <div className="slt flex items-center">
            <div className="unit-name flex items-center font s14 b4">
              <span
                className="unit-eng flex items-center font s14 b4"
                placeholder="Plano"
              >
                {selectedValue ? selectedValue.lbl : ""}
              </span>
            </div>
          </div>

          <div className="arrow-icon flex items-center justify-center">
            <ArrowDownIcon />
          </div>
        </div>
      </div>
      <div className={`block flex aic abs ${hide ? "show" : ""}`}>
        <div className="manue flex aic col anim">
          {dropDownList.map((item, index) => (
            <div
              key={index}
              className="slt flex aic"
              onClick={(e) => {
                setHide(!hide);
                setSelectedValue(item);
              }}
            >
              <div className="unit-name flex aic font s14 b4">
                <span className="unit-eng flex aic font s14 b4">
                  {item.lbl}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
