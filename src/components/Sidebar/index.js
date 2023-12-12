import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { LogoutIcon } from "../../assets/Icons";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";
import ConnectWalletButton from "../../components/ConnectWalletButton";

const Sidebar = () => {
  const { open, close } = useWeb3Modal();
  const { address, isConnected, isDisconnected } = useAccount();

  const navBarItems = [
    { lbl: "Dashboard", slug: "/dashboard/home" },
    {
      lbl: "Investment",
      slug: "/dashboard/stacking",
    },
    { lbl: "Transaction History", slug: "/dashboard/history" },
    { lbl: "Level Rewards", slug: "/dashboard/reward" },
    { lbl: "KYC Verification", slug: "/dashboard/verification" },
  ];

  return (
    <div className={`sidebar-s fixed anim show`}>
      <div
        className={`side-block flex flex-col justify-between anim show gap-2`}
      >
        <div className="side-hdr flex items-center justify-center">
          <img src="/images/logo.svg" className="h-24 w-28" />
        </div>
        <div className="items flex aic flex-col gap-2">
          {navBarItems.map((item, index) => (
            <NavLink key={index} to={item.slug} className={`item flex`}>
              <div className="li">{item.lbl}</div>
            </NavLink>
          ))}
        </div>
        <div className="side-footer flex items-center  justify-center">
          <ConnectWalletButton />
          {/* <button className="btn-logout button">
            <h1 className="btn-icon">
              <LogoutIcon />
            </h1>
            <h1 className="btn-lbl" onClick={open}>
              {isConnected ? "Disconnect" : "Connect Wallet"}
            </h1>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
