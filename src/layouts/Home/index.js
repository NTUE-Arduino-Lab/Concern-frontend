/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import Header from "../../component/Header"

const Home = () => {
  return (
    <Fragment>
      <Header />
      <div className={styles.container}></div>
    </Fragment>
  );
};

export default Home;
