

import React from "react";

import { PrimaryNav, MenuLink, Menu } from "../NavElement";
const Navbar = () => {
  return (
    <>
      <img
        alt=""
        src={require("./admin.jpg")}
        style={{ width: "100%", height: "30%" }}
      />
      <PrimaryNav>
        <Menu>
          <MenuLink to="/" activeStyle>
            Home
          </MenuLink>
          <MenuLink to="/claimed_deals" activeStyle>
            Claimed Deals
          </MenuLink>
          {/* <MenuLink to="/myrecords" activeStyle>
            My Records
          </MenuLink> */}
        </Menu>
      </PrimaryNav>
    </>
  );
};
export default Navbar;