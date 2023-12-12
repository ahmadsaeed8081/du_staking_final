import React, { useState,useEffect } from "react";
import Wrapper from "../../routes/Wrapper";
import UserProfile from "../../components/userProfile";
import Web3 from "web3";
import {useNetwork,  useSwitchNetwork } from 'wagmi'
import { useAccount, useDisconnect } from 'wagmi'
import { cont_address,token_Address,cont_abi,token_abi } from "../../components/config";
const Reward = ({referralLevel_count,referralLevel_Earning}) => {


  const data = [
    {
      Img: "../images/person.png",
      Level: "Level 1",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[0]/10**18,
      Member: referralLevel_count[0],
    },
    {
      Img: "../images/person.png",
      Level: "Level 2",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[1]/10**18,
      Member: referralLevel_count[1],
    },
    {
      Img: "../images/person.png",
      Level: "Level 3",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[2]/10**18,
      Member: referralLevel_count[2],
    },
    {
      Img: "../images/person.png",
      Level: "Level 4",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[3]/10**18,
      Member: referralLevel_count[3],
    },
    {
      Img: "../images/person.png",
      Level: "Level 5",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[4]/10**18,
      Member: referralLevel_count[4],
    },
    {
      Img: "../images/person.png",
      Level: "Level 6",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[5]/10**18,
      Member: referralLevel_count[5],
    },
    {
      Img: "../images/person.png",
      Level: "Level 7",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[6]/10**18,
      Member: referralLevel_count[6],
    },
    {
      Img: "../images/person.png",
      Level: "Level 8",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[7]/10**18,
      Member: referralLevel_count[7],
    },
    {
      Img: "../images/person.png",
      Level: "Level 9",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[8]/10**18,
      Member: referralLevel_count[8],
    },
    {
      Img: "../images/person.png",
      Level: "Level 10",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[9]/10**18,
      Member: referralLevel_count[9],
    },
    {
      Img: "../images/person.png",
      Level: "Level 11",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[10]/10**18,
      Member: referralLevel_count[10],
    },
    {
      Img: "../images/person.png",
      Level: "Level 12",
      Heading: "Earning",
      Title: "Team",
      Price: referralLevel_Earning[11]/10**18,
      Member: referralLevel_count[11],
    },
    // Add more data as needed
  ];

  return (
    <Wrapper>
      <div className="Reward-page ">
        <div className="wrap wrapWidth flex">
          <div className="Reward-box">
            <div className="Reward-header items-center justify-between gap-3">
              <h1 className="heading">Your Referral Reward</h1>
              <UserProfile />
            </div>
            <hr class="w-full border-black mt-4 p-0" />
            <div className=" grid lg:grid-cols-4 max-md:grid-cols-3 gap-5 my-8 px-5 max-md:overflow-y-auto max-md:max-h-[500px] max-md:px-0 max-md:gap-2">
              {data.map((item, index) => (
                <div key={index} className="re-box">
                  <div className="flex flex-col items-center">
                    <img
                      src={item.Img}
                      alt={`Person ${index + 1}`}
                      className="mb-2"
                    />
                    <p className="box-heading"> {item.Level}</p>
                  </div>
                  <div className="flex justify-between">
                    {" "}
                    <div className="flex flex-col">
                      <p className="box-head ">{item.Heading}</p>
                      <p className="box-desc"> {item.Price}</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="box-head ">{item.Title}</p>
                      <p className="box-desc"> {item.Member}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Reward;
