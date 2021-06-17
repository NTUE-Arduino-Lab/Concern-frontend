/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import "../../select.scss";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
import Aside from "../../component/Aside";
import path from "../../utils/path";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

const Home = () => {
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.home);
  }, [uiDispatch]);

  return (
    <Fragment>
      <Header />
      <Aside />
      <div className={styles.container}>
        <select className={styles.select}>
          <option>2021/05/20（四）</option>
        </select>
        <div className={styles.sectionTop}>
          <div className={styles.timeRecord}>
            <div className={styles.title}>本次上課時段紀錄</div>
            <div className={styles.timeRecord_content}></div>
          </div>
          <div className={styles.rank}>
            <div className={styles.title}>班級專注排行榜</div>
            <div className={styles.rank_content}></div>
          </div>
        </div>
        <div className={styles.classInfo}>
          <div className={styles.title}>全班資訊</div>
          <div className={styles.classInfo_content}></div>
        </div>
        <div className={styles.personInfo}>
          <div className={styles.title}>個人資訊</div>
          <div className={styles.personInfo_content}></div>
        </div>
      </div>
    </Fragment>
  );
};

export default Home;
