import React from "react";
import Container from "../Container/Container";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import logo from "../../logo.svg";
import "./Header.scss";

const Header = () => {
  return (
    <div className={styles.navHeader}>
      <Container>
        <div className={styles.headerWrapper}>
          <div className={styles.logoWrapper}>
            <img src={logo} alt="logo" className={styles.logoImg} />
            <NavLink to="/" className={styles.pageName}>
              CinematiX
            </NavLink>
          </div>
          <nav className={styles.mainNavigation}>
            <ul className={styles.navList}>
              <li className="navItem">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/movies">Movies</NavLink>
              </li>
              <li className="navItem">
                <NavLink to="/actors">Actors</NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </div>
  );
};

export default Header;
