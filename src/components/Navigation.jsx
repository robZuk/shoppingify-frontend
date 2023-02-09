import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactTooltip from "react-tooltip";
import { VscHistory } from "react-icons/vsc";
import { ImStatsBars } from "react-icons/im";
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";

import Logo from "../assets/logo.svg";

function Navigation() {
  const { products } = useSelector((state) => state.lists.list);

  return (
    <>
      <nav className="navigation">
        <img src={Logo} alt="logo" className="navigation-logo" />
        <ul className="navigation-icons">
          <li>
            <NavLink
              to="products"
              className="navigation-icons-icon"
              data-tip="items"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={isActive ? "decoration active" : "decoration"}
                  />
                  <AiOutlineUnorderedList className="navigation-icons-icon-item" />
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="history"
              className="navigation-icons-icon"
              data-tip="history"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={isActive ? "decoration active" : "decoration"}
                  />
                  <VscHistory className="navigation-icons-icon-item" />
                </>
              )}
            </NavLink>
          </li>
          <li>
            <NavLink
              to="stats"
              className="navigation-icons-icon"
              data-tip="statistics"
            >
              {({ isActive }) => (
                <>
                  <div
                    className={isActive ? "decoration active" : "decoration"}
                  />
                  <ImStatsBars className="navigation-icons-icon-item" />
                </>
              )}
            </NavLink>
          </li>
        </ul>
        <div className="navigation-cart-wrapper">
          <AiOutlineShoppingCart className="navigation-cart-icon" />
          <div className="navigation-cart-counter">{products.length}</div>
        </div>
      </nav>
      <ReactTooltip
        backgroundColor="#454545"
        effect="solid"
        place="right"
        padding="0px 8px 1px 8px"
        offset={{ right: 0 }}
        arrowRadius="2"
      />
    </>
  );
}

export default Navigation;
