import React from "react";

const ConfirmationPopup = ({ setOpen,unstaking }) => {
  return (
    <div className="confirmation-popup-body flex flex-col justify-between">
      <h1 className="title">Warning: 5% Emergency Unstaking Fee</h1>
      <p className="desc">
      Please note that there is a 5% fee for emergency unstaking. Are you sure you want to proceed?

      </p>
      <div className="actions flex items-center justify-center w-full">
        <button className="btn-c button" onClick={(e) => {setOpen(false);unstaking()}}>
          Yes
        </button>
        <button className="btn-c button" onClick={(e) => {setOpen(false);}}>
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
