import React from "react";
import { LogoutIcon } from "../../assets/Icons";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount, useDisconnect } from "wagmi";

const ConnectWalletButton = () => {
  const { open, close } = useWeb3Modal();
  const { isConnected } = useAccount();
  return (
    <button className="btn-logout button" onClick={open}>
      <h1 className="btn-icon hidden lg:flex">
        <LogoutIcon />
      </h1>
      <h1 className="btn-lbl">
        {isConnected ? "Disconnect" : "Connect Wallet"}
      </h1>
    </button>
  );
};

export default ConnectWalletButton;
