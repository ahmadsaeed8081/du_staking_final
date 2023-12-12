/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./css/App.scss";
import "./index.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";

import Main from "./Pages/Home";
import Routing from "./routes/Routing";




import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { bscTestnet} from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'


function App() {
  var activeUser = localStorage.getItem("_user");
  const [user, setUser] = useState(false);

  const [email, set_email] = useState("");



  const [_address, set_address] = useState(null);
  
  const chains = [bscTestnet]
const projectId = '8b3cd7dcbfb565705532d880d73759f2'

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])

// const { chains, publicClient } = configureChains(
//   [ polygonMumbai],
//   [alchemyProvider({ apiKey: 'ZF4BW9pKbwOBedI1qGl0uiQHbNu-ISwi' })],
// )
  const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)



  return (
    <div >

    <WagmiConfig config={wagmiConfig}>


     <Routing />

        </WagmiConfig>
    <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );}

export default App;
