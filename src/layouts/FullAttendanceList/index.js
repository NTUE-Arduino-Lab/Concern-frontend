/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect } from "react";
import styles from "./styles.module.scss";
import Header from "../../component/Header";
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
      <Header />
      <Aside />
      <div className={styles.container}>
        <div className={styles.buttonSide}>
          <button className={styles.buttonSide_button}>下載</button>
        </div>
        <div className={styles.attendanceList}>
          <table>
            <thead>
              <tr>
                <td>學生姓名</td>
                <td>學生學號</td>
                <td>2021/5/13</td>
                <td>2021/5/20</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>郭昀甄</td>
                <td>110934002</td>
                <td>v</td>
                <td>v</td>
              </tr>
              <tr>
                <td>郭昀甄</td>
                <td>110934002</td>
                <td>v</td>
                <td>v</td>
              </tr>
              <tr>
                <td>郭昀甄</td>
                <td>110934002</td>
                <td>v</td>
                <td>v</td>
              </tr>
              <tr>
                <td>郭昀甄</td>
                <td>110934002</td>
                <td>v</td>
                <td>v</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default FullAttendanceList;
