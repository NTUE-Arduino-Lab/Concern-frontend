/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
import Aside from "../../component/Aside";
import path from "../../utils/path";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

const RollCallSystem = () => {
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.rollCallSystem);
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
          <div className={styles.studentNumber}>
            <div className={styles.title}>應到人數</div>
            <div className={styles.number}>20人</div>
          </div>
          <div className={styles.studentNumber}>
            <div className={styles.title}>實到人數</div>
            <div className={styles.number}>19人</div>
          </div>
          <div className={styles.studentCondition}>
            <div className={styles.condition}>請假學生 1 人</div>
            <div className={styles.condition}>曠課學生 0 人</div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RollCallSystem;
