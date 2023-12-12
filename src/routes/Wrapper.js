import React from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const Wrapper = ({ children }) => {
  const { openSidebar } = useSelector((state) => state.globalReducer);

  return (
    <div className={`dashboard-page flex`}>
      <Sidebar />
      <div className="pages-block w-full flex flex-col relative min-h-screen ml-[260px]">
        <Header />
        <section>{children}</section>
        <NavBar />
      </div>
    </div>
  );
};
export default Wrapper;
