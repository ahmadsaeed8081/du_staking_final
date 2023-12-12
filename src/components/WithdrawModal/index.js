import React,{useState} from "react";

const WithdrawModal = ({withdraw}) => {


  const [WithdrawAmount, set_WithdrawAmount] = useState(0);

  return (
    <div className="with-draw-modal-popup flex flex-col">
      <div className="model-hdr">Withdrawal Earning</div>
      <div className="model-body flex flex-col">
        <div className="body-title flex items-center justify-between">
          <h1 className="b-title">Withdrawal Payment</h1>
          <img src="/images/rocket.svg" className="icon" />
        </div>
        {/* <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">My Balance</h1>
          <input type="text" 
          className="txt" 
          value={}
          />
        </div> */}
        <div className="input-field flex flex-col mb-4">
          <h1 className="lbl mb-2">Amount (Min 1 DU - Max 2500 DU)</h1>
          <input type="number" 
          className="txt"
          min={0}
          value={WithdrawAmount} 
          onChange={(e)=>{
            set_WithdrawAmount(e.target.value)
          }}

          />
        </div>
        <button className="btn-width button mt-2" onClick={()=>withdraw(WithdrawAmount)}>Withdraw Payment</button>
      </div>
    </div>
  );
};

export default WithdrawModal;
