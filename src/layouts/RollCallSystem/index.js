/* eslint-disable jsx-a11y/alt-text */
import React, { Fragment, useContext, useEffect, useState } from "react";
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

  const [time, setTime] = useState(60);

  useEffect(() => {
    console.log("time = ", time);
  }, [time]);

  const submitHandler = (e) => {
    e.preventDefault();
    document.getElementById("submit").disabled = true;
    document.getElementById("text_time").disabled = true;
    document.getElementById("text_title").textContent = "學生端點名中，倒數";
    timeCountHandler();
  };
  var rollcall_interval;

  const timeOutHandler = () => {
    clearInterval(rollcall_interval);
    document.getElementById("text_time").value = "0";
    document.getElementById("text_title").textContent = "點名限定時間";
    document.getElementById("text_time").disabled = false;
    document.getElementById("submit").disabled = false;
  };

  let timeCount = time - 1;
  const timeCountHandler = () => {
     rollcall_interval = setInterval(() => {
      document.getElementById("text_time").value = timeCount;
      timeCount--;
      if (timeCount < -1) {
        timeOutHandler();
      }
    }, 1000);
  };

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
          <div className={styles.settingRollCallTime}>
            <form onSubmit={submitHandler}>
              <div className={styles.setTimeSectionTop}>
                <div id="text_title">點名限定時間</div>
                <input
                  type="text"
                  onChange={(e) => setTime(e.target.value)}
                  className={styles.inputSection}
                  id="text_time"
                  value={time}
                ></input>
                秒
                <button className={styles.submitBtn} type="submit" id="submit">
                  開始點名
                </button>
              </div>
              <div>系統提示：學生需在限定時間內按下點名按鈕</div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RollCallSystem;
