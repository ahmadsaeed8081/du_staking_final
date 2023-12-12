import React from "react";
import Wrapper from "../../routes/Wrapper";
import UserProfile from "../../components/userProfile";

const History = ({history}) => {

  const count = (_deadline) => {
    console.log("here is deadine "+_deadline)
    var now = new Date().getTime();
    _deadline = Number(_deadline) * 1000;
    var now = new Date().getDate(_deadline)+"-"+new Date().getMonth(_deadline)+"-"+new Date().getFullYear(_deadline);
return now
    
  };



  return (
    <Wrapper>
      <div className="History-page ">
        <div className="wrap wrapWidth flex">
          <div className="History-box">
            <div className="History-header flex items-center justify-between gap-3">
              <h1 className="heading">Transaction History</h1>
              <UserProfile />
            </div>
            <hr class="w-full border-black" />
            <div className="flex justify-center items-center w-full mt-12 max-md:overflow-x-auto overflow-y-auto max-h-[500px] px-8 pt-24">
              <table className="table w-full">
                <thead className="t-head">
                  <tr className="py-4">
                    <th className="fs">No.</th>
                    <th className="fs">Event</th>
                    <th className="fs">Amount</th>
                    <th className="fs">Date</th>
                  </tr>
                </thead>

                {history.length>0?
                (
                  <>
                    <tbody>
                    {history.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-[#F0F0F0]" : "bg-white"}
                      >
                        <td className="fd border">{index+1}</td>
                        <td className="fd border">{item[0]==1?("Stake"):(item[0]==2?("UnStake"):(item[0]==3?("Withdraw"):((item[0]==4?("Level Up"):(null)) ) ) )}</td>
                        
                        <td className="fd border">{item[1]/10**18} $DU</td>
                        <td className="fd border">{count(item[2])}</td>
                      </tr>
                    ))}
                  </tbody>
                  </>
                ):(             null
                )}

              </table>
              
            </div>
                {history.length==0?
                (            <h1 className="heading" style={{ textAlign:"center" , paddingTop:70}} >Your Have no Transaction History Yet.</h1>
                ):(null)}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default History;
