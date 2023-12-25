import React, { useState,useEffect } from "react";
import Wrapper from "../../routes/Wrapper";
import DropDown from "../../components/DropDown";
import UserProfile from "../../components/userProfile";
import Modal from "../../components/Modal";

import Timer from "../../components/Timer";
import {
  ArrowDownIcon,
  QuestionIcon,
  ArrowDownIcon2,
  ArrowUpIcon,
} from "../../assets/Icons";
import ConfirmationPopup from "../../components/confirmationPopup";

import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const cont_Contract = {
  address: cont_address,
  abi: cont_abi,
}
const stakeTokem_Contract = {
  address: token_Address,
  abi: token_abi,
}
const Stacking = (props) => {
  const [selectedTab, setSelectedTab] = useState("Staking");
  const [selectedPeriodValue, setSelectedPeriodValue] = useState({
    lbl: "200 Days",
    slug: "",
  });
  const APRList = [
    { value: "0", lbl: "200 Days" ,APR: "0.5%"},
    { value: "1", lbl: "400 Days"  ,APR: "0.6%"},




  ];
  const [hide5, setHide5] = useState(false);

  const [ selectedAPR,set_selectedAPR] = useState(APRList[0])

  const [open, setOpen] = useState(false);

  const [expend, setExpend] = useState(false);
 
  const [stakeAmount, setStakedAmount] = useState(0);
  const [curr_time, set_currTime] = useState(0);
  const [selectedAmount_forReward, setSelectedAmount_forReward] = useState(null);
  const [DuBalance, set_DuBalance] = useState(0);

  const [All_investments_ForReward, set_All_investments_ForReward] = useState([]);
  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(null);
  // const [count, setcount] = useState(0);

  // const [regAddres, setregAddres] = useState("");

  const { chain } = useNetwork()

  const id="7653687856888";
  const { address, isConnecting ,isDisconnected} = useAccount()
  const networkId=56;
let count=0;


    const { data:stakeResult, isLoading:isLoading_stake, isSuccess:stakeSuccess, write:staking } = useContractWrite({

      address: cont_address,
    abi: cont_abi,
    functionName: 'Stake',
    args: [stakeAmount*10**18,selectedAPR.value,id,props.ref_add],
    maxFeePerGas:300000,
    // maxPriorityFeePerGas:300000,
    onSuccess(data)
    {
      props.test();
      console.log('Success', data)
    },
  

  })

    const { config:appConfig } = usePrepareContractWrite({

    address: token_Address,
    abi: token_abi,
    functionName: 'approve',
    args: [cont_address,stakeAmount*10**18],

  })


    const { config:unstakeConfig } = usePrepareContractWrite({

      address: cont_address,
      abi: cont_abi,
      functionName: 'unStake',
      args: [choosed_Unstake_inv],
      maxFeePerGas:300000,

    })


    const { config:claimRewardConfig } = usePrepareContractWrite({
      address: cont_address,
      abi: cont_abi,
      functionName: 'withdrawReward',
      maxFeePerGas:300000,
    
    })

    const {data:data_app, isLoading:isLoading_app, isSuccess:isSuccess_app,write: approval} = useContractWrite(appConfig)

  const { data:data__unstake, isLoading:isLoading_unstake, isSuccess:isSuccess_unstake, write:unstake } = useContractWrite(unstakeConfig)


  const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite(claimRewardConfig)


  const waitForTransaction = useWaitForTransaction({
    hash: data_app?.hash,
    onSuccess(data) {
    // alert("its run")
    staking?.()
      console.log('Success',data )
    },
  })

  const waitForTransaction2 = useWaitForTransaction({
    hash: stakeResult?.hash,
    onSuccess(data) {
    props.test?.()
      console.log('Success2',data )
    },
  })

  const waitForTransaction3 = useWaitForTransaction({
    hash: data__unstake?.hash,
    onSuccess(data) {
    props.test?.()
      console.log('Success2',data )
    },
  })

  const waitForTransaction4 = useWaitForTransaction({
    hash: stakeResult_withdrawReward?.hash,
    onSuccess(data) {
    props.test?.()
      console.log('Success2',data )
    },
  })



useEffect(()=>{
  if(count==0  || count==0 && props.allInvestments.length>0)
  {
    set_DuBalance(props.DuBalance)
    
      test1()
      count++;
  }

},address,props.allInvestments)


  const {switchNetwork:stake_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){

        approval?.()
      }

    })
    const { switchNetwork:unstake_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){

        unstake?.()
      }

    })
    const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
    useSwitchNetwork({
      chainId: networkId,
      // throwForSwitchChainNotSupported: true,
      onSuccess(){

        withdrawReward?.()
      }

    })


  

  // function find_date( time){
  //   const now = new Date().now;
  //   console.log("its tie time"+ time);

  //   const t=moment("20000620", "YYYYMMDD").fromNow();
  //   console.log("its tie "+t);
  // }
  function Convert_To_eth( val){
    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com	"));
    val= web3.utils.fromWei(val.toString(),"ether");
    return val;
  
  }




    function test1(){


    console.log(props.allInvestments);


    set_investmentList(props.allInvestments);
    setSelectedAmount(props.allInvestments[0]);

    if(props.allInvestments[0])
    {
      set_choosed_Unstake_inv(props.allInvestments[0][3])

    }    



  }  





  async function stake()
  {
    alert("Staking is stopped in this version.Please use the updated version");
    return;
    if(props.isVerified=="undefined" || props.isVerified=="decline")
    {
      alert("Only regitered Members are allowed to stake");
      return;
    }
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    if(props.regAddress.toLowerCase()!=address.toLowerCase())
    {
      alert("kindly change your crypto wallet to the Registered wallet")
      return;
    }
    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }
    if(Number(stakeAmount)<Number(props.min_stake)/10**18 )
    {
      alert("Minimum Stake amount is "+ Number(props.min_stake)/10**18);
      return;
    }


    if(Number(DuBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }
    if(chain.id!=networkId)
    {
      stake_switch?.();
    }else{
      approval?.()

    }

  }


  function unstaking()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    if(props.regAddress.toLowerCase()!=address.toLowerCase())
    {
      alert("kindly change your crypto wallet to the Registered wallet")
      return;
    }
    if(props.isVerified=="undefined" || props.isVerified=="decline")
    {
      alert("Only regitered Members are allowed to unstake");
      return;
    }

    if(chain.id!=networkId)
    {
      unstake_switch?.();
    }else{
      unstake?.()

    }
    

  }






  
  return (
    <Wrapper>
      <div className="stacking-page ">
        <div className="wrap wrapWidth flex">
          <div className="stacking-box">
            <div className="stacking-header items-center justify-between gap-3">
              <h1 className="heading">{selectedTab}</h1>
              <UserProfile />
            </div>
            <hr class="w-full border-[#8A8A8A] " />
            <div className="flex justify-center items-center mt-10">
              <div className="st-box flex flex-col">
                {/* Tabs Part */}
                <div className="st-tabs flex">
                  <button
                    className={`st-btn flex-1 ${
                      selectedTab === "Staking" ? "active" : ""
                    }`}
                    onClick={(e) => setSelectedTab("Staking")}
                  >
                    Staking
                  </button>
                  <button
                    className={`st-btn flex-1 ${
                      selectedTab === "Unstaking" ? "active" : ""
                    }`}
                    onClick={(e) => setSelectedTab("Unstaking")}
                  >
                    UnStaking
                  </button>
                </div>
                {/* Staking Part */}
                {selectedTab === "Staking" ? (
                  <div className="staking-part flex flex-col">
                    <div className="desc p-5 flex justify-between">
                      <p className="st-desc">Daily Reward:</p>
                      <p className="st-desc">{selectedAPR.APR}</p>
                    </div>
                    <hr class="w-full border-black " />
                    <div className="form flex flex-col p-5 gap-4 mt-6 ">
                      <div className="input_field flex flex-col mb-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h1 className="lbl">Choose Lock Period:</h1>
                        </div>
                        <DropDown
                          dropDownList={APRList}
                          selectedValue={selectedAPR}
                          setSelectedValue={set_selectedAPR} 

                        />
                      </div>
                      <div className="input_field flex flex-col mb-3">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h1 className="lbl">Amount: (Minimum 10 DU)</h1>
                          {/* <h1 className="lbl mb-2">Amount (Min 1 DU - Max 2500DU)</h1> */}

                          <h1 className="lbl">Balance: {DuBalance>0?(Number(DuBalance)/10**18).toFixed(2):0} DU</h1>
                        </div>
                        <div className="input-box flex items-center">

                          <input type="number" 
                          className="txt cleanbtn w-full" 
                          min={0}
                          value={stakeAmount}
                          max={DuBalance>0?(Number(DuBalance)/10**18):0}
                          onChange={(e)=>setStakedAmount(e.target.value)}
                          />


                          <div className="flex items-center gap-1">
                            <h1 className="plp-lbl">DU</h1>
                            <div className="max-lbl"onClick={(e)=>setStakedAmount((Number(DuBalance)/10**18))} >MAX </div>
                          </div>
                        </div>
                      </div>
                      <button disabled={isLoading_app || isLoading_stake } className="btn button" onClick={stake}> 
                      {!isLoading_stake  && !isLoading_app &&! isSuccess_app && !stakeSuccess &&<div>Approve</div>}
                        {isLoading_app && <div>Approving</div>}
                        {!stakeSuccess && !isLoading_stake && isSuccess_app && <div>Approved</div>}
                        {isLoading_stake && <div>Staking</div>}
                        {!isLoading_app && stakeSuccess && <div>Approve</div>}
                        </button>                    
                  
                  </div>
                  </div>
                ) : (
                  <div className="staking-part flex flex-col flex-1">
                    <div className="desc p-5 flex justify-between">
                      <p className="st-desc">Penalty:</p>
                      <p className="st-desc">5%</p>
                    </div>
                    <hr class="w-full border-black " />
                    <div className="form flex flex-col p-5 gap-4 mt-6 flex-1  justify-between">
                    <div className="input-field flex flex-col">
                  <div className="field-hdr flex items-center justify-between">
                    <h1 className="f-tag">Previous Investment:</h1>
                  </div>
                  <div className="dropDown flex items-center justify-center flex-col relative">
                    <div className="category flex items-center">
                      <div
                        className="cbox cleanbtn flex items-center relative pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setHide5(!hide5);

                        }}
                      >
                        <div className="slt flex items-center">
                          <div className="unit-name flex items-center font s14 b4">
                            <span
                              className="unit-eng flex items-center font s14 b4"
                              placeholder="Plano"
                            >
                                 {selectedAmount
                                      ? selectedAmount[0]/10**18
                                      : "0"}                            
                                      </span>
                          </div>
                        </div>

                        <div className="arrow-icon flex items-center justify-center">
                          <ArrowDownIcon />
                        </div>
                      </div>
                    </div>
                    <div
                      className={`block flex aic abs ${hide5 ? "show" : ""}`}
                      >
                      <div className="manue flex aic col anim" style={{ background:"white",color:"black",border:"1px solid #7a7a7a",borderRadius:"4px"}}>
                        {allInvestments.map((item, index) => (
                          <div
                            key={index}
                            className="slt flex aic" 
                            onClick={(e) => {
                              setHide5(!hide5);
                              console.log(hide5);
                              setSelectedAmount(item);
                              set_choosed_Unstake_inv(item[3])
                            }}
                          >
                            <div className="unit-name flex aic font s14 b4" >
                              <span className="unit-eng flex aic font s14 b4" style={{color:"black" }}>
                                {Number(item[0])/10**18}
                              </span>
                              {/* <span className="unit-eng flex aic font s14 b4">
                                {find_date(Number(item[1]))}
                              </span> */}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Timer  time={selectedAmount ? Number(selectedAmount[1]): 0}/>
                </div>

                {
              selectedAmount?(
                <button className="btn button" disabled={isLoading_unstake} onClick={(e) =>{selectedAmount && Number(curr_time)<Number(selectedAmount[1])?(setOpen(true)):unstaking()} }>
                  {!isLoading_unstake  && !isSuccess_unstake &&<div>Unstake</div>}
                  {isLoading_unstake && !isSuccess_unstake && <div>Loading...</div>}
                  {!isLoading_unstake && isSuccess_unstake && <div>Unstake</div>}

              </button>




              ):(
                <button className="btn button">
                Unstake
              </button>
              )

            }
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ConfirmationPopup setOpen={setOpen} unstaking={unstaking}/>
        </Modal>
      </div>
    </Wrapper>
  );
};

export default Stacking;
