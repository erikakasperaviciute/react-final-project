import React, { useState } from "react";
import Container from "../Container/Container";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../logo.svg";
import "./Header.scss";
import { FiMenu } from "react-icons/fi";

const Header = () => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const toggleBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <div className={styles.navHeader}>
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="logo" />
            <NavLink to="/">
              Cinemati<span>X</span>
            </NavLink>
          </div>
          <button className={styles.burgerBtn} onClick={toggleBurgerMenu}>
            <FiMenu />
          </button>

          <nav
            className={`${styles.mainNavigation} ${
              isBurgerMenuOpen ? styles.openMenu : ""
            }`}
          >
            <ul className={styles.navList}>
              <li className="navItem">
                <NavLink to="/" onClick={closeBurgerMenu}>
                  Home
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/movies" onClick={closeBurgerMenu}>
                  Movies
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/actors" onClick={closeBurgerMenu}>
                  Actors
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
