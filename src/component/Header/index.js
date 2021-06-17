/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import logo from "../../assets/image/logo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftSide}>
        <div className={styles.leftSide_logo}>
          <img src={logo} />
        </div>
        <div className={styles.leftSide_title}>課堂監控後台</div>
        <select className={styles.leftSide_select}>
          <option>玩遊Wordpress</option>
        </select>
        <button className={styles.leftSide_button}>新增課程</button>
      </div>
      <div className={styles.rightSide}>
        <div className={styles.rightSide_title}>你好，XXX老師</div>
      </div>
    </header>
  );
};

export default Header;
