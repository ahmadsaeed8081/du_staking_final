import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/reducers/authReducer";
import UserProfile from "../userProfile";
import ConnectWalletButton from "../ConnectWalletButton";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();

  const userLogout = () => {
    dispatch(logout("admin-token"));
  };

  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <div className="logo-img flex items-center justify-center">
            <Link to="/">
              <img src="../images/logo.svg" className="logo" />
            </Link>
          </div>
        </div>
        <div className="right flex items-center justify-end">
          <ConnectWalletButton />
          {/* <UserProfile /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
