import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HomeIcon,
  StakeIcon,
  ClockIcon,
  ReplaceIcon,
  CardIcon,
} from "../../assets/Icons";

const NavBar = () => {
  const navBarItems = [
    { lbl: "Dashboard", slug: "/dashboard/home", img: "/images/HomeIcon.svg" },
    {
      lbl: "Investment",
      slug: "/dashboard/stacking",
      img: "/images/StakeIcon.svg",
    },
    {
      lbl: "Transaction History",
      slug: "/dashboard/history",
      img: "/images/ClockIcon.svg",
    },
    {
      lbl: "Level Rewards",
      slug: "/dashboard/reward",
      img: "/images/ReplaceIcon.svg",
    },
    {
      lbl: "KYC Verification",
      slug: "/dashboard/verification",
      img: "/images/CardIcon.svg",
    },
  ];
  return (
    <div className="nav-comp flex">
      <div className="wrap flex w-full">
        <div className="nav-links flex items-center w-full">
          {navBarItems.map((item, index) => (
            <div
              key={index}
              className={`nav-item flex items-center justify-center `}
            >
              <NavLink
                to={item.slug}
                className="icon flex items-center justify-center"
              >
                <img src={item.img} className="h-7 w-7" />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
