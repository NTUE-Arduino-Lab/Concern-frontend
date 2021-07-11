/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import Aside from "../../component/Aside";
import path from "../../utils/path";
import { UIStoreContext } from "../../uiStore/reducer";
import { setAsideActiveItem } from "../../uiStore/actions";

const FullAttendanceList = () => {
  const { uiDispatch } = useContext(UIStoreContext);

  useEffect(() => {
    setAsideActiveItem(uiDispatch, path.fullAttendanceList);
  }, [uiDispatch]);

  return (
    <Fragment>
      <Aside />
      <div className={styles.container}>
        <div className={styles.buttonSide}>
          <button className={styles.buttonSide_button}>下載</button>
        </div>
        <div className={styles.attendanceList}>
          <div className={styles.thead}>
            <div className={styles.th_content}>
              <div className={styles.th}>學生姓名</div>
              <div className={styles.th}>學生學號</div>
              <div className={styles.th}>2021/5/13</div>
              <div className={styles.th}>2021/5/20</div>
            </div>
          </div>
          <div className={styles.tbody}>
            <div className={styles.td_content}>
              <div className={styles.td}>陳小花</div>
              <div className={styles.td}>110934001</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}>陳大花</div>
              <div className={styles.td}>110934002</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}>郭小花</div>
              <div className={styles.td}>110934003</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
            <div className={styles.td_content}>
              <div className={styles.td}>郭大花</div>
              <div className={styles.td}>110934004</div>
              <div className={styles.td}>v</div>
              <div className={styles.td}>v</div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default FullAttendanceList;
