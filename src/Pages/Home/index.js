import React, { useState,useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {PiCopySimpleFill} from 'react-icons/pi';
import { useLocation } from 'react-router-dom';
import Loader from "../../components/Loader";

import Modal from "../../components/Modal";
import Wrapper from "../../routes/Wrapper";
import UserProfile from "../../components/userProfile";
import { CopyIcon } from "../../assets/Icons";
import WithdrawModal from "../../components/WithdrawModal";
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'

import { useAccount, useDisconnect } from 'wagmi'
import { useContractReads,useContractRead ,useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'
const Main = ({loader,totalReward,totalInvestment,Total_withdraw,totalEarning,directs,team,set_regAddress,regAddress,totalRefIncome,test , minWithdraw, maxWithdraw}) => {
  const [open, setOpen] = useState(false);
  const [count, set_count] = useState(0);
  const [withdrawAmount, set_withdrawAmount] = useState(0);

  const notify = () => toast("Referral is Copied Successfully!");
  const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

  const { chain } = useNetwork()

  // const location = useLocation();
  // const params = new URLSearchParams(location.search);
  // const temp_address = params.get("address");
// alert("hello "+regAddres)

const { config:claimRewardConfig } = usePrepareContractWrite({
  address: cont_address,
  abi: cont_abi,
  functionName: 'withdrawReward',
  args: [Number(withdrawAmount)*10**18],


})
const { data:stakeResult_withdrawReward, isLoading2_withdrawReward, isSuccess2_withdrawReward, write:withdrawReward } = useContractWrite(claimRewardConfig)

const networkId=56;


 const waitForTransaction4 = useWaitForTransaction({
    hash: stakeResult_withdrawReward?.hash,
    onSuccess(data) {
    test?.()
      console.log('Success2',data )
    },
  })

  const { chains, error, isLoading, pendingChainId, switchNetwork:reward_switch } =
  useSwitchNetwork({
    chainId: networkId,
    // throwForSwitchChainNotSupported: true,
    onSuccess(){

      withdrawReward?.()
    }

  })

  function withdraw(_amount)
  {
    set_withdrawAmount(_amount)
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if(_amount<Number(minWithdraw)/10**18)
    {
      alert("You can't withdraw less than "+Number(minWithdraw)/10**18 +" tokens");
      return;
    }
    if(_amount>Number(maxWithdraw)/10**18)
    {
      alert("You can't withdraw more than "+Number(maxWithdraw)/10**18 +" tokens");
      return;
    }
    if(regAddress.toLowerCase()!=address.toLowerCase())

    {
      alert("kindly change your crypto wallet to the Registered wallet")
      return;
    }
    if(_amount==0 )
    {
      alert("kindly write amount to withdraw ");
      return;
    }


    if(((Number(totalEarning)-Number(Total_withdraw))/10**18) < Number(_amount))
    {
      alert("You dont have enough balance");
      return;
    }
    if(chain.id!=networkId)
    {
      reward_switch?.();
    }else{
      withdrawReward?.()

    }
    // console.log(data__unstake);
    

  }
  function Convert_To_eth( val){
    const web3= new Web3(new Web3.providers.HttpProvider("https://bsc.publicnode.com	"));
    val= web3.utils.fromWei(val.toString(),"ether");
    return val;
  
  }
  const dashboardList = [
    {
      img: "../images/financial.png",
      title: "My Staking",
      price: (Number(totalInvestment))/(10**18),
    },
    {
      img: "../images/gift.png",
      title: "Staking Reward",
      price: (Number(totalReward))/(10**18),
    },
    {
      img: "../images/cash-withdrawal.png",
      title: "Total Withdrawal",
      price: (Number(Total_withdraw)/(10**18)),
    },
    {
      img: "../images/award.png",
      title: "Available Balance",
      price: (Number(totalEarning))/(10**18),
    },
    {
      img: "../images/medal.png",
      title: "Direct Reward",
      price: (Number(totalRefIncome))/(10**18),
    },
    {
      img: "../images/reward.png",
      title: "Team",
      price: team,
    },




    {
      img: "../images/cashback.png",
      title: "Total Directs",
      price: directs,
    },
    {
      img: "../images/wallet.png",
      title: "Total Earning",
      price: (Number(totalEarning)+Number(Total_withdraw))/(10**18),
    },
  ];


  // const dashboardList = [
  //   {
  //     img: "../images/financial.png",
  //     title: "My Staking",
  //     price: Convert_To_eth(totalInvestment),
  //   },
  //   {
  //     img: "../images/gift.png",
  //     title: "Staking Reward",
  //     price: Convert_To_eth(totalReward),
  //   },
  //   {
  //     img: "../images/cash-withdrawal.png",
  //     title: "Total Withdrawal",
  //     price: Convert_To_eth(Total_withdraw),
  //   },
  //   {
  //     img: "../images/award.png",
  //     title: "Available Balance",
  //     price: Convert_To_eth((totalEarning-Total_withdraw)),
  //   },
  //   {
  //     img: "../images/medal.png",
  //     title: "Direct Reward",
  //     price: Convert_To_eth(totalRefIncome),
  //   },
  //   {
  //     img: "../images/reward.png",
  //     title: "Team",
  //     price: team,
  //   },




  //   {
  //     img: "../images/cashback.png",
  //     title: "Total Directs",
  //     price: directs,
  //   },
  //   {
  //     img: "../images/wallet.png",
  //     title: "Total Earning",
  //     price: Convert_To_eth(totalEarning),
  //   },
  // ];


  // useEffect(()=>{
  //   if(count==0)
  //   {
  //     console.log("hello home ");
  //   set_count(1);

  //   }

  // },[])

  return (
    <Wrapper>

      <div className="lading-page relative">
        <div className="wrap wrapWidth flex">
          <div className="dashboard-box">
            <div className="dashboard-header flex items-center justify-between gap-3">
              <h1 className="heading">Dashboard</h1>
              <UserProfile />
              
            </div>
            <hr class="w-full border-black" />
            <div className="d-list flex flex-col">
              <div className="grid-wrap grid lg:grid-cols-4 max-md:grid-cols-2 gap-5 max-md:gap-4">
                {dashboardList.map((item, index) => (
                  <div
                    key={index}
                    className="d-box flex flex-col justify-center items-center "
                  >
                    <div className="action flex items-center justify-end w-full">
                      <button
                        className={`btn-withdraw button ${
                          item.title === "Available Balance" ? "show" : ""
                        }`}
                        onClick={(e) => setOpen(true)}
                      >
                        Withdraw
                      </button>
                    </div>
                    <img className="d-img" src={item.img} alt={item.title} />
                    <h2 className="d-heading">{item.title}</h2>
                    <p className="d-par">{item.price}</p>
                  </div>
                ))}
              </div>
              <div className="d-link mt-10">
                <p className="d-par">Referral Link : {window.location.origin}/auth/register/?ref={regAddress?regAddress.slice(0,4)+"...."+regAddress.slice(38,42):"kindly connect"}</p>
                <CopyToClipboard text={`${window.location.origin}/auth/register/?ref=${regAddress}`} >
                        <button className="copy-icon flex items-center justify-center" >
                          <PiCopySimpleFill color='white' className=' text-2xl'  onClick={notify}/>
                        </button>

                </CopyToClipboard>  

              </div>

            </div>
            {loader && <Loader />}

          </div>
        </div>

                        <ToastContainer/>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <WithdrawModal withdraw={withdraw} />
      </Modal>


    </Wrapper>
    

  );
};

export default Main;
